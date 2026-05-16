import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendConfirmationEmail({ event, buyer, attendees, totalAmount, quantity }) {
  const date = new Date(event.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  const allRecipients = [buyer.email, ...attendees.map(a => a.email)]
  const uniqueRecipients = [...new Set(allRecipients)]

  const attendeeList = [
    { ...buyer, label: '(Purchaser)' },
    ...attendees.map(a => ({ ...a, label: '' })),
  ]

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#FFFDF7; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px; margin:0 auto; padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="font-family:Georgia,serif; font-size:28px; color:#2C2C2C; margin:0 0 4px;">
        Bloom Babe
      </h1>
      <p style="font-size:12px; color:#C9A96E; letter-spacing:2px; text-transform:uppercase; margin:0;">
        Floral & Events
      </p>
    </div>

    <!-- Confirmation -->
    <div style="background:#fff; border-radius:16px; border:1px solid rgba(201,169,110,0.15); padding:32px; margin-bottom:24px;">
      <div style="text-align:center; margin-bottom:24px;">
        <div style="display:inline-block; width:48px; height:48px; border-radius:50%; background:#A8B5A015; line-height:48px; font-size:24px;">
          &#10003;
        </div>
        <h2 style="font-family:Georgia,serif; font-size:22px; color:#2C2C2C; margin:12px 0 4px;">
          You're In!
        </h2>
        <p style="font-size:14px; color:#4A4A4A; margin:0;">
          Your tickets have been confirmed.
        </p>
      </div>

      <!-- Event Details -->
      <div style="background:#FFFDF7; border-radius:12px; padding:20px; margin-bottom:20px;">
        <h3 style="font-family:Georgia,serif; font-size:18px; color:#2C2C2C; margin:0 0 12px;">
          ${event.name}
        </h3>
        <p style="font-size:13px; color:#4A4A4A; margin:0 0 6px;">
          <strong style="color:#C9A96E;">Date:</strong> ${formattedDate}
        </p>
        <p style="font-size:13px; color:#4A4A4A; margin:0 0 6px;">
          <strong style="color:#C9A96E;">Time:</strong> ${formattedTime}
        </p>
        ${event.location ? `
        <p style="font-size:13px; color:#4A4A4A; margin:0 0 6px;">
          <strong style="color:#C9A96E;">Location:</strong> ${event.location}
        </p>` : ''}
      </div>

      <!-- Attendees -->
      <div style="margin-bottom:20px;">
        <p style="font-size:12px; color:#4A4A4A; letter-spacing:1px; text-transform:uppercase; margin:0 0 8px; font-weight:600;">
          Attendees
        </p>
        ${attendeeList.map((a, i) => `
        <div style="padding:8px 0; ${i < attendeeList.length - 1 ? 'border-bottom:1px solid rgba(201,169,110,0.1);' : ''}">
          <p style="font-size:14px; color:#2C2C2C; margin:0;">
            ${a.firstName} ${a.lastName} <span style="color:#C9A96E; font-size:11px;">${a.label || ''}</span>
          </p>
          <p style="font-size:12px; color:#4A4A4A; margin:2px 0 0;">${a.email}</p>
        </div>`).join('')}
      </div>

      <!-- Receipt -->
      <div style="border-top:1px solid rgba(201,169,110,0.15); padding-top:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:13px; color:#4A4A4A;">
            ${quantity} ticket${quantity > 1 ? 's' : ''} x $${event.price.toFixed(2)}
          </span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:1px solid rgba(201,169,110,0.1);">
          <span style="font-size:14px; font-weight:600; color:#2C2C2C;">Total Paid</span>
          <span style="font-size:14px; font-weight:600; color:#2C2C2C;">$${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>

    <!-- What to Bring -->
    <div style="background:#fff; border-radius:16px; border:1px solid rgba(201,169,110,0.15); padding:24px; margin-bottom:24px; text-align:center;">
      <p style="font-size:14px; color:#2C2C2C; margin:0 0 4px; font-weight:500;">
        What to Bring
      </p>
      <p style="font-size:13px; color:#4A4A4A; margin:0;">
        Just yourself and your creativity &mdash; we'll have everything else ready for you.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding-top:16px;">
      <p style="font-size:11px; color:#999; margin:0;">
        &copy; ${new Date().getFullYear()} Bloom Babe Floral & Events
      </p>
    </div>

  </div>
</body>
</html>`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Bloom Babe <noreply@bloombabeevents.com>',
    to: uniqueRecipients,
    subject: `Your tickets for ${event.name} — Bloom Babe`,
    html,
  })
}
