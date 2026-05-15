import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">
          Legal
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
          Terms of Service
        </h1>
        <p className="text-charcoal-light text-sm mb-10">
          Last updated May 14, 2026
        </p>

        <div className="space-y-8 text-charcoal-light text-sm leading-relaxed">
          <Section title="The basics">
            <p>
              By purchasing a ticket or using this website you agree to these terms.
              If something doesn't make sense, email us — we're happy to explain.
            </p>
          </Section>

          <Section title="Tickets &amp; payment">
            <ul className="list-disc pl-5 space-y-1">
              <li>All ticket sales are processed securely through Stripe.</li>
              <li>Prices are listed in US dollars and include all materials for the event unless stated otherwise.</li>
              <li>A ticket is valid for one person for the specific event and date purchased.</li>
              <li>You'll receive a confirmation email after purchase. If you don't see it, check your spam folder or contact us.</li>
            </ul>
          </Section>

          <Section title="Refunds &amp; cancellations">
            <p>
              As a small business, we invest time, materials, and love into prepping
              for every event — so all ticket sales are final and we're not able to
              offer refunds at this time.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Can't make it?</strong> Send a friend in your place! Just email us and we'll update the name on your ticket.</li>
              <li><strong>If we cancel:</strong> You'll receive a full refund automatically. We'll email you as soon as possible.</li>
            </ul>
            <p className="mt-2">
              Questions? Email{' '}
              <a href="mailto:Idahobloombabe@gmail.com" className="text-gold hover:text-gold-light underline underline-offset-2">
                Idahobloombabe@gmail.com
              </a>{' '}
              — we're happy to help.
            </p>
          </Section>

          <Section title="Event rules">
            <ul className="list-disc pl-5 space-y-1">
              <li>Some events are 21+. You'll need a valid photo ID at the door — no exceptions.</li>
              <li>We reserve the right to refuse entry or remove anyone who is disruptive, intoxicated beyond reason, or creating an unsafe environment.</li>
              <li>Please arrive on time. Late arrivals may miss part of the experience, and we may not be able to extend the session.</li>
            </ul>
          </Section>

          <Section title="Photos &amp; social media">
            <p>
              We may take photos or video at events for social media and marketing.
              By attending, you consent to being photographed. If you'd prefer not to
              be in photos, let the host know at the start of the event and we'll
              respect that.
            </p>
          </Section>

          <Section title="Liability">
            <p>
              Bloom Babe provides a fun, creative experience — but you attend at your
              own risk. We are not liable for personal injury, lost or damaged personal
              property, or allergic reactions to materials used at our events. If you
              have allergies or sensitivities, please contact us in advance so we can
              let you know what materials will be present.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              The content on this website — text, images, logos, and design — belongs
              to Bloom Babe unless otherwise noted. Feel free to share our events with
              friends, but please don't copy or reuse our materials without permission.
            </p>
          </Section>

          <Section title="Website availability">
            <p>
              We do our best to keep this website running smoothly, but we can't
              guarantee it'll be available 100% of the time. If you have trouble
              purchasing tickets online, reach out and we'll help.
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              We may update these terms from time to time. When we do, we'll update
              the date at the top. Continued use of the site after changes means you
              accept the updated terms.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of the State of Idaho. Any disputes
              will be resolved in Ada County, Idaho.
            </p>
          </Section>

          <Section title="Questions?">
            <p>
              We're real people — just email{' '}
              <a href="mailto:Idahobloombabe@gmail.com" className="text-gold hover:text-gold-light underline underline-offset-2">
                Idahobloombabe@gmail.com
              </a>{' '}
              and we'll sort it out.
            </p>
          </Section>

          <div className="pt-6 border-t border-gold/10">
            <Link to="/privacy" className="text-gold hover:text-gold-light text-sm underline underline-offset-2">
              Read our Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-serif text-lg text-charcoal mb-2">{title}</h2>
      {children}
    </section>
  )
}
