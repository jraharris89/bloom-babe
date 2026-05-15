export function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return url

  // Google Drive: /file/d/FILE_ID/view → direct thumbnail URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1200`
  }

  // Google Drive: open?id=FILE_ID
  const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/)
  if (driveOpenMatch) {
    return `https://drive.google.com/thumbnail?id=${driveOpenMatch[1]}&sz=w1200`
  }

  // Dropbox: change dl=0 to dl=1 for direct download
  if (url.includes('dropbox.com') && url.includes('dl=0')) {
    return url.replace('dl=0', 'dl=1')
  }

  return url
}
