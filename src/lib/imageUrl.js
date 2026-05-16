export function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return url

  // Google Drive: /file/d/FILE_ID/... → direct view URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/)
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`
  }

  // Google Drive: open?id=FILE_ID or uc?id=FILE_ID
  const driveIdMatch = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([^&]+)/)
  if (driveIdMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveIdMatch[1]}`
  }

  // Dropbox: change dl=0 to dl=1 for direct download
  if (url.includes('dropbox.com') && url.includes('dl=0')) {
    return url.replace('dl=0', 'dl=1')
  }

  return url
}
