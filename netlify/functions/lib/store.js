import { getStore } from '@netlify/blobs'

function eventsStore() {
  return getStore({ name: 'events', consistency: 'strong' })
}

function attendeesStore() {
  return getStore({ name: 'attendees', consistency: 'strong' })
}

export async function listEvents() {
  const store = eventsStore()
  const { blobs } = await store.list()
  const events = await Promise.all(
    blobs.map(async (blob) => {
      const data = await store.get(blob.key, { type: 'json' })
      return data
    })
  )
  return events
    .filter(Boolean)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

export async function getEvent(id) {
  const store = eventsStore()
  return store.get(id, { type: 'json' })
}

export async function saveEvent(event) {
  const store = eventsStore()
  await store.setJSON(event.id, event)
  return event
}

export async function deleteEvent(id) {
  const store = eventsStore()
  await store.delete(id)
}

export async function saveAttendees(eventId, purchaseId, attendeeList) {
  const store = attendeesStore()
  const key = `${eventId}/${purchaseId}`
  await store.setJSON(key, {
    eventId,
    purchaseId,
    attendees: attendeeList,
    createdAt: new Date().toISOString(),
  })
}

export async function getAttendees(eventId) {
  const store = attendeesStore()
  const { blobs } = await store.list({ prefix: `${eventId}/` })
  const allAttendees = []

  for (const blob of blobs) {
    const data = await store.get(blob.key, { type: 'json' })
    if (data?.attendees) {
      allAttendees.push(...data.attendees)
    }
  }

  return allAttendees
}
