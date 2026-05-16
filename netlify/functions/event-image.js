import { getStore } from '@netlify/blobs'

const KEY_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpeg|png|webp|gif)$/

export default async function handler(req) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id') || ''

  if (!KEY_RE.test(id)) {
    return new Response('Not found', { status: 404 })
  }

  const store = getStore({ name: 'event-images' })
  const result = await store.getWithMetadata(id, { type: 'arrayBuffer' })

  if (!result?.data) {
    return new Response('Not found', { status: 404 })
  }

  const contentType = result.metadata?.contentType || 'image/jpeg'
  return new Response(result.data, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
