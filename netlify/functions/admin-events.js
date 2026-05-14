import { createToken, requireAuth } from './lib/auth.js'
import { listEvents, getEvent, saveEvent, deleteEvent, getAttendees } from './lib/store.js'
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

export const config = { path: '/.netlify/functions/admin-events' }
