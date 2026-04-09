import Stripe from 'stripe'
import { getEvent, saveEvent, saveAttendees } from './lib/store.js'
import { sendConfirmationEmail } from './lib/email.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object

    try {
      const { eventId, quantity, attendees: attendeesJson } = session.metadata
      const attendees = JSON.parse(attendeesJson)
      const qty = parseInt(quantity, 10)

      // Update ticket count
      const event = await getEvent(eventId)
      if (event) {
        event.soldTickets = Math.min(event.totalTickets, event.soldTickets + qty)
        await saveEvent(event)

        // Save attendees
        await saveAttendees(eventId, session.id, attendees)

        // Send confirmation email
        const buyer = attendees.find(a => a.isBuyer)
        const otherAttendees = attendees.filter(a => !a.isBuyer)

        await sendConfirmationEmail({
          event,
          buyer,
          attendees: otherAttendees,
          totalAmount: session.amount_total / 100,
          quantity: qty,
        })
      }
    } catch (err) {
      console.error('Error processing webhook:', err)
      // Return 200 anyway so Stripe doesn't retry
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = { path: '/.netlify/functions/webhook' }
