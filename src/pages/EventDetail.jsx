import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon, FlowerIcon, DownloadIcon } from '../components/Icons'
import { downloadICS } from '../lib/ics'
import { normalizeImageUrl } from '../lib/imageUrl'
import StatusBadge from '../components/StatusBadge'
import TicketForm from '../components/TicketForm'
import { getEventType } from '../lib/eventTypes'
import { fetchEvent } from '../lib/api'

// Demo event for development
const DEMO_EVENTS = {
  'demo-1': {
    id: 'demo-1',
    name: 'Plant Bingo',
    type: 'plant-games',
    image: '/Floral_Arrangement.jpg',
    date: new Date('2026-06-27T19:00:00').toISOString(),
    location: 'Iconic Venue, Boise',
    price: 25,
    totalTickets: 30,
    soldTickets: 0,
    ageRequirement: 21,
    description: 'It\'s bingo — but make it botanical. Win plants and prizes while sipping your favorite drink.\n\nThis is our very first Bloom Babe event and we are SO excited to kick things off with a night of plant bingo! Play for a chance to win beautiful plants, hang with great people, and laugh a lot.\n\nWhat\'s included:\n- Bingo cards + daubers\n- Plant and prize giveaways\n- Good vibes all night\n\n21+ event. Please verify your age at the door. Must be 21 or older to attend.',
  },
  'demo-2': {
    id: 'demo-2',
    name: 'Paint & Sip: Botanical Edition',
    type: 'paint-night',
    image: '/Paint_Night.jpg',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Bloom Studio',
    price: 45,
    totalTickets: 24,
    soldTickets: 8,
    description: 'Grab a brush and your favorite drink — we\'re painting botanicals! No experience needed. Our instructor will walk you through every step as you create your own botanical masterpiece on canvas.\n\nWhat\'s included:\n- All painting supplies\n- Canvas to take home\n- Light snacks\n- BYOB friendly',
  },
  'demo-3': {
    id: 'demo-3',
    name: 'Terrarium Building Night',
    type: 'terrarium',
    image: '/Terrarium.jpg',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'The Garden Room, Downtown',
    price: 55,
    totalTickets: 16,
    soldTickets: 15,
    description: 'Build your own living terrarium to take home. We supply the glass vessels, soil, moss, and mini plants.\n\nLearn about different plant ecosystems and create a self-sustaining mini garden that will thrive on your desk or windowsill.\n\nWhat\'s included:\n- Glass vessel\n- Soil, rocks, and moss\n- Mini plants\n- Care instructions',
  },
}

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const isDev = import.meta.env.DEV

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchEvent(id)
      .then((data) => { if (!cancelled) setEvent(data) })
      .catch((err) => {
        if (cancelled) return
        console.error('[EventDetail] failed to load event:', err)
        // Only fall back to demo data in development.
        if (isDev && DEMO_EVENTS[id]) setEvent(DEMO_EVENTS[id])
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [id, isDev])

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-cream-dark rounded w-1/3" />
            <div className="h-64 bg-cream-dark rounded-2xl" />
            <div className="h-4 bg-cream-dark rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <FlowerIcon className="w-16 h-16 text-gold/30 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-charcoal mb-2">Event Not Found</h2>
          <p className="text-charcoal-light mb-6">This event may have been removed or doesn't exist.</p>
          <Link to="/events" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-charcoal font-medium text-sm hover:bg-gold-light transition-colors">
            View All Events
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const eventType = getEventType(event.type)
  const EventIcon = eventType.icon
  const date = new Date(event.date)

  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-charcoal-light mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-gold transition-colors">Events</Link>
          <span>/</span>
          <span className="text-charcoal">{event.name}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Event details — left column */}
          <div className="lg:col-span-3">
            {/* Hero image / placeholder */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-cream-dark to-cream rounded-2xl overflow-hidden mb-8 border border-gold/10">
              {event.image ? (
                <img
                  src={normalizeImageUrl(event.image)}
                  alt={event.name}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <EventIcon className={`w-28 h-28 text-${eventType.color} opacity-20`} />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal">
                  <EventIcon className="w-3.5 h-3.5" />
                  {eventType.label}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets} />
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">{event.name}</h1>

            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 text-charcoal-light text-sm">
                <CalendarIcon className="w-4 h-4 text-gold/70 shrink-0" />
                <span>{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-charcoal-light text-sm">
                  <LocationIcon className="w-4 h-4 text-gold/70 shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-charcoal-light text-sm">
                <TicketIcon className="w-4 h-4 text-gold/70 shrink-0" />
                <span>${event.price} per person</span>
              </div>
              {event.ageRequirement && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/5 border border-charcoal/10 text-xs font-medium text-charcoal mt-1">
                  {event.ageRequirement}+ Event — Valid ID required at the door
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => downloadICS(event)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 text-charcoal text-sm font-medium hover:bg-gold/10 transition-colors mb-8"
            >
              <DownloadIcon className="w-4 h-4 text-gold" />
              Add to Calendar
            </button>

            <div className="prose prose-sm max-w-none">
              {(event.description || '').split('\n').map((line, i) => (
                line.trim() ? (
                  <p key={i} className="text-charcoal-light leading-relaxed mb-3">{line}</p>
                ) : (
                  <br key={i} />
                )
              ))}
            </div>
          </div>

          {/* Ticket form — right column */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <TicketForm event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
