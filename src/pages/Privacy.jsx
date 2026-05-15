import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">
          Legal
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
          Privacy Policy
        </h1>
        <p className="text-charcoal-light text-sm mb-10">
          Last updated May 14, 2026
        </p>

        <div className="space-y-8 text-charcoal-light text-sm leading-relaxed">
          <Section title="Who we are">
            <p>
              Bloom Babe Floral &amp; Events ("Bloom Babe," "we," "us") organizes
              in-person creative workshops and social events in the Boise, Idaho area.
              This policy explains what personal information we collect, why we collect
              it, and how we protect it.
            </p>
          </Section>

          <Section title="What we collect">
            <p>When you purchase a ticket or contact us, we may collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your name and email address (to send your ticket confirmation)</li>
              <li>Payment information (processed securely by Stripe — we never see or store your full card number)</li>
              <li>The event you registered for and how many tickets you purchased</li>
              <li>Any messages you send us via email</li>
            </ul>
          </Section>

          <Section title="How we use it">
            <ul className="list-disc pl-5 space-y-1">
              <li>Send your ticket confirmation and event-day reminders</li>
              <li>Process your payment through Stripe</li>
              <li>Answer your questions when you reach out</li>
              <li>Let you know about future events (only if you've opted in)</li>
            </ul>
          </Section>

          <Section title="Who we share it with">
            <p>We share your information only with services that help us run events:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline underline-offset-2">Stripe's privacy policy</a>)</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Netlify</strong> — website hosting and data storage</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to anyone. Ever.</p>
          </Section>

          <Section title="Cookies &amp; tracking">
            <p>
              This site does not use advertising cookies or third-party trackers. We
              may use basic analytics to understand how many people visit our pages, but
              we don't build profiles or track you across the web.
            </p>
          </Section>

          <Section title="How long we keep your data">
            <p>
              We keep your name, email, and purchase history for as long as needed to
              fulfill our obligations (e.g., refunds, tax records). If you'd like us to
              delete your information, just ask — see below.
            </p>
          </Section>

          <Section title="Your rights">
            <p>You can always:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Ask what information we have about you</li>
              <li>Request we correct or delete it</li>
              <li>Unsubscribe from any promotional emails</li>
            </ul>
            <p className="mt-2">
              Email us at{' '}
              <a href="mailto:Idahobloombabe@gmail.com" className="text-gold hover:text-gold-light underline underline-offset-2">
                Idahobloombabe@gmail.com
              </a>{' '}
              and we'll take care of it within 30 days.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p>
              Our events and website are not directed at children under 13. We do not
              knowingly collect information from children. Many of our events are 21+.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we make meaningful changes, we'll update the date at the top of this
              page. For major changes, we'll send an email to past attendees.
            </p>
          </Section>

          <Section title="Questions?">
            <p>
              Reach out anytime:{' '}
              <a href="mailto:Idahobloombabe@gmail.com" className="text-gold hover:text-gold-light underline underline-offset-2">
                Idahobloombabe@gmail.com
              </a>
            </p>
          </Section>

          <div className="pt-6 border-t border-gold/10">
            <Link to="/terms" className="text-gold hover:text-gold-light text-sm underline underline-offset-2">
              Read our Terms of Service →
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
