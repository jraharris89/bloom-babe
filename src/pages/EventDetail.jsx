import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon, FlowerIcon, DownloadIcon } from '../components/Icons'
import { downloadICS } from '../lib/ics'
import { normalizeImageUrl } from '../lib/imageUrl'
import StatusBadge from '../components/StatusBadge'
import TicketForm from '../components/TicketForm'
import { getEventType } from '../lib/eventTypes'
import { fetchEvent } from '../lib/api'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchEvent(id)
      .then((data) => { if (!cancelled) setEvent(data) })
      .catch((err) => {
        if (cancelled) return
        console.error('[EventDetail] failed to load event:', err)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
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
                <img
                  src={normalizeImageUrl(event.image)}
                  alt={event.name}
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={event.imagePosition ? { objectPosition: `${event.imagePosition.x}% ${event.imagePosition.y}%` } : undefined}
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
