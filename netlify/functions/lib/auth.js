import crypto from 'crypto'

function getSecrets() {
  const password = process.env.ADMIN_PASSWORD
  const signingKey = process.env.ADMIN_SIGNING_KEY || password
  if (!password || password.length < 12) {
    throw new Error(
      'ADMIN_PASSWORD env var is missing or under 12 characters. Set it in your Netlify site environment before deploying.'
    )
  }
  return { password, signingKey }
}

function timingSafeEqualStrings(a, b) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

export function createToken(password) {
  const { password: expected, signingKey } = getSecrets()
  if (typeof password !== 'string' || !timingSafeEqualStrings(password, expected)) {
    return null
  }
  const payload = {
    exp: Date.now() + 24 * 60 * 60 * 1000,
    iat: Date.now(),
  }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', signingKey).update(data).digest('base64url')
  return `${data}.${signature}`
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return false
  const [data, signature] = token.split('.')
  if (!data || !signature) return false

  let signingKey
  try {
    signingKey = getSecrets().signingKey
  } catch {
    return false
  }

  const expectedSig = crypto.createHmac('sha256', signingKey).update(data).digest('base64url')
  if (!timingSafeEqualStrings(signature, expectedSig)) return false

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    if (typeof payload?.exp !== 'number' || payload.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

export function requireAuth(headers) {
  const auth = headers.authorization || headers.Authorization || ''
  const token = auth.replace(/^Bearer\s+/i, '')
  if (!verifyToken(token)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
  }
  return null
}
