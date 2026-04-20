import { useState, useEffect } from 'react'
import EventCard from './EventCard'
import { FlowerIcon } from './Icons'
import { EventsBotanicals } from './BotanicalBackgrounds'
import { fetchEvents } from '../lib/api'

// Demo events for development / when no backend is connected
const DEMO_EVENTS = [
  {
    id: 'demo-1',
    name: 'Spring Floral Arrangement Workshop',
    type: 'floral',
    image: import.meta.env.BASE_URL + 'Floral_Arrangement.jpg',
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
    image: import.meta.env.BASE_URL + 'Paint_Night.jpg',
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
    image: import.meta.env.BASE_URL + 'Terrarium.jpg',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'The Garden Room, Downtown',
    price: 55,
    totalTickets: 16,
    soldTickets: 15,
    description: 'Build your own living terrarium to take home. We supply the glass vessels, soil, moss, and mini plants.',
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
    <section id="events" className="relative py-20 md:py-28 bg-cream-dark/30 overflow-hidden">
      {/* Botanical background layers */}
      <EventsBotanicals />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">
                Upcoming
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                Workshops & Events
              </h2>
            </div>
            <p className="text-charcoal-light text-sm md:text-base max-w-sm">
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
