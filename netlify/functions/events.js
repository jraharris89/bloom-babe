import { listEvents, getEvent } from './lib/store.js'

export default async function handler(req) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  try {
    if (id) {
      const event = await getEvent(id)
      if (!event) {
        return new Response(JSON.stringify({ error: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify(event), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const events = await listEvents()
    // Only return active, future events for public view
    const now = new Date()
    const activeEvents = events.filter(e => !e.cancelled && !e.draft && new Date(e.date) > now)
    return new Response(JSON.stringify(activeEvents), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
