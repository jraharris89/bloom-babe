export function getTicketStatus(totalTickets, soldTickets) {
  const remaining = totalTickets - soldTickets
  if (remaining <= 0) return 'sold-out'
  if (remaining <= 3) return 'almost-sold-out'
  if (remaining / totalTickets <= 0.3) return 'selling-quick'
  return 'available'
}

const statusConfig = {
  'available': {
    label: 'Available',
    className: 'bg-sage/15 text-sage-dark border-sage/30',
    dot: 'bg-sage',
  },
  'selling-quick': {
    label: 'Selling Quick',
    className: 'bg-gold/15 text-gold-dark border-gold/30',
    dot: 'bg-gold',
  },
  'almost-sold-out': {
    label: 'Almost Sold Out',
    className: 'bg-rose/20 text-rose-800 border-rose/40',
    dot: 'bg-rose animate-pulse',
  },
  'sold-out': {
    label: 'Sold Out',
    className: 'bg-charcoal/10 text-charcoal-light border-charcoal/20',
    dot: 'bg-charcoal-light',
  },
}

export default function StatusBadge({ totalTickets, soldTickets }) {
  const status = getTicketStatus(totalTickets, soldTickets)
  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}
