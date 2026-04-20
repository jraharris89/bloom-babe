import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon, FlowerIcon } from '../components/Icons'
import StatusBadge from '../components/StatusBadge'
import TicketForm from '../components/TicketForm'
import { getEventType } from '../lib/eventTypes'
import { fetchEvent } from '../lib/api'

// Demo event for development
const DEMO_EVENTS = {
  'demo-1': {
    id: 'demo-1',
    name: 'Spring Floral Arrangement Workshop',
    type: 'floral',
    image: import.meta.env.BASE_URL + 'Floral_Arrangement.jpg',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'The Garden Room, Downtown',
    price: 65,
    totalTickets: 20,
    soldTickets: 14,
    description: 'Create a stunning seasonal arrangement using fresh spring blooms. All materials provided — just bring your creativity and a friend!\n\nIn this 2-hour workshop, you\'ll learn the fundamentals of floral design while building a gorgeous centerpiece you can take home. Our experienced instructor will guide you through color theory, stem cutting techniques, and arrangement principles.\n\nWhat\'s included:\n- All flowers and greenery\n- Vase to take home\n- Light refreshments\n- A great time with great people',
  },
  'demo-2': {
    id: 'demo-2',
    name: 'Paint & Sip: Botanical Edition',
    type: 'paint-night',
    image: import.meta.env.BASE_URL + 'Paint_Night.jpg',
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
    image: import.meta.env.BASE_URL + 'Terrarium.jpg',
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

  useEffect(() => {
    fetchEvent(id)
      .then(setEvent)
      .catch(() => {
        // Fall back to demo data
        if (DEMO_EVENTS[id]) {
          setEvent(DEMO_EVENTS[id])
        }
      })
      .finally(() => setLoading(false))
  }, [id])

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
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
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
            </div>

            <div className="prose prose-sm max-w-none">
              {event.description.split('\n').map((line, i) => (
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
