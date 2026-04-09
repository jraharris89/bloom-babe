import crypto from 'crypto'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bloom-admin-2024'

export function createToken(password) {
  if (password !== ADMIN_PASSWORD) {
    return null
  }
  const payload = {
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    iat: Date.now(),
  }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update(data)
    .digest('base64url')
  return `${data}.${signature}`
}

export function verifyToken(token) {
  if (!token) return false
  const [data, signature] = token.split('.')
  if (!data || !signature) return false

  const expectedSig = crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update(data)
    .digest('base64url')

  if (signature !== expectedSig) return false

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    if (payload.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

export function requireAuth(headers) {
  const auth = headers.authorization || headers.Authorization || ''
  const token = auth.replace('Bearer ', '')
  if (!verifyToken(token)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
  }
  return null
}
