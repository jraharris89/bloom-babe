import { Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon, FloralDivider } from '../components/Icons'
import StatusBadge, { getTicketStatus } from '../components/StatusBadge'
import { getEventType } from '../lib/eventTypes'

/*
  Design 2: "Full-Bleed & Thread"
  - A thin decorative vertical line runs down the page as a visual thread
  - A full-bleed image/color band mid-page breaks the container
  - Offset/staggered elements bridge section boundaries
  - Content alternates left/right alignment
*/

const DEMO_EVENTS = [
  { id: 'demo-1', name: 'Spring Floral Arrangement Workshop', type: 'floral', date: new Date(Date.now() + 7 * 86400000).toISOString(), location: 'The Garden Room, Downtown', price: 65, totalTickets: 20, soldTickets: 14 },
  { id: 'demo-2', name: 'Paint & Sip: Botanical Edition', type: 'paint-night', date: new Date(Date.now() + 14 * 86400000).toISOString(), location: 'Bloom Studio', price: 45, totalTickets: 24, soldTickets: 8 },
  { id: 'demo-3', name: 'Terrarium Building Night', type: 'terrarium', date: new Date(Date.now() + 21 * 86400000).toISOString(), location: 'The Garden Room, Downtown', price: 55, totalTickets: 16, soldTickets: 15 },
]

function EventRow({ event, flip }) {
  const eventType = getEventType(event.type)
  const EventIcon = eventType.icon
  const date = new Date(event.date)
  const status = getTicketStatus(event.totalTickets, event.soldTickets)
  const isSoldOut = status === 'sold-out'

  return (
    <Link
      to={isSoldOut ? '#' : `/events/${event.id}`}
      className={`group grid md:grid-cols-5 gap-6 md:gap-10 items-center py-8 ${isSoldOut ? 'opacity-60' : ''}`}
    >
      {/* Image side */}
      <div className={`md:col-span-2 ${flip ? 'md:order-2' : ''}`}>
        <div className="relative h-48 md:h-56 rounded-xl overflow-hidden bg-cream-dark">
          <div className="w-full h-full flex items-center justify-center">
            <EventIcon className="w-20 h-20 text-sage/25" />
          </div>
          <div className="absolute top-3 left-3">
            <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets} />
          </div>
        </div>
      </div>

      {/* Text side */}
      <div className={`md:col-span-3 ${flip ? 'md:order-1 md:text-right' : ''}`}>
        <p className="text-xs text-gold font-medium font-sans uppercase tracking-[0.08em] mb-2">{eventType.label}</p>
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors">{event.name}</h3>
        <div className={`flex items-center gap-5 text-charcoal-light text-sm mb-4 ${flip ? 'md:justify-end' : ''}`}>
          <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-gold/60" />{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          {event.location && <span className="flex items-center gap-1.5"><LocationIcon className="w-4 h-4 text-gold/60" />{event.location}</span>}
        </div>
        <div className={`flex items-center gap-4 ${flip ? 'md:justify-end' : ''}`}>
          <span className="text-charcoal font-medium">${event.price}</span>
          {!isSoldOut && (
            <span className="flex items-center gap-1 text-gold-dark text-sm font-medium group-hover:gap-2 transition-all">
              Get Tickets <ArrowRightIcon className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function Design2() {
  return (
    <div className="bg-cream min-h-screen relative">
      {/* Vertical thread — thin gold line running down the page */}
      <div className="hidden md:block absolute left-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-24 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Small dot on the thread line */}
          <div className="hidden md:block absolute left-[8%] -translate-x-1/2 mt-4 w-2.5 h-2.5 rounded-full bg-gold/40" />

          <div className="md:pl-[12%]">
            <p className="text-gold text-xs tracking-[0.12em] uppercase mb-4 font-sans font-medium">
              Floral & Events
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal mb-8 leading-[1.05] max-w-3xl">
              Where Creativity
              <span className="italic text-gold-dark"> Blooms</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-8 items-end max-w-3xl">
              <p className="text-charcoal-light text-base md:text-lg leading-relaxed">
                Hands-on workshops where you connect, create, and walk away with
                something beautiful you made yourself.
              </p>
              <div>
                <a
                  href="#events"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal text-cream font-medium text-sm tracking-wide hover:bg-charcoal-light transition-all duration-300"
                >
                  Explore Workshops
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed image/color band — breaks the container entirely */}
      <section className="relative w-full h-48 md:h-72 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(201,169,110,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, rgba(168,181,160,0.1) 0%, transparent 45%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <blockquote className="font-serif text-2xl md:text-4xl text-cream text-center max-w-2xl leading-snug">
            Get your hands dirty. Laugh with strangers.
            <span className="block italic text-gold mt-2">Walk away recharged.</span>
          </blockquote>
        </div>
      </section>

      {/* About — offset, flows from the full-bleed band */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="hidden md:block absolute left-[8%] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gold/40" />

          <div className="md:pl-[12%] max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              What is Bloom Babe?
            </h2>
            <p className="text-charcoal-light text-base md:text-lg leading-relaxed mb-4 max-w-prose">
              Bloom Babe is your invitation to slow down, get creative, and share an experience
              with people who love beautiful things. From floral arrangements to terrariums to
              paint nights — we host workshops that feel less like a class and more like a
              get-together with your favorite people.
            </p>
            <p className="text-charcoal-light text-base md:text-lg leading-relaxed max-w-prose">
              Whether you come solo or with your crew, our goal is simple: for you to
              feel inspired, welcomed, and just a little more like yourself when you leave.
            </p>
          </div>
        </div>
      </section>

      {/* Events — alternating left/right layout */}
      <section id="events" className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="hidden md:block absolute left-[8%] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gold/40" />

          <div className="md:pl-[12%] mb-10">
            <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">Upcoming</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Workshops & Events</h2>
          </div>

          <div className="md:pl-[12%] divide-y divide-gold/10">
            {DEMO_EVENTS.map((event, i) => (
              <EventRow key={event.id} event={event} flip={i % 2 === 1} />
            ))}
          </div>

          <div className="md:pl-[12%] mt-8">
            <Link to="/events" className="text-charcoal-light hover:text-gold text-sm transition-colors flex items-center gap-1">
              View all workshops <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
