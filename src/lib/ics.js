export function generateICS(event) {
  const start = new Date(event.date)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000) // assume 2-hour event

  const fmt = (d) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bloom Babe//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeText(event.name)}`,
    event.location ? `LOCATION:${escapeText(event.location)}` : null,
    event.description
      ? `DESCRIPTION:${escapeText(event.description.split('\n').slice(0, 3).join(' '))}`
      : null,
    `URL:${window.location.origin}/events/${event.id}`,
    `UID:${event.id}@bloombabe.events`,
    `DTSTAMP:${fmt(new Date())}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  return lines
}

function escapeText(text) {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function downloadICS(event) {
  const ics = generateICS(event)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
