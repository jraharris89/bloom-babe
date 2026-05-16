import { requireAuth } from './lib/auth.js'
import { getStore } from '@netlify/blobs'
import crypto from 'crypto'

const ALLOWED_TYPES = { 'image/jpeg': 'jpeg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }
const MAX_BYTES = 4 * 1024 * 1024

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } })
  }

  const headers = Object.fromEntries(req.headers.entries())
  const authError = requireAuth(headers)
  if (authError) return new Response(authError.body, { status: authError.statusCode, headers: { 'Content-Type': 'application/json' } })

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const { dataUrl, contentType } = body
  const ext = ALLOWED_TYPES[contentType]
  if (!ext) {
    return new Response(JSON.stringify({ error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const base64 = typeof dataUrl === 'string' ? dataUrl.split(',')[1] : null
  if (!base64) {
    return new Response(JSON.stringify({ error: 'Invalid image data' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const buf = Buffer.from(base64, 'base64')
  if (buf.length > MAX_BYTES) {
    return new Response(JSON.stringify({ error: 'Image must be under 4 MB' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const key = `${crypto.randomUUID()}.${ext}`
  const store = getStore({ name: 'event-images' })
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  await store.set(key, ab, { metadata: { contentType } })

  return new Response(JSON.stringify({ url: `/.netlify/functions/event-image?id=${key}` }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
