import { useState, useEffect } from 'react'
import EventCard from './EventCard'
import { FlowerIcon } from './Icons'
import { EventsBotanicals } from './BotanicalBackgrounds'
import { fetchEvents } from '../lib/api'

export default function EventGrid({ limit, showHeader = true }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchFailed, setFetchFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchEvents()
      .then((data) => {
        if (cancelled) return
        setEvents(Array.isArray(data) ? data : [])
        setFetchFailed(false)
      })
      .catch((err) => {
        if (cancelled) return
        console.error('[EventGrid] failed to load events:', err)
        setFetchFailed(true)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
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
            {fetchFailed ? (
              <>
                <h3 className="font-serif text-xl text-charcoal mb-2">We couldn't load events just now</h3>
                <p className="text-charcoal-light mb-5">Give it a moment and refresh, or try again in a bit.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light transition-colors"
                >
                  Try again
                </button>
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl text-charcoal mb-2">No upcoming events</h3>
                <p className="text-charcoal-light">Check back soon — new workshops are always in the works!</p>
              </>
            )}
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
