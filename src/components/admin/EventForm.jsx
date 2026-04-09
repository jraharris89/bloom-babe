import { useState, useEffect } from 'react'
import { FlowerIcon, CloseIcon } from '../Icons'
import { EVENT_TYPES } from '../../lib/eventTypes'

const defaultForm = {
  name: '',
  type: 'floral',
  description: '',
  date: '',
  time: '',
  location: '',
  price: '',
  totalTickets: '',
}

export default function EventForm({ event, onSave, onCancel, saving }) {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (event) {
      const d = new Date(event.date)
      setForm({
        name: event.name,
        type: event.type,
        description: event.description,
        date: d.toISOString().split('T')[0],
        time: d.toTimeString().slice(0, 5),
        location: event.location || '',
        price: event.price.toString(),
        totalTickets: event.totalTickets.toString(),
      })
    } else {
      setForm(defaultForm)
    }
  }, [event])

  const handleSubmit = (e) => {
    e.preventDefault()
    const dateTime = new Date(`${form.date}T${form.time}`).toISOString()
    onSave({
      name: form.name,
      type: form.type,
      description: form.description,
      date: dateTime,
      location: form.location,
      price: parseFloat(form.price),
      totalTickets: parseInt(form.totalTickets, 10),
    })
  }

  const update = (field, value) => setForm({ ...form, [field]: value })

  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gold/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <h2 className="font-serif text-xl text-charcoal">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button onClick={onCancel} className="p-1.5 rounded-full hover:bg-cream transition-colors">
            <CloseIcon className="w-5 h-5 text-charcoal-light" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Event Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g., Spring Floral Workshop"
              className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Event Type</label>
            <select
              value={form.type}
              onChange={(e) => update('type', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
            >
              {Object.entries(EVENT_TYPES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Tell people what to expect..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="e.g., The Garden Room, Downtown"
              className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                placeholder="45.00"
                className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-charcoal-light mb-1.5 font-sans font-medium">Total Tickets</label>
              <input
                type="number"
                min="1"
                value={form.totalTickets}
                onChange={(e) => update('totalTickets', e.target.value)}
                placeholder="20"
                className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-full border border-gold/20 text-charcoal-light font-medium text-sm hover:bg-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
