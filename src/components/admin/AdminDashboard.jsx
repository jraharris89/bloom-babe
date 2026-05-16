import { useState, useEffect } from 'react'
import { PlusIcon, EditIcon, TrashIcon, UsersIcon, FlowerIcon, CalendarIcon, TicketIcon } from '../Icons'
import StatusBadge from '../StatusBadge'
import EventForm from './EventForm'
import AttendeeRoster from './AttendeeRoster'
import PromoCodeManager from './PromoCodeManager'
import { getEventType } from '../../lib/eventTypes'
import { adminFetchEvents, adminCreateEvent, adminUpdateEvent, adminDeleteEvent } from '../../lib/api'

export default function AdminDashboard({ token, onLogout }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [rosterEvent, setRosterEvent] = useState(null)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('events')

  const loadEvents = () => {
    setLoading(true)
    adminFetchEvents(token)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadEvents() }, [token])

  const handleSave = async (eventData) => {
    setSaving(true)
    try {
      if (editingEvent) {
        await adminUpdateEvent(token, editingEvent.id, eventData)
      } else {
        await adminCreateEvent(token, eventData)
      }
      setShowForm(false)
      setEditingEvent(null)
      loadEvents()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      await adminDeleteEvent(token, id)
      loadEvents()
    } catch (err) {
      alert(err.message)
    }
  }

  const openEdit = (event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const openNew = () => {
    setEditingEvent(null)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-gold/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/bloom-babe-logo-large.jpeg"
              alt="Bloom Babe"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h1 className="font-serif text-lg text-charcoal">Admin Dashboard</h1>
              <p className="text-charcoal-light text-xs">Bloom Babe Floral & Events</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-1.5 rounded-full border border-gold/20 text-charcoal-light text-xs font-medium hover:bg-cream transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gold/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex gap-6">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'events'
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-light hover:text-charcoal'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            Events
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'promos'
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-light hover:text-charcoal'
            }`}
          >
            <TicketIcon className="w-4 h-4" />
            Promo Codes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'promos' ? (
          <PromoCodeManager token={token} events={events} />
        ) : (
        <>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl text-charcoal">Events</h2>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            New Event
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-xl border border-gold/10 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gold/10">
            <FlowerIcon className="w-16 h-16 text-gold/20 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-charcoal mb-2">No events yet</h3>
            <p className="text-charcoal-light text-sm mb-6">Create your first workshop to get started.</p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gold text-charcoal font-medium text-sm hover:bg-gold-light transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Create Event
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => {
              const eventType = getEventType(event.type)
              const EventIcon = eventType.icon
              const date = new Date(event.date)
              const isPast = date < new Date()
              const isDraft = event.draft
              const isCancelled = event.cancelled

              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl border p-5 flex items-center gap-4 transition-opacity ${
                    isCancelled ? 'border-rose/20 opacity-50' : isDraft ? 'border-gold/20' : 'border-gold/10'
                  } ${isPast && !isCancelled ? 'opacity-60' : ''}`}
                >
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-cream shrink-0">
                    <EventIcon className="w-6 h-6 text-charcoal-light" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg text-charcoal truncate">{event.name}</h3>
                      {isDraft && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold-dark font-medium whitespace-nowrap">Draft</span>
                      )}
                      {isCancelled && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-rose/10 text-rose-700 font-medium whitespace-nowrap">Cancelled</span>
                      )}
                      {isPast && !isCancelled && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-charcoal/10 text-charcoal-light whitespace-nowrap">Past</span>
                      )}
                      {event.ageRequirement && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-charcoal/5 text-charcoal-light whitespace-nowrap">21+</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-light">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                      <span>${event.price} / ticket</span>
                      <span>{event.soldTickets ?? 0}/{event.totalTickets} sold</span>
                      {!isCancelled && <StatusBadge totalTickets={event.totalTickets} soldTickets={event.soldTickets ?? 0} />}
                    </div>
                    {event.location && (
                      <p className="text-xs text-charcoal-light/60 mt-1 truncate">{event.location}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setRosterEvent(event)}
                      className="p-2 rounded-lg hover:bg-cream text-charcoal-light hover:text-charcoal transition-colors"
                      title="View attendees"
                    >
                      <UsersIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEdit(event)}
                      className="p-2 rounded-lg hover:bg-cream text-charcoal-light hover:text-charcoal transition-colors"
                      title="Edit event"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 rounded-lg hover:bg-rose/10 text-charcoal-light hover:text-rose-800 transition-colors"
                      title="Delete event"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <EventForm
          event={editingEvent}
          token={token}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingEvent(null) }}
          saving={saving}
        />
      )}
      {rosterEvent && (
        <AttendeeRoster
          event={rosterEvent}
          token={token}
          onClose={() => setRosterEvent(null)}
        />
      )}
    </div>
  )
}
