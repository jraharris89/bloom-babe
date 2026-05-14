import Stripe from 'stripe'
import { getEvent, incrementSoldTickets, saveAttendees } from './lib/store.js'
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

      if (!eventId || !Number.isFinite(qty) || qty < 1) {
        console.error('[webhook] invalid session metadata', { eventId, quantity })
        return new Response(JSON.stringify({ received: true }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // Atomic compare-and-swap: rejects if the increment would oversell.
      const result = await incrementSoldTickets(eventId, qty)
      if (!result.ok) {
        console.error('[webhook] could not reserve seats', {
          eventId,
          qty,
          reason: result.reason,
          sessionId: session.id,
        })
        // We still ack the webhook (200) so Stripe doesn't retry forever.
        // An operator can reconcile via Stripe dashboard + admin event roster.
        return new Response(JSON.stringify({ received: true, warning: result.reason }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const event = result.event

      await saveAttendees(eventId, session.id, attendees)

      const buyer = attendees.find(a => a.isBuyer)
      const otherAttendees = attendees.filter(a => !a.isBuyer)

      await sendConfirmationEmail({
        event,
        buyer,
        attendees: otherAttendees,
        totalAmount: session.amount_total / 100,
        quantity: qty,
      })
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
