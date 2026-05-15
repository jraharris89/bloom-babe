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

export async function incrementSoldTickets(eventId, delta, { maxAttempts = 5 } = {}) {
  const store = eventsStore()
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await store.getWithMetadata(eventId, { type: 'json' })
    const event = result?.data
    if (!event) return { ok: false, reason: 'not-found' }

    const currentSold = event.soldTickets ?? 0
    const nextSold = currentSold + delta
    if (nextSold > event.totalTickets) {
      return { ok: false, reason: 'sold-out', event }
    }

    const next = { ...event, soldTickets: nextSold }
    try {
      await store.setJSON(eventId, next, {
        onlyIfMatch: result?.etag,
      })
      return { ok: true, event: next }
    } catch (err) {
      if (err?.name === 'BlobsConsistencyError' || /precondition/i.test(err?.message || '')) {
        continue
      }
      throw err
    }
  }
  return { ok: false, reason: 'contention' }
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

// ── Promo Codes ──

function promoStore() {
  return getStore({ name: 'promo-codes', consistency: 'strong' })
}

export async function listPromoCodes() {
  const store = promoStore()
  const { blobs } = await store.list()
  const codes = await Promise.all(
    blobs.map(async (blob) => store.get(blob.key, { type: 'json' }))
  )
  return codes.filter(Boolean)
}

export async function getPromoCode(code) {
  const store = promoStore()
  return store.get(code.toUpperCase(), { type: 'json' })
}

export async function savePromoCode(promo) {
  const store = promoStore()
  const key = promo.code.toUpperCase()
  await store.setJSON(key, { ...promo, code: key })
  return promo
}

export async function deletePromoCode(code) {
  const store = promoStore()
  await store.delete(code.toUpperCase())
}

export async function incrementPromoUses(code) {
  const store = promoStore()
  const key = code.toUpperCase()
  const promo = await store.get(key, { type: 'json' })
  if (!promo) return null
  promo.timesUsed = (promo.timesUsed || 0) + 1
  await store.setJSON(key, promo)
  return promo
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
