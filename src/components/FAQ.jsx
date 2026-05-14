import { useState } from 'react'

const FAQS = [
  {
    q: 'How long are events?',
    a: 'Most events run about 2 hours — enough time to settle in, create something beautiful, and enjoy good company without it feeling rushed.',
  },
  {
    q: 'What happens if I miss the event?',
    a: 'All ticket sales are non-refundable. Life happens, we get it — but unfortunately we\'re unable to offer refunds or transfers. We hope to see you at a future event!',
  },
  {
    q: 'Do I need to bring anything?',
    a: 'Nope! Everything you need is provided. Just bring yourself (and maybe a friend).',
  },
  {
    q: 'Is there an age requirement?',
    a: 'Most of our events are held at 21+ venues like bars and restaurants. Please double-check the venue listed on each event before purchasing your ticket — we\'d hate for you to get turned away at the door.',
  },
  {
    q: 'How do I book a corporate event or private party?',
    a: (
      <>
        We love bringing Bloom Babe to teams, bachelorette parties, birthday groups, and more!
        Reach out at{' '}
        <a
          href="mailto:Idahobloombabe@gmail.com"
          className="text-gold-dark hover:underline"
        >
          Idahobloombabe@gmail.com
        </a>{' '}
        and let's make it happen.
      </>
    ),
  },
  {
    q: 'How do I care for the plant I won or took home?',
    a: (
      <>
        Congrats on your new plant friend! Here's a helpful guide on{' '}
        <a
          href="https://www.thespruce.com/how-to-repot-a-plant-1902881"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-dark hover:underline"
        >
          how to repot your plant
        </a>{' '}
        when it's ready for a bigger home.
      </>
    ),
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gold/10 last:border-0">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-charcoal group-hover:text-gold-dark transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-charcoal-light text-sm md:text-base leading-relaxed pr-10">
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-10 md:py-14">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-gold/10 px-6 md:px-10">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
