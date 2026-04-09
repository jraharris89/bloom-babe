import { useState, useEffect } from 'react'
import EventCard from './EventCard'
import { FloralDivider, FlowerIcon } from './Icons'
import { fetchEvents } from '../lib/api'

// Demo events for development / when no backend is connected
const DEMO_EVENTS = [
  {
    id: 'demo-1',
    name: 'Spring Floral Arrangement Workshop',
    type: 'floral',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'The Garden Room, Downtown',
    price: 65,
    totalTickets: 20,
    soldTickets: 14,
    description: 'Create a stunning seasonal arrangement using fresh spring blooms. All materials provided — just bring your creativity and a friend!',
  },
  {
    id: 'demo-2',
    name: 'Paint & Sip: Botanical Edition',
    type: 'paint-night',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Bloom Studio',
    price: 45,
    totalTickets: 24,
    soldTickets: 8,
    description: 'Grab a brush and your favorite drink — we\'re painting botanicals! No experience needed.',
  },
  {
    id: 'demo-3',
    name: 'Terrarium Building Night',
    type: 'terrarium',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'The Garden Room, Downtown',
    price: 55,
    totalTickets: 16,
    soldTickets: 15,
    description: 'Build your own living terrarium to take home. We supply the glass vessels, soil, moss, and mini plants.',
  },
  {
    id: 'demo-4',
    name: 'Plant Games for Plant Prizes',
    type: 'plant-games',
    date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Bloom Studio',
    price: 35,
    totalTickets: 30,
    soldTickets: 30,
    description: 'A night of plant trivia, games, and prizes. Winners take home beautiful plants!',
  },
]

export default function EventGrid({ limit, showHeader = true }) {
  const [events, setEvents] = useState(DEMO_EVENTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchEvents()
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data)
        }
      })
      .catch(() => {
        // Use demo events if API is not available
      })
      .finally(() => setLoading(false))
  }, [])

  const displayEvents = limit ? events.slice(0, limit) : events

  return (
    <section id="events" className="py-24 md:py-32 bg-cream-dark/30">
      <div className="max-w-6xl mx-auto px-6">
        {showHeader && (
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-sans font-medium">
              Upcoming
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">
              Workshops & Events
            </h2>
            <FloralDivider className="w-48 mx-auto text-gold mb-8" />
            <p className="text-charcoal-light text-base md:text-lg max-w-xl mx-auto">
              Find your next creative experience. Grab a ticket before they're gone!
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gold/10 animate-pulse">
                <div className="h-52 bg-cream-dark" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-cream-dark rounded w-3/4" />
                  <div className="h-4 bg-cream-dark rounded w-1/2" />
                  <div className="h-4 bg-cream-dark rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="text-center py-16">
            <FlowerIcon className="w-16 h-16 text-gold/30 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-charcoal mb-2">No upcoming events</h3>
            <p className="text-charcoal-light">Check back soon — new workshops are always in the works!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
