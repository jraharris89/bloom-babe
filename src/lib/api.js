const API_BASE = import.meta.env.DEV ? '' : ''

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/.netlify/functions/events`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function fetchEvent(id) {
  const res = await fetch(`${API_BASE}/.netlify/functions/events?id=${id}`)
  if (!res.ok) throw new Error('Failed to fetch event')
  return res.json()
}

export async function createCheckoutSession({ eventId, quantity, buyer, attendees, promoCode }) {
  const res = await fetch(`${API_BASE}/.netlify/functions/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, quantity, buyer, attendees, promoCode }),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to create checkout session')
  }
  return res.json()
}

export async function adminLogin(password) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', password }),
  })
  if (!res.ok) throw new Error('Invalid password')
  return res.json()
}

export async function adminFetchEvents(token) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events?action=list`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function adminCreateEvent(token, eventData) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'create', ...eventData }),
  })
  if (!res.ok) throw new Error('Failed to create event')
  return res.json()
}

export async function adminUpdateEvent(token, id, eventData) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'update', id, ...eventData }),
  })
  if (!res.ok) throw new Error('Failed to update event')
  return res.json()
}

export async function adminDeleteEvent(token, id) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'delete', id }),
  })
  if (!res.ok) throw new Error('Failed to delete event')
  return res.json()
}

export async function adminFetchPromoCodes(token) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events?action=promo-codes`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch promo codes')
  return res.json()
}

export async function adminCreatePromoCode(token, promoData) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'create-promo', ...promoData }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to create promo code')
  }
  return res.json()
}

export async function adminUpdatePromoCode(token, promoData) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'update-promo', ...promoData }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to update promo code')
  }
  return res.json()
}

export async function adminDeletePromoCode(token, code) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: 'delete-promo', code }),
  })
  if (!res.ok) throw new Error('Failed to delete promo code')
  return res.json()
}

export async function adminUploadImage(token, { dataUrl, contentType }) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dataUrl, contentType }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Upload failed')
  }
  return res.json()
}

export async function adminFetchAttendees(token, eventId) {
  const res = await fetch(`${API_BASE}/.netlify/functions/admin-events?action=attendees&eventId=${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch attendees')
  return res.json()
}
