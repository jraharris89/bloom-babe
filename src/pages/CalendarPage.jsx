import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  LocationIcon,
  ArrowRightIcon,
  FlowerIcon,
} from '../components/Icons'
import StatusBadge, { getTicketStatus } from '../components/StatusBadge'
import { getEventType } from '../lib/eventTypes'
import { fetchEvents } from '../lib/api'

const DEMO_EVENTS = [
  {
    id: 'demo-1',
    name: 'Plant Bingo',
    type: 'plant-games',
    date: new Date('2026-06-27T19:00:00').toISOString(),
    location: 'Iconic Venue, Boise',
    price: 25,
    totalTickets: 30,
    soldTickets: 0,
    ageRequirement: 21,
  },
  {
    id: 'demo-2',
    name: 'Paint & Sip: Botanical Edition',
    type: 'paint-night',
    date: new Date(Date.now() + 14 * 86400000).toISOString(),
    location: 'Bloom Studio',
    price: 45,
    totalTickets: 24,
    soldTickets: 8,
  },
  {
    id: 'demo-3',
    name: 'Terrarium Building Night',
    type: 'terrarium',
    date: new Date(Date.now() + 21 * 86400000).toISOString(),
    location: 'The Garden Room, Downtown',
    price: 55,
    totalTickets: 16,
    soldTickets: 15,
  },
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Type → accent color map (tailwind bg classes)
const TYPE_COLORS = {
  'plant-games': 'bg-sage/20 text-sage-dark',
  'paint-night': 'bg-rose/15 text-rose-700',
  'terrarium': 'bg-sage/20 text-sage-dark',
  'floral': 'bg-gold/15 text-gold-dark',
  'crafting': 'bg-gold/15 text-gold-dark',
}

function getTypeColor(type) {
  return TYPE_COLORS[type] || 'bg-gold/15 text-gold-dark'
}

export default function CalendarPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [events, setEvents] = useState(DEMO_EVENTS)

  useEffect(() => {
    fetchEvents()
      .then((data) => { if (data?.length > 0) setEvents(data) })
      .catch(() => {})
  }, [])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }
  const goToday = () => {
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const startDay = new Date(viewYear, viewMonth, 1).getDay()

  // Build the flat cell array: nulls for leading empty slots, then 1..N
  const cells = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  // Index events by day number for this month
  const eventsByDay = {}
  events.forEach((e) => {
    const d = new Date(e.date)
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      const day = d.getDate()
      if (!eventsByDay[day]) eventsByDay[day] = []
      eventsByDay[day].push(e)
    }
  })

  // Sorted list of events this month for the detail section below
  const monthEvents = events
    .filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const isToday = (day) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear()

  const isPastDay = (day) => new Date(viewYear, viewMonth, day) < today

  const isCurrentMonth =
    viewMonth === today.getMonth() && viewYear === today.getFullYear()

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">
            Schedule
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
            Event Calendar
          </h1>
        </div>

        {/* Month navigation */}
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full border border-gold/20 text-charcoal-light hover:bg-cream-dark hover:text-charcoal transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <h2 className="font-serif text-2xl text-charcoal min-w-[200px] text-center">
            {MONTHS[viewMonth]} {viewYear}
          </h2>

          <button
            onClick={nextMonth}
            className="p-2 rounded-full border border-gold/20 text-charcoal-light hover:bg-cream-dark hover:text-charcoal transition-colors"
            aria-label="Next month"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {!isCurrentMonth && (
            <button
              onClick={goToday}
              className="ml-2 px-4 py-1.5 rounded-full border border-gold/20 text-charcoal-light text-xs font-medium hover:bg-cream-dark transition-colors"
            >
              Today
            </button>
          )}
        </div>

        {/* Calendar grid */}
        <div className="bg-white rounded-2xl border border-gold/10 overflow-hidden mb-10 shadow-sm">

          {/* Day-of-week header */}
          <div className="grid grid-cols-7 bg-cream/60 border-b border-gold/10">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-3 text-center text-xs font-medium font-sans tracking-widest uppercase text-charcoal-light"
              >
                <span className="hidden sm:inline">{d}</span>
                <span className="sm:hidden">{d[0]}</span>
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 divide-x divide-y divide-gold/5">
            {cells.map((day, i) => {
              const dayEvents = day ? (eventsByDay[day] || []) : []
              const todayCell = day && isToday(day)
              const past = day && isPastDay(day)

              return (
                <div
                  key={i}
                  className={`relative min-h-[64px] md:min-h-[96px] p-1.5 md:p-2 ${
                    !day ? 'bg-cream/20' : ''
                  } ${past && !todayCell ? 'opacity-40' : ''}`}
                >
                  {day && (
                    <>
                      {/* Day number */}
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                          todayCell
                            ? 'bg-gold text-charcoal font-semibold'
                            : 'text-charcoal-light'
                        }`}
                      >
                        {day}
                      </span>

                      {/* Events */}
                      <div className="mt-0.5 space-y-0.5">
                        {dayEvents.map((event) => {
                          const status = getTicketStatus(event.totalTickets, event.soldTickets ?? 0)
                          const isSoldOut = status === 'sold-out'
                          const colorClass = getTypeColor(event.type)

                          return (
                            <div key={event.id}>
                              {/* Mobile: colored dot */}
                              <div className="md:hidden flex justify-center mt-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${isSoldOut ? 'bg-charcoal/30' : 'bg-gold'}`} />
                              </div>

                              {/* Desktop: event pill */}
                              {isSoldOut ? (
                                <div className={`hidden md:block px-1.5 py-0.5 rounded text-[10px] leading-tight truncate opacity-50 bg-charcoal/5 text-charcoal-light`}>
                                  {event.name}
                                </div>
                              ) : (
                                <Link
                                  to={`/events/${event.id}`}
                                  className={`hidden md:block px-1.5 py-0.5 rounded text-[10px] leading-tight truncate hover:opacity-80 transition-opacity ${colorClass}`}
                                >
                                  {event.name}
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Events list for this month */}
        <div>
          <h3 className="font-serif text-2xl text-charcoal mb-6">
            {monthEvents.length > 0
              ? `Events in ${MONTHS[viewMonth]}`
              : `No events in ${MONTHS[viewMonth]}`}
          </h3>

          {monthEvents.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gold/10">
              <FlowerIcon className="w-14 h-14 text-gold/25 mx-auto mb-4" />
              <p className="text-charcoal-light">
                Nothing scheduled this month — use the arrows to browse other months!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {monthEvents.map((event) => {
                const eventType = getEventType(event.type)
                const EventIcon = eventType.icon
                const date = new Date(event.date)
                const status = getTicketStatus(event.totalTickets, event.soldTickets ?? 0)
                const isSoldOut = status === 'sold-out'

                const Card = isSoldOut ? 'div' : Link
                const cardProps = isSoldOut ? {} : { to: `/events/${event.id}` }

                return (
                  <Card
                    key={event.id}
                    {...cardProps}
                    className={`group flex gap-4 md:gap-6 bg-white rounded-2xl border border-gold/10 p-5 transition-all duration-300 ${
                      isSoldOut
                        ? 'opacity-60'
                        : 'hover:border-gold/25 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Date badge */}
                    <div className="flex flex-col items-center justify-center w-14 shrink-0 text-center">
                      <span className="text-xs font-medium uppercase text-gold font-sans tracking-widest">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="font-serif text-3xl text-charcoal leading-none">
                        {date.getDate()}
                      </span>
                      <span className="text-xs text-charcoal-light mt-0.5">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-gold/10 self-stretch" />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(event.type)}`}>
                              <EventIcon className="w-3 h-3" />
                              {eventType.label}
                            </span>
                            {event.ageRequirement && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-charcoal/5 text-charcoal-light font-medium">
                                {event.ageRequirement}+
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-lg md:text-xl text-charcoal group-hover:text-gold-dark transition-colors truncate">
                            {event.name}
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-charcoal-light">
                            <span>
                              {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <LocationIcon className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="font-medium text-charcoal text-lg">${event.price}</p>
                          <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets ?? 0} />
                          {!isSoldOut && (
                            <div className="hidden md:flex items-center justify-end gap-1 text-gold-dark text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                              Get Tickets
                              <ArrowRightIcon className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
