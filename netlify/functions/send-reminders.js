import { Resend } from 'resend'
import { listEvents, getAttendees } from './lib/store.js'

const resend = new Resend(process.env.RESEND_API_KEY)

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export default async function handler() {
  const now = new Date()
  const events = await listEvents()

  const todaysEvents = events.filter(
    (e) => !e.cancelled && !e.draft && isSameDay(new Date(e.date), now)
  )

  if (todaysEvents.length === 0) {
    return new Response(JSON.stringify({ message: 'No events today', sent: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let totalSent = 0

  for (const event of todaysEvents) {
    const attendees = await getAttendees(event.id)
    if (!attendees.length) continue

    const emails = [...new Set(attendees.map((a) => a.email).filter(Boolean))]
    if (!emails.length) continue

    const date = new Date(event.date)
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Boise',
    })

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#FFFDF7; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px; margin:0 auto; padding:40px 24px;">

    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="font-family:Georgia,serif; font-size:28px; color:#2C2C2C; margin:0 0 4px;">
        Bloom Babe
      </h1>
      <p style="font-size:12px; color:#C9A96E; letter-spacing:2px; text-transform:uppercase; margin:0;">
        Floral & Events
      </p>
    </div>

    <div style="background:#fff; border-radius:16px; border:1px solid rgba(201,169,110,0.15); padding:32px; margin-bottom:24px;">
      <div style="text-align:center; margin-bottom:24px;">
        <h2 style="font-family:Georgia,serif; font-size:22px; color:#2C2C2C; margin:0 0 8px;">
          Tonight's the Night!
        </h2>
        <p style="font-size:14px; color:#4A4A4A; margin:0; line-height:1.6;">
          Just a friendly reminder &mdash; we can't wait to see you at <strong>${event.name}</strong> today!
        </p>
      </div>

      <div style="background:#FFFDF7; border-radius:12px; padding:20px; margin-bottom:20px;">
        <p style="font-size:13px; color:#4A4A4A; margin:0 0 6px;">
          <strong style="color:#C9A96E;">Time:</strong> ${formattedTime}
        </p>
        ${event.location ? `
        <p style="font-size:13px; color:#4A4A4A; margin:0 0 6px;">
          <strong style="color:#C9A96E;">Location:</strong> ${event.location}
        </p>` : ''}
        ${event.ageRequirement ? `
        <p style="font-size:13px; color:#4A4A4A; margin:0 0 6px;">
          <strong style="color:#C9A96E;">Heads up:</strong> This is a ${event.ageRequirement}+ event &mdash; please bring a valid photo ID.
        </p>` : ''}
      </div>

      <div style="text-align:center;">
        <p style="font-size:14px; color:#2C2C2C; margin:0 0 4px; font-weight:500;">
          What to Bring
        </p>
        <p style="font-size:13px; color:#4A4A4A; margin:0; line-height:1.5;">
          Just yourself and your creativity &mdash; we'll have everything else ready. See you soon!
        </p>
      </div>
    </div>

    <div style="text-align:center; padding-top:16px;">
      <p style="font-size:13px; color:#4A4A4A; margin:0 0 12px;">
        Questions? Hit reply or email us at
        <a href="mailto:Idahobloombabe@gmail.com" style="color:#C9A96E;">Idahobloombabe@gmail.com</a>
      </p>
      <p style="font-size:11px; color:#999; margin:0;">
        &copy; ${new Date().getFullYear()} Bloom Babe Floral & Events
      </p>
    </div>

  </div>
</body>
</html>`

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Bloom Babe <noreply@bloombabe.com>',
        to: emails,
        subject: `Reminder: ${event.name} is today!`,
        html,
      })
      totalSent += emails.length
    } catch (err) {
      console.error(`[send-reminders] failed for event ${event.id}:`, err)
    }
  }

  return new Response(
    JSON.stringify({ message: `Sent reminders for ${todaysEvents.length} event(s)`, sent: totalSent }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}

export const config = {
  path: '/.netlify/functions/send-reminders',
  schedule: '0 15 * * *',
}
