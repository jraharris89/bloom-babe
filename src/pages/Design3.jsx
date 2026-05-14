import { Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon, FloralCorner } from '../components/Icons'
import StatusBadge, { getTicketStatus } from '../components/StatusBadge'
import { getEventType } from '../lib/eventTypes'

/*
  Design 3: "Editorial Scroll"
  - Magazine-style continuous scroll — no section boundaries at all
  - Content widths shift dramatically (narrow → wide → narrow)
  - Elements overlap and interleave across what would have been section breaks
  - Asymmetric positioning throughout — almost nothing is centered
  - One shared background with subtle gradients that drift, not switch
*/

const DEMO_EVENTS = [
  { id: 'demo-1', name: 'Plant Bingo', type: 'plant-games', date: new Date('2026-06-27T19:00:00').toISOString(), location: 'Iconic Venue, Boise', price: 25, totalTickets: 30, soldTickets: 0 },
  { id: 'demo-2', name: 'Paint & Sip: Botanical Edition', type: 'paint-night', date: new Date(Date.now() + 14 * 86400000).toISOString(), location: 'Bloom Studio', price: 45, totalTickets: 24, soldTickets: 8 },
  { id: 'demo-3', name: 'Terrarium Building Night', type: 'terrarium', date: new Date(Date.now() + 21 * 86400000).toISOString(), location: 'The Garden Room, Downtown', price: 55, totalTickets: 16, soldTickets: 15 },
]

export default function Design3() {
  return (
    <div className="bg-cream min-h-screen relative overflow-hidden">
      {/* Drifting background gradient — not tied to any section */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 10% 20%, rgba(201,169,110,0.07) 0%, transparent 50%),
                           radial-gradient(ellipse at 90% 60%, rgba(168,181,160,0.06) 0%, transparent 45%),
                           radial-gradient(ellipse at 40% 90%, rgba(242,224,208,0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        {/* Hero — narrow, left-aligned, lots of vertical space */}
        <div className="pt-36 md:pt-48 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-lg">
              <p className="text-gold text-xs tracking-[0.12em] uppercase mb-6 font-sans font-medium">
                Bloom Babe Floral & Events
              </p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[1.0] mb-0">
                Where
              </h1>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[1.0] mb-0">
                Creativity
              </h1>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic text-gold-dark leading-[1.0]">
                Blooms
              </h1>
            </div>
          </div>
        </div>

        {/* Image + intro text — wide, overlapping the hero space */}
        <div className="px-6 pb-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-start">
            {/* Image — spans the right side, pushed up to overlap with headline */}
            <div className="md:col-span-5 md:col-start-8 md:-mt-48">
              <img
                src="/bloom-babe-logo-large.jpeg"
                alt="Bloom Babe"
                className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
              />
            </div>
            {/* Description — left side, lower than headline */}
            <div className="md:col-span-5 md:col-start-1 md:row-start-1 md:self-end">
              <p className="text-charcoal-light text-lg md:text-xl leading-relaxed max-w-md mb-8">
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
          </div>
        </div>

        {/* About — very narrow column, right-aligned for contrast */}
        <div className="py-20 md:py-32 px-6">
          <div className="max-w-6xl mx-auto flex justify-end">
            <div className="max-w-md md:max-w-sm">
              <p className="text-gold text-xs tracking-[0.12em] uppercase mb-3 font-sans font-medium">
                About
              </p>
              <p className="text-charcoal-light text-base leading-relaxed mb-5">
                Bloom Babe is your invitation to slow down, get creative, and share an experience
                with people who love beautiful things.
              </p>
              <p className="text-charcoal-light text-base leading-relaxed mb-5">
                From floral arrangements to terrariums to
                paint nights — we host workshops that feel less like a class and more like a
                get-together with your favorite people.
              </p>
              <p className="font-serif text-lg text-charcoal italic">
                Whether you come solo or with your crew — just show up.
              </p>
            </div>
          </div>
        </div>

        {/* Pull quote — full-width, large, breaking the narrow pattern */}
        <div className="py-12 md:py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-[1.1]">
              Get your hands dirty.
              <br />
              Laugh with strangers.
              <span className="block italic text-gold-dark mt-2">Walk away recharged.</span>
            </blockquote>
          </div>
        </div>

        {/* Events — no section background, just content */}
        <div id="events" className="pt-12 md:pt-20 pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">Upcoming</p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">Workshops</h2>
            </div>

            {/* Masonry-style staggered grid */}
            <div className="grid md:grid-cols-12 gap-6 md:gap-8">
              {DEMO_EVENTS.map((event, i) => {
                const eventType = getEventType(event.type)
                const EventIcon = eventType.icon
                const date = new Date(event.date)
                const status = getTicketStatus(event.totalTickets, event.soldTickets)
                const isSoldOut = status === 'sold-out'

                // Stagger columns: wide-narrow-medium
                const colClasses = [
                  'md:col-span-7',
                  'md:col-span-5 md:mt-16',
                  'md:col-span-6 md:col-start-4',
                ][i] || 'md:col-span-6'

                const Wrapper = isSoldOut ? 'article' : Link
                const wrapperProps = isSoldOut ? {} : { to: `/events/${event.id}` }

                return (
                  <Wrapper key={event.id} {...wrapperProps} className={`group block ${colClasses} ${isSoldOut ? 'opacity-60' : ''}`}>
                    <div className="relative h-52 md:h-64 rounded-xl overflow-hidden bg-cream-dark mb-4">
                      <div className="w-full h-full flex items-center justify-center">
                        <EventIcon className="w-20 h-20 text-sage/25" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets} />
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-gold font-medium font-sans uppercase tracking-[0.08em] mb-1">{eventType.label}</p>
                        <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-gold-dark transition-colors">{event.name}</h3>
                      </div>
                      <div className="text-right shrink-0 pt-1">
                        <p className="text-charcoal font-medium">${event.price}</p>
                        <p className="text-charcoal-light text-xs">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                    {event.location && (
                      <p className="flex items-center gap-1.5 text-charcoal-light text-sm mt-2">
                        <LocationIcon className="w-3.5 h-3.5 text-gold/60" />
                        {event.location}
                      </p>
                    )}
                  </Wrapper>
                )
              })}
            </div>

            <div className="mt-12">
              <Link to="/events" className="text-charcoal-light hover:text-gold text-sm transition-colors flex items-center gap-1">
                View all workshops <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
