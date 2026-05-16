import { useState, useEffect, useRef, useCallback } from 'react'
import { CloseIcon, UploadIcon } from '../Icons'
import { EVENT_TYPES } from '../../lib/eventTypes'
import { normalizeImageUrl } from '../../lib/imageUrl'
import { adminUploadImage } from '../../lib/api'

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
  imagePosition: { x: 50, y: 50 },
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

function FocalPointPicker({ src, position, onChange, onError }) {
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100))
    onChange({ x: Math.round(x), y: Math.round(y) })
  }, [onChange])

  const onPointerDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true
    updatePosition(e)
  }, [updatePosition])

  const onPointerMove = useCallback((e) => {
    if (!dragging.current) return
    e.preventDefault()
    updatePosition(e)
  }, [updatePosition])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('touchmove', onPointerMove, { passive: false })
    return () => el.removeEventListener('touchmove', onPointerMove)
  }, [onPointerMove])

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative w-full h-44 rounded-xl border border-gold/10 overflow-hidden cursor-crosshair select-none"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <img
          src={src}
          alt="Preview"
          className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: `${position.x}% ${position.y}%` }}
          draggable={false}
          onError={onError}
        />
        <div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-white shadow-lg" />
          <div className="absolute inset-[5px] rounded-full bg-gold" />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, transparent calc(${position.x}% - 0.5px), rgba(255,255,255,0.4) calc(${position.x}% - 0.5px), rgba(255,255,255,0.4) calc(${position.x}% + 0.5px), transparent calc(${position.x}% + 0.5px)),
              linear-gradient(to bottom, transparent calc(${position.y}% - 0.5px), rgba(255,255,255,0.4) calc(${position.y}% - 0.5px), rgba(255,255,255,0.4) calc(${position.y}% + 0.5px), transparent calc(${position.y}% + 0.5px))
            `
          }}
        />
      </div>
      <p className="text-xs text-charcoal-light/60 text-center">
        Drag to set the focal point — this is what stays visible when the image is cropped
      </p>
    </div>
  )
}

export default function EventForm({ event, token, onSave, onCancel, saving }) {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    setErrors({})
    setImageError(false)
    setUploadError(null)
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
        imagePosition: event.imagePosition ?? { x: 50, y: 50 },
        draft: event.draft ?? false,
        cancelled: event.cancelled ?? false,
      })
    } else {
      setForm(defaultForm)
    }
  }, [event])

  const [errors, setErrors] = useState({})
  const [imageError, setImageError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file (JPEG, PNG, WebP, or GIF)')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Image must be under 4 MB')
      return
    }
    setUploading(true)
    setUploadError(null)
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const { url } = await adminUploadImage(token, { dataUrl, contentType: file.type })
      update('image', url)
      setImageError(false)
    } catch (err) {
      setUploadError(err.message || 'Upload failed — please try again')
    } finally {
      setUploading(false)
    }
  }, [token])

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
    if (field === 'image') setImageError(false)
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
      imagePosition: form.imagePosition,
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
            hint="Paste a Google Drive share link, Dropbox link, or any direct image URL. Make sure Google Drive files are shared as 'Anyone with the link'."
          >
            <input
              type="text"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="https://..."
              className={`${inputClass} ${imageError ? inputErr : inputOk}`}
            />
          </Field>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gold/10" />
            <span className="text-xs text-charcoal-light/50">or upload from your computer</span>
            <div className="flex-1 h-px bg-gold/10" />
          </div>

          <div
            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-colors ${
              dragActive
                ? 'border-gold/60 bg-gold/5'
                : 'border-gold/20 hover:border-gold/40 hover:bg-cream/30'
            } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragActive(false)
              handleFile(e.dataTransfer.files[0])
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <UploadIcon className={`w-7 h-7 ${dragActive ? 'text-gold' : 'text-charcoal-light/40'}`} />
            {uploading ? (
              <p className="text-sm text-charcoal-light">Uploading…</p>
            ) : (
              <>
                <p className="text-sm text-charcoal-light">
                  Drop an image here, or <span className="text-gold font-medium">browse</span>
                </p>
                <p className="text-xs text-charcoal-light/50">JPEG, PNG, WebP, GIF — max 4 MB</p>
              </>
            )}
          </div>
          {uploadError && (
            <p className="text-xs text-rose-500">{uploadError}</p>
          )}
          {form.image && !imageError && (
            <FocalPointPicker
              src={normalizeImageUrl(form.image)}
              position={form.imagePosition}
              onChange={(pos) => update('imagePosition', pos)}
              onError={() => setImageError(true)}
            />
          )}
          {form.image && imageError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-sm text-rose-600 space-y-1">
              <p className="font-medium">Image couldn't be loaded</p>
              <ul className="text-xs text-rose-500 list-disc list-inside space-y-0.5">
                <li>For Google Drive: open sharing settings and set to "Anyone with the link can view"</li>
                <li>For other URLs: make sure it's a direct link to an image file (.jpg, .png, .webp)</li>
                <li>Some sites block images from being embedded — try uploading to Google Drive instead</li>
              </ul>
            </div>
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
