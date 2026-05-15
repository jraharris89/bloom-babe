import Stripe from 'stripe'
import { getEvent, getPromoCode, incrementPromoUses } from './lib/store.js'
import { LIMITS, validatePerson } from './lib/validate.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { eventId, quantity: rawQty, buyer, attendees, promoCode: rawPromo } = await req.json()

    if (typeof eventId !== 'string' || !eventId) {
      return new Response(JSON.stringify({ message: 'Missing eventId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const qty = Number(rawQty)
    if (!Number.isInteger(qty) || qty < 1 || qty > LIMITS.attendeesPerOrder) {
      return new Response(
        JSON.stringify({ message: `Please choose between 1 and ${LIMITS.attendeesPerOrder} tickets.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const cleanBuyer = validatePerson(buyer)
    if (!cleanBuyer) {
      return new Response(JSON.stringify({ message: 'Please double-check your name and email.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Additional attendees: only need qty-1 of them
    const additional = Array.isArray(attendees) ? attendees.slice(0, qty - 1) : []
    const cleanAdditional = []
    for (const a of additional) {
      const clean = validatePerson(a)
      if (!clean) {
        return new Response(
          JSON.stringify({ message: 'Please fill out name and email for every ticket holder.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
      cleanAdditional.push(clean)
    }

    const event = await getEvent(eventId)
    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    if (event.cancelled || event.draft) {
      return new Response(JSON.stringify({ message: 'This event is no longer available.' }), {
        status: 410,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    if (new Date(event.date) < new Date()) {
      return new Response(JSON.stringify({ message: 'This event has already happened.' }), {
        status: 410,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const remaining = event.totalTickets - (event.soldTickets ?? 0)
    if (remaining < qty) {
      const msg = remaining > 0
        ? `Only ${remaining} ticket${remaining === 1 ? '' : 's'} left for this event.`
        : 'This event just sold out.'
      return new Response(JSON.stringify({ message: msg }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate promo code if provided
    let appliedPromo = null
    let unitPrice = event.price
    if (rawPromo && typeof rawPromo === 'string' && rawPromo.trim()) {
      const promo = await getPromoCode(rawPromo.trim())
      if (!promo || !promo.active) {
        return new Response(JSON.stringify({ message: 'That promo code is not valid.' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      if (promo.maxUses && promo.timesUsed >= promo.maxUses) {
        return new Response(JSON.stringify({ message: 'That promo code has been fully redeemed.' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      if (promo.eventId && promo.eventId !== eventId) {
        return new Response(JSON.stringify({ message: 'That promo code is not valid for this event.' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      if (promo.discountType === 'percent') {
        unitPrice = Math.round(event.price * (1 - promo.discountValue / 100) * 100) / 100
      } else {
        unitPrice = Math.max(0, event.price - promo.discountValue)
      }
      appliedPromo = promo
    }

    const allAttendees = [
      { ...cleanBuyer, isBuyer: true },
      ...cleanAdditional.map(a => ({ ...a, isBuyer: false })),
    ]

    // Stripe metadata values cap at 500 chars each — guard against overflow.
    const attendeesJson = JSON.stringify(allAttendees)
    if (attendeesJson.length > 480) {
      return new Response(JSON.stringify({ message: 'Too many attendees for a single order.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const siteUrl = process.env.URL || 'http://localhost:5173'
    const dateLabel = new Date(event.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: cleanBuyer.email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: event.name.slice(0, 250),
            description: `${qty} ticket${qty > 1 ? 's' : ''} — ${dateLabel}${appliedPromo ? ` (promo: ${appliedPromo.code})` : ''}`,
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: qty,
      }],
      mode: 'payment',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/events/${eventId}`,
      metadata: {
        eventId,
        quantity: String(qty),
        attendees: attendeesJson,
        ...(appliedPromo ? { promoCode: appliedPromo.code } : {}),
      },
    })

    if (appliedPromo) {
      await incrementPromoUses(appliedPromo.code)
    }

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
