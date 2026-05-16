import { createToken, requireAuth } from './lib/auth.js'
import { listEvents, getEvent, saveEvent, deleteEvent, getAttendees, listPromoCodes, getPromoCode, savePromoCode, deletePromoCode } from './lib/store.js'
import { validateEventInput } from './lib/validate.js'
import crypto from 'crypto'

export default async function handler(req) {
  const url = new URL(req.url)
  const headers = Object.fromEntries(req.headers.entries())

  // Handle GET requests
  if (req.method === 'GET') {
    const authError = requireAuth(headers)
    if (authError) return new Response(authError.body, { status: authError.statusCode, headers: { 'Content-Type': 'application/json' } })

    const action = url.searchParams.get('action')

    if (action === 'attendees') {
      const eventId = url.searchParams.get('eventId')
      const attendees = await getAttendees(eventId)
      return new Response(JSON.stringify(attendees), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'promo-codes') {
      const codes = await listPromoCodes()
      return new Response(JSON.stringify(codes), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Default: list all events (including past)
    const events = await listEvents()
    return new Response(JSON.stringify(events), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Handle POST requests
  if (req.method === 'POST') {
    const body = await req.json()
    const { action } = body

    // Login doesn't need auth
    if (action === 'login') {
      let token
      try {
        token = createToken(body.password)
      } catch (err) {
        console.error('[admin-auth] misconfigured:', err.message)
        return new Response(
          JSON.stringify({ error: 'Admin sign-in is temporarily unavailable. Please try again shortly.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        )
      }
      if (!token) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ token }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // All other actions need auth
    const authError = requireAuth(headers)
    if (authError) return new Response(authError.body, { status: authError.statusCode, headers: { 'Content-Type': 'application/json' } })

    if (action === 'create') {
      const v = validateEventInput(body, { partial: false })
      if (!v.ok) {
        return new Response(JSON.stringify({ error: v.errors.join('; ') }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      const event = {
        id: crypto.randomUUID(),
        name: body.name,
        type: body.type,
        description: body.description,
        date: body.date,
        location: body.location || '',
        price: body.price,
        totalTickets: body.totalTickets,
        soldTickets: 0,
        image: typeof body.image === 'string' && body.image.length < 2048 ? body.image : null,
        ageRequirement: body.ageRequirement || null,
        draft: body.draft ?? false,
        cancelled: false,
        createdAt: new Date().toISOString(),
      }
      await saveEvent(event)
      return new Response(JSON.stringify(event), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'update') {
      const existing = await getEvent(body.id)
      if (!existing) {
        return new Response(JSON.stringify({ error: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      const v = validateEventInput(body, { partial: true })
      if (!v.ok) {
        return new Response(JSON.stringify({ error: v.errors.join('; ') }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      const updated = {
        ...existing,
        name: body.name ?? existing.name,
        type: body.type ?? existing.type,
        description: body.description ?? existing.description,
        date: body.date ?? existing.date,
        location: body.location ?? existing.location,
        price: body.price ?? existing.price,
        totalTickets: body.totalTickets ?? existing.totalTickets,
        image: typeof body.image === 'string' && body.image.length < 2048 ? body.image : existing.image,
        ageRequirement: 'ageRequirement' in body ? body.ageRequirement : existing.ageRequirement,
        draft: body.draft ?? existing.draft ?? false,
        cancelled: body.cancelled ?? existing.cancelled,
      }
      await saveEvent(updated)
      return new Response(JSON.stringify(updated), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'delete') {
      await deleteEvent(body.id)
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'create-promo') {
      const code = (body.code || '').trim().toUpperCase()
      if (!code || code.length > 64) {
        return new Response(JSON.stringify({ error: 'Promo code is required (max 64 characters)' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      const discountType = body.discountType === 'fixed' ? 'fixed' : 'percent'
      const discountValue = Number(body.discountValue)
      if (!Number.isFinite(discountValue) || discountValue <= 0) {
        return new Response(JSON.stringify({ error: 'Discount value must be a positive number' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      if (discountType === 'percent' && discountValue > 100) {
        return new Response(JSON.stringify({ error: 'Percent discount cannot exceed 100%' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      const maxUses = body.maxUses ? Number(body.maxUses) : null
      const promo = {
        code,
        discountType,
        discountValue,
        maxUses,
        timesUsed: 0,
        eventId: body.eventId || null,
        active: true,
        createdAt: new Date().toISOString(),
      }
      await savePromoCode(promo)
      return new Response(JSON.stringify(promo), {
        status: 201, headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'update-promo') {
      const code = (body.code || '').trim().toUpperCase()
      if (!code) {
        return new Response(JSON.stringify({ error: 'Promo code is required' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        })
      }
      const existing = await getPromoCode(code)
      if (!existing) {
        return new Response(JSON.stringify({ error: 'Promo code not found' }), {
          status: 404, headers: { 'Content-Type': 'application/json' },
        })
      }
      const updated = {
        ...existing,
        active: body.active ?? existing.active,
        maxUses: body.maxUses !== undefined ? (body.maxUses ? Number(body.maxUses) : null) : existing.maxUses,
        eventId: body.eventId !== undefined ? (body.eventId || null) : existing.eventId,
      }
      await savePromoCode(updated)
      return new Response(JSON.stringify(updated), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (action === 'delete-promo') {
      await deletePromoCode(body.code)
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  })
}
