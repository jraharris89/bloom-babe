import { useState, useEffect } from 'react'
import { CloseIcon } from '../Icons'
import { EVENT_TYPES } from '../../lib/eventTypes'
import { normalizeImageUrl } from '../../lib/imageUrl'

const defaultForm = {
  name: '',
  type: 'plant-games',
  description: '',
  date: '',
  time: '19:00',
  location: '',
  price: '',
  totalTickets: '',
  ageRequirement: false,
  image: '',
  draft: false,
  cancelled: false,
}

function Toggle({ enabled, onChange, label, sublabel, danger }) {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer select-none p-3 rounded-lg border transition-colors ${
        danger
          ? 'border-rose/10 bg-rose/5 hover:bg-rose/10'
          : 'border-gold/10 bg-cream/20 hover:bg-cream/40'
      }`}
      onClick={onChange}
    >
      <div
        className={`relative w-10 h-5 rounded-full shrink-0 transition-colors ${
          enabled
            ? danger ? 'bg-rose-600' : 'bg-charcoal'
            : 'bg-gold/20'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-charcoal">{label}</p>
        {sublabel && <p className="text-xs text-charcoal-light leading-relaxed">{sublabel}</p>}
      </div>
    </div>
  )
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/40 focus:outline-none focus:ring-1 transition-colors'

const inputOk = 'border-gold/15 focus:border-gold/40 focus:ring-gold/20'
const inputErr = 'border-rose-400 bg-rose-50/40 focus:border-rose-400 focus:ring-rose-200'

function SectionHeading({ children }) {
  return (
    <p className="text-xs tracking-[0.12em] uppercase text-gold font-sans font-medium mb-3 mt-6 first:mt-0">
      {children}
    </p>
  )
}

function Field({ id, label, hint, error, children }) {
  return (
    <div id={id}>
      <label className={`block text-xs tracking-widest uppercase mb-1.5 font-sans font-medium ${error ? 'text-rose-500' : 'text-charcoal-light'}`}>
        {label}
      </label>
      {children}
      {error
        ? <p className="text-xs text-rose-500 mt-1">{error}</p>
        : hint && <p className="text-xs text-charcoal-light/50 mt-1">{hint}</p>
      }
    </div>
  )
}

export default function EventForm({ event, onSave, onCancel, saving }) {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    setErrors({})
    if (event) {
      const d = new Date(event.date)
      setForm({
        name: event.name || '',
        type: event.type || 'plant-games',
        description: event.description || '',
        date: d.toISOString().split('T')[0],
        time: d.toTimeString().slice(0, 5),
        location: event.location || '',
        price: event.price?.toString() || '',
        totalTickets: event.totalTickets?.toString() || '',
        ageRequirement: !!event.ageRequirement,
        image: event.image || '',
        draft: event.draft ?? false,
        cancelled: event.cancelled ?? false,
      })
    } else {
      setForm(defaultForm)
    }
  }, [event])

  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Event name is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.date) e.date = 'Date is required'
    if (!form.location.trim()) e.location = 'Location is required'
    const price = parseFloat(form.price)
    if (form.price === '' || isNaN(price) || price < 0) e.price = 'Enter a valid price (0 or more)'
    const tickets = parseInt(form.totalTickets, 10)
    if (!form.totalTickets || isNaN(tickets) || tickets < 1) e.totalTickets = 'Enter a capacity of at least 1'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const dateTime = new Date(`${form.date}T${form.time}`).toISOString()
    onSave({
      name: form.name.trim(),
      type: form.type,
      description: form.description.trim(),
      date: dateTime,
      location: form.location.trim(),
      price: parseFloat(form.price),
      totalTickets: parseInt(form.totalTickets, 10),
      ageRequirement: form.ageRequirement ? 21 : null,
      image: form.image.trim() || null,
      draft: form.draft,
      cancelled: form.cancelled,
    })
  }

  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gold/10 w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 shrink-0">
          <h2 className="font-serif text-xl text-charcoal">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-full hover:bg-cream transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-charcoal-light" />
          </button>
        </div>

        {/* Scrollable body */}
        <form id="event-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* ── Event Details ── */}
          <SectionHeading>Event Details</SectionHeading>

          <Field id="field-name" label="Event Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g., Plant Bingo Night"
              className={`${inputClass} ${errors.name ? inputErr : inputOk}`}
            />
          </Field>

          <Field label="Event Type">
            <select
              value={form.type}
              onChange={(e) => update('type', e.target.value)}
              className={inputClass}
            >
              {Object.entries(EVENT_TYPES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </Field>

          <Field
            id="field-description"
            label="Description"
            hint="Each blank line becomes a paragraph break on the event page."
            error={errors.description}
          >
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder={`Tell people what to expect!\n\nWhat's included? What should they know before they come?`}
              rows={6}
              className={`${inputClass} ${errors.description ? inputErr : inputOk} resize-none`}
            />
          </Field>

          {/* ── Date & Location ── */}
          <SectionHeading>Date & Location</SectionHeading>

          <div className="grid grid-cols-2 gap-3">
            <Field id="field-date" label="Date" error={errors.date}>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className={`${inputClass} ${errors.date ? inputErr : inputOk}`}
              />
            </Field>
            <Field label="Start Time">
              <input
                type="time"
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className={inputClass}
                required
              />
            </Field>
          </div>

          <Field
            id="field-location"
            label="Venue / Location"
            hint="Include the venue name and address so guests know exactly where to go."
            error={errors.location}
          >
            <input
              type="text"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="e.g., Iconic Venue — 123 Main St, Boise"
              className={`${inputClass} ${errors.location ? inputErr : inputOk}`}
            />
          </Field>

          <Toggle
            enabled={form.ageRequirement}
            onChange={() => update('ageRequirement', !form.ageRequirement)}
            label="21+ Event"
            sublabel="This event is held at a bar or 21+ venue — guests will see an ID reminder and it will appear in the FAQ"
          />

          {/* ── Tickets & Pricing ── */}
          <SectionHeading>Tickets & Pricing</SectionHeading>

          <div className="grid grid-cols-2 gap-3">
            <Field id="field-price" label="Ticket Price ($)" error={errors.price}>
              <input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                placeholder="25"
                className={`${inputClass} ${errors.price ? inputErr : inputOk}`}
              />
            </Field>
            <Field id="field-totalTickets" label="Total Capacity" error={errors.totalTickets}>
              <input
                type="number"
                min="1"
                value={form.totalTickets}
                onChange={(e) => update('totalTickets', e.target.value)}
                placeholder="30"
                className={`${inputClass} ${errors.totalTickets ? inputErr : inputOk}`}
              />
            </Field>
          </div>

          {/* ── Event Photo ── */}
          <SectionHeading>Event Photo</SectionHeading>

          <Field
            label="Image URL"
            hint="Paste a link to your event photo. Google Drive share links, Dropbox links, and direct image URLs all work — we'll handle the conversion automatically."
          >
            <input
              type="text"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>
          {form.image && (
            <img
              src={normalizeImageUrl(form.image)}
              alt="Preview"
              className="w-full h-44 object-cover rounded-xl border border-gold/10"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}

          {/* ── Visibility & Status ── */}
          <SectionHeading>Visibility & Status</SectionHeading>

          <Toggle
            enabled={form.draft}
            onChange={() => update('draft', !form.draft)}
            label="Save as Draft"
            sublabel="Draft events are hidden from the public website. Turn this off when you're ready to go live."
          />

          {event && (
            <Toggle
              enabled={form.cancelled}
              onChange={() => update('cancelled', !form.cancelled)}
              label="Mark as Cancelled"
              sublabel="Cancelled events are removed from the public listing. Attendees are not notified automatically."
              danger
            />
          )}

          {/* spacer so content isn't hidden behind sticky footer */}
          <div className="h-2" />
        </form>

        {/* Sticky footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gold/10 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full border border-gold/20 text-charcoal-light font-medium text-sm hover:bg-cream transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="event-form"
            disabled={saving}
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  )
}
