import { Link } from 'react-router-dom'
import { FloralCorner, FloralDivider, CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon } from '../components/Icons'
import StatusBadge, { getTicketStatus } from '../components/StatusBadge'
import { getEventType } from '../lib/eventTypes'

/*
  Design 1: "Overlap & Flow"
  - One continuous cream background — no alternating color bands
  - Hero image overlaps into About section via negative margin
  - Varying content widths section to section
  - No section dividers or horizontal rules between areas
*/

const DEMO_EVENTS = [
  { id: 'demo-1', name: 'Plant Bingo', type: 'plant-games', date: new Date('2026-06-27T19:00:00').toISOString(), location: 'Iconic Venue, Boise', price: 25, totalTickets: 30, soldTickets: 0 },
  { id: 'demo-2', name: 'Paint & Sip: Botanical Edition', type: 'paint-night', date: new Date(Date.now() + 14 * 86400000).toISOString(), location: 'Bloom Studio', price: 45, totalTickets: 24, soldTickets: 8 },
  { id: 'demo-3', name: 'Terrarium Building Night', type: 'terrarium', date: new Date(Date.now() + 21 * 86400000).toISOString(), location: 'The Garden Room, Downtown', price: 55, totalTickets: 16, soldTickets: 15 },
]

function MiniCard({ event }) {
  const eventType = getEventType(event.type)
  const EventIcon = eventType.icon
  const status = getTicketStatus(event.totalTickets, event.soldTickets)
  const isSoldOut = status === 'sold-out'
  const date = new Date(event.date)

  const Wrapper = isSoldOut ? 'article' : Link
  const wrapperProps = isSoldOut ? {} : { to: `/events/${event.id}` }

  return (
    <Wrapper {...wrapperProps} className={`group block transition-all duration-300 ${isSoldOut ? 'opacity-60' : 'hover:-translate-y-1'}`}>
      <div className="relative h-44 rounded-xl overflow-hidden mb-4">
        <div className="w-full h-full bg-cream-dark flex items-center justify-center">
          <EventIcon className="w-16 h-16 text-sage/30" />
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets} />
        </div>
      </div>
      <p className="text-xs text-gold font-medium font-sans uppercase tracking-[0.08em] mb-1">{eventType.label}</p>
      <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-gold-dark transition-colors">{event.name}</h3>
      <div className="flex items-center gap-4 text-charcoal-light text-sm">
        <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-gold/60" />{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span className="flex items-center gap-1"><TicketIcon className="w-3.5 h-3.5 text-gold/60" />${event.price}</span>
      </div>
    </Wrapper>
  )
}

export default function Design1() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero — no background change, just generous space */}
      <section className="pt-32 md:pt-40 pb-0 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.12em] uppercase mb-4 font-sans font-medium">
              Floral & Events
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal mb-6 leading-tight">
              Where Creativity
              <span className="block italic text-gold-dark">Blooms</span>
            </h1>
            <p className="text-charcoal-light text-base md:text-lg max-w-md leading-relaxed mb-8">
              Hands-on workshops where you connect, create, and walk away with
              something beautiful you made yourself.
            </p>
            <a
              href="#events"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal text-cream font-medium text-sm tracking-wide hover:bg-charcoal-light transition-all duration-300"
            >
              Explore Workshops
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Image — overlaps into next section */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/bloom-babe-logo-large.jpeg"
              alt="Bloom Babe Floral & Events"
              className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-2xl ring-2 ring-gold/10 md:translate-y-24"
            />
          </div>
        </div>
      </section>

      {/* About — flows directly from hero, no bg change, narrower max-width */}
      <section className="pt-20 md:pt-40 pb-24 px-6">
        <div className="max-w-2xl mx-auto md:ml-[10%] md:mr-auto">
          <p className="text-charcoal-light text-base md:text-lg leading-relaxed mb-6 max-w-prose">
            Bloom Babe is your invitation to slow down, get creative, and share an experience
            with people who love beautiful things. From floral arrangements to terrariums to
            paint nights — we host workshops that feel less like a class and more like a
            get-together with your favorite people.
          </p>
          <blockquote className="font-serif text-xl md:text-2xl text-charcoal leading-snug border-l-2 border-gold/30 pl-6">
            Get your hands dirty. Laugh with strangers.
            <span className="block italic text-gold-dark mt-1">Walk away recharged.</span>
          </blockquote>
        </div>
      </section>

      {/* Events — wider container, same background, no divider */}
      <section id="events" className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">Upcoming</p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Workshops</h2>
            </div>
            <Link to="/events" className="text-charcoal-light hover:text-gold text-sm transition-colors flex items-center gap-1">
              View all <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DEMO_EVENTS.map(event => <MiniCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
