import Stripe from 'stripe'
import { getEvent } from './lib/store.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { eventId, quantity, buyer, attendees } = await req.json()

    // Validate inputs
    if (!eventId || !quantity || !buyer?.firstName || !buyer?.lastName || !buyer?.email) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const event = await getEvent(eventId)
    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const remaining = event.totalTickets - event.soldTickets
    if (remaining < quantity) {
      return new Response(JSON.stringify({ message: `Only ${remaining} ticket(s) remaining` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Store attendee info in Stripe metadata
    const allAttendees = [
      { firstName: buyer.firstName, lastName: buyer.lastName, email: buyer.email, isBuyer: true },
      ...(attendees || []).map(a => ({ ...a, isBuyer: false })),
    ]

    const siteUrl = process.env.URL || 'http://localhost:5173'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: buyer.email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: event.name,
            description: `${quantity} ticket${quantity > 1 ? 's' : ''} — ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
          },
          unit_amount: Math.round(event.price * 100),
        },
        quantity,
      }],
      mode: 'payment',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/events/${eventId}`,
      metadata: {
        eventId,
        quantity: quantity.toString(),
        attendees: JSON.stringify(allAttendees),
      },
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return new Response(JSON.stringify({ message: 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: '/.netlify/functions/checkout' }
