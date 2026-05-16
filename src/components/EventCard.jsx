import { Link } from 'react-router-dom'
import { CalendarIcon, LocationIcon, TicketIcon, ArrowRightIcon } from './Icons'
import StatusBadge, { getTicketStatus } from './StatusBadge'
import { getEventType } from '../lib/eventTypes'
import { normalizeImageUrl } from '../lib/imageUrl'

export default function EventCard({ event }) {
  const eventType = getEventType(event.type)
  const EventIcon = eventType.icon
  const status = getTicketStatus(event.totalTickets, event.soldTickets)
  const isSoldOut = status === 'sold-out'

  const date = new Date(event.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  const cardClasses = `group block bg-white rounded-2xl overflow-hidden border border-gold/10 transition-all duration-300 ${
    isSoldOut
      ? 'opacity-70'
      : 'hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 hover:border-gold/20'
  }`

  const content = (
    <>
      {/* Image area with event type icon */}
      <div className="relative h-52 bg-linear-to-br from-cream-dark to-cream overflow-hidden">
        {event.image ? (
          <img
            src={normalizeImageUrl(event.image)}
            alt={event.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={event.imagePosition ? { objectPosition: `${event.imagePosition.x}% ${event.imagePosition.y}%` } : undefined}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <EventIcon className={`w-20 h-20 text-${eventType.color} opacity-30`} />
          </div>
        )}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-transparent bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal leading-none">
            <EventIcon className="w-3.5 h-3.5" />
            {eventType.label}
          </span>
          <div className="flex items-center gap-1.5">
            {event.ageRequirement && (
              <span className="px-2 py-1 rounded-full bg-charcoal/80 backdrop-blur-sm text-xs font-medium text-white leading-none">
                {event.ageRequirement}+
              </span>
            )}
            <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">
        <h3 className="font-serif text-xl text-charcoal mb-3 line-clamp-2 min-h-14 group-hover:text-gold-dark transition-colors">
          {event.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-charcoal-light text-sm">
            <CalendarIcon className="w-4 h-4 text-gold/70 shrink-0" />
            <span>{formattedDate} at {formattedTime}</span>
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

        {!isSoldOut && (
          <div className="flex items-center gap-1 text-gold-dark text-sm font-medium group-hover:gap-2 transition-all">
            Get Tickets
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    </>
  )

  if (isSoldOut) {
    return <article className={cardClasses}>{content}</article>
  }

  return (
    <Link to={`/events/${event.id}`} className={cardClasses}>
      {content}
    </Link>
  )
}
