import { useState } from 'react'
import { PlusIcon, MinusIcon, UsersIcon } from './Icons'
import { createCheckoutSession } from '../lib/api'
import { getTicketStatus } from './StatusBadge'

export default function TicketForm({ event }) {
  const [quantity, setQuantity] = useState(1)
  const [buyer, setBuyer] = useState({ firstName: '', lastName: '', email: '' })
  const [attendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const remaining = event.totalTickets - event.soldTickets
  const maxTickets = Math.min(remaining, 10)
  const status = getTicketStatus(event.totalTickets, event.soldTickets)
  const isSoldOut = status === 'sold-out'

  const handleQuantityChange = (newQty) => {
    const qty = Math.max(1, Math.min(maxTickets, newQty))
    setQuantity(qty)
    // Adjust attendees array (first attendee = buyer)
    const additionalNeeded = qty - 1
    if (additionalNeeded > attendees.length) {
      setAttendees([
        ...attendees,
        ...Array(additionalNeeded - attendees.length).fill(null).map(() => ({ firstName: '', lastName: '', email: '' })),
      ])
    } else {
      setAttendees(attendees.slice(0, additionalNeeded))
    }
  }

  const updateAttendee = (index, field, value) => {
    const updated = [...attendees]
    updated[index] = { ...updated[index], [field]: value }
    setAttendees(updated)
  }

  const isValid = () => {
    if (!buyer.firstName.trim() || !buyer.lastName.trim() || !buyer.email.trim()) return false
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) return false
    for (const att of attendees) {
      if (!att.firstName.trim() || !att.lastName.trim() || !att.email.trim()) return false
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(att.email)) return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid()) {
      setError('Please fill in all fields with valid information.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { url } = await createCheckoutSession({
        eventId: event.id,
        quantity,
        buyer,
        attendees,
      })
      window.location.href = url
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (isSoldOut) {
    return (
      <div className="bg-white rounded-2xl border border-gold/10 p-8 text-center">
        <p className="font-serif text-xl text-charcoal mb-2">Sold Out</p>
        <p className="text-charcoal-light text-sm">This event is fully booked. Check back for future workshops!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gold/10 p-6 md:p-8">
      <h3 className="font-serif text-xl text-charcoal mb-6">Get Your Tickets</h3>

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="block text-xs tracking-[0.15em] uppercase text-charcoal-light mb-2 font-sans font-medium">
          Number of Tickets
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="p-2 rounded-full border border-gold/20 text-charcoal hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="font-serif text-2xl text-charcoal w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxTickets}
            className="p-2 rounded-full border border-gold/20 text-charcoal hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          <span className="text-charcoal-light text-sm ml-2">
            {remaining} ticket{remaining !== 1 ? 's' : ''} left
          </span>
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-cream rounded-xl p-4 mb-6">
        <div className="flex justify-between text-sm text-charcoal-light mb-1">
          <span>${event.price} x {quantity} ticket{quantity !== 1 ? 's' : ''}</span>
          <span>${(event.price * quantity).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-charcoal border-t border-gold/10 pt-2 mt-2">
          <span>Total</span>
          <span className="font-serif text-lg">${(event.price * quantity).toFixed(2)}</span>
        </div>
      </div>

      {/* Buyer info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <UsersIcon className="w-4 h-4 text-gold" />
          <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light font-sans font-medium">
            Your Information (Ticket Holder 1)
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="First Name"
            value={buyer.firstName}
            onChange={(e) => setBuyer({ ...buyer, firstName: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={buyer.lastName}
            onChange={(e) => setBuyer({ ...buyer, lastName: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors"
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          value={buyer.email}
          onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors"
          required
        />
      </div>

      {/* Additional attendees */}
      {attendees.map((att, i) => (
        <div key={i} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <UsersIcon className="w-4 h-4 text-gold" />
            <label className="text-xs tracking-[0.15em] uppercase text-charcoal-light font-sans font-medium">
              Ticket Holder {i + 2}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="First Name"
              value={att.firstName}
              onChange={(e) => updateAttendee(i, 'firstName', e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={att.lastName}
              onChange={(e) => updateAttendee(i, 'lastName', e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={att.email}
            onChange={(e) => updateAttendee(i, 'email', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/50 text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-colors"
            required
          />
        </div>
      ))}

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose/10 border border-rose/20 text-sm text-rose-800">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !isValid()}
        className="w-full py-3.5 rounded-full bg-gold text-charcoal font-medium text-sm tracking-wide hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-gold/30"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
            </svg>
            Processing...
          </span>
        ) : (
          `Purchase — $${(event.price * quantity).toFixed(2)}`
        )}
      </button>

      <p className="text-center text-xs text-charcoal-light/60 mt-3">
        Secure checkout powered by Stripe
      </p>
    </form>
  )
}
