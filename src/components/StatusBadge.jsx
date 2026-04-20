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
    textClass: 'text-sage-dark',
    dot: 'bg-sage',
  },
  'selling-quick': {
    label: 'Selling Quick',
    textClass: 'text-gold-dark',
    dot: 'bg-gold',
  },
  'almost-sold-out': {
    label: 'Almost Sold Out',
    textClass: 'text-rose',
    dot: 'bg-rose animate-pulse',
  },
  'sold-out': {
    label: 'Sold Out',
    textClass: 'text-charcoal-light',
    dot: 'bg-charcoal-light',
  },
}

export default function StatusBadge({ totalTickets, soldTickets }) {
  const status = getTicketStatus(totalTickets, soldTickets)
  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm shadow-sm ${config.textClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  )
}
