import { useState, useEffect } from 'react'
import { PlusIcon, TrashIcon, CloseIcon } from '../Icons'
import { adminFetchPromoCodes, adminCreatePromoCode, adminDeletePromoCode, adminUpdatePromoCode } from '../../lib/api'

function PromoForm({ onSave, onCancel, saving, events }) {
  const [form, setForm] = useState({
    code: '',
    discountType: 'percent',
    discountValue: '',
    maxUses: '',
    eventId: '',
  })

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      code: form.code.trim().toUpperCase(),
      discountType: form.discountType,
      discountValue: parseFloat(form.discountValue),
      maxUses: form.maxUses ? parseInt(form.maxUses, 10) : null,
      eventId: form.eventId || null,
    })
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gold/15 bg-cream/30 text-charcoal text-sm placeholder:text-charcoal-light/40 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20'

  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gold/10 w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10">
          <h2 className="font-serif text-xl text-charcoal">New Promo Code</h2>
          <button type="button" onClick={onCancel} className="p-1.5 rounded-full hover:bg-cream transition-colors">
            <CloseIcon className="w-5 h-5 text-charcoal-light" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1.5 font-sans font-medium">
              Code
            </label>
            <input
              type="text"
              value={form.code}
              onChange={e => update('code', e.target.value.toUpperCase())}
              placeholder="e.g., BLOOM20"
              className={`${inputClass} uppercase`}
              maxLength={64}
              required
            />
            <p className="text-xs text-charcoal-light/50 mt-1">What your customers will type at checkout</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1.5 font-sans font-medium">
                Discount Type
              </label>
              <select
                value={form.discountType}
                onChange={e => update('discountType', e.target.value)}
                className={inputClass}
              >
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Dollar Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1.5 font-sans font-medium">
                {form.discountType === 'percent' ? 'Percent Off' : 'Dollars Off'}
              </label>
              <input
                type="number"
                min="0"
                max={form.discountType === 'percent' ? 100 : undefined}
                step="1"
                value={form.discountValue}
                onChange={e => update('discountValue', e.target.value)}
                placeholder={form.discountType === 'percent' ? '20' : '10'}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1.5 font-sans font-medium">
              Max Uses <span className="normal-case tracking-normal opacity-60">(optional)</span>
            </label>
            <input
              type="number"
              min="1"
              value={form.maxUses}
              onChange={e => update('maxUses', e.target.value)}
              placeholder="Unlimited"
              className={inputClass}
            />
            <p className="text-xs text-charcoal-light/50 mt-1">Leave blank for unlimited uses</p>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-charcoal-light mb-1.5 font-sans font-medium">
              Limit to Event <span className="normal-case tracking-normal opacity-60">(optional)</span>
            </label>
            <select
              value={form.eventId}
              onChange={e => update('eventId', e.target.value)}
              className={inputClass}
            >
              <option value="">All events</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>
            <p className="text-xs text-charcoal-light/50 mt-1">Leave as "All events" to work everywhere</p>
          </div>
        </form>

        <div className="flex gap-3 px-6 py-4 border-t border-gold/10">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full border border-gold/20 text-charcoal-light font-medium text-sm hover:bg-cream transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !form.code.trim() || !form.discountValue}
            className="flex-1 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light disabled:opacity-50 transition-colors"
          >
            {saving ? 'Creating...' : 'Create Code'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PromoCodeManager({ token, events }) {
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const loadCodes = () => {
    setLoading(true)
    adminFetchPromoCodes(token)
      .then(setCodes)
      .catch(() => setCodes([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadCodes() }, [token])

  const handleCreate = async (data) => {
    setSaving(true)
    try {
      await adminCreatePromoCode(token, data)
      setShowForm(false)
      loadCodes()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (promo) => {
    try {
      await adminUpdatePromoCode(token, { code: promo.code, active: !promo.active })
      loadCodes()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDelete = async (code) => {
    if (!confirm(`Delete promo code "${code}"?`)) return
    try {
      await adminDeletePromoCode(token, code)
      loadCodes()
    } catch (err) {
      alert(err.message)
    }
  }

  const eventName = (id) => {
    if (!id) return 'All events'
    const ev = events.find(e => e.id === id)
    return ev ? ev.name : 'Unknown event'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-charcoal">Promo Codes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Code
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="h-16 bg-white rounded-xl border border-gold/10 animate-pulse" />
          ))}
        </div>
      ) : codes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gold/10">
          <p className="text-charcoal-light text-sm mb-1">No promo codes yet</p>
          <p className="text-charcoal-light/60 text-xs">Create one to offer discounts to your customers.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {codes.map(promo => {
            const exhausted = promo.maxUses && promo.timesUsed >= promo.maxUses
            return (
              <div
                key={promo.code}
                className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${
                  !promo.active || exhausted ? 'border-gold/10 opacity-50' : 'border-gold/10'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono font-semibold text-charcoal text-sm tracking-wide">{promo.code}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold-dark font-medium">
                      {promo.discountType === 'percent' ? `${promo.discountValue}% off` : `$${promo.discountValue} off`}
                    </span>
                    {!promo.active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-charcoal/10 text-charcoal-light">Disabled</span>
                    )}
                    {exhausted && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose/10 text-rose-700">Exhausted</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-light">
                    <span>{eventName(promo.eventId)}</span>
                    <span>{promo.timesUsed || 0}{promo.maxUses ? `/${promo.maxUses}` : ''} used</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleToggle(promo)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      promo.active
                        ? 'bg-cream text-charcoal-light hover:bg-cream-dark'
                        : 'bg-charcoal text-cream hover:bg-charcoal-light'
                    }`}
                  >
                    {promo.active ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleDelete(promo.code)}
                    className="p-2 rounded-lg hover:bg-rose/10 text-charcoal-light hover:text-rose-800 transition-colors"
                    title="Delete promo code"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showForm && (
        <PromoForm
          onSave={handleCreate}
          onCancel={() => setShowForm(false)}
          saving={saving}
          events={events}
        />
      )}
    </div>
  )
}
