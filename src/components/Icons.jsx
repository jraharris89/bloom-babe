export function FloralDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 200 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="70" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="130" y1="15" x2="200" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <g transform="translate(100, 15)" stroke="currentColor" strokeWidth="0.8" opacity="0.6">
        <path d="M0,-12 C4,-8 6,-3 0,0 C-6,-3 -4,-8 0,-12Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M0,-12 C-4,-8 -6,-3 0,0 C6,-3 4,-8 0,-12Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M-8,-6 C-4,-6 -1,-3 0,0 C-3,-1 -8,-2 -8,-6Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M8,-6 C4,-6 1,-3 0,0 C3,-1 8,-2 8,-6Z" fill="currentColor" fillOpacity="0.1" />
        <circle cx="0" cy="-2" r="1.5" fill="currentColor" fillOpacity="0.3" />
        <path d="M0,0 C0,4 -1,8 -2,12" strokeWidth="0.6" />
        <path d="M-2,6 C-4,5 -6,6 -7,8" strokeWidth="0.5" />
        <path d="M-1,9 C1,8 3,9 4,11" strokeWidth="0.5" />
      </g>
    </svg>
  )
}

export function LeafIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3C12 3 4 7 4 17" strokeLinecap="round" />
      <path d="M17 3C17 3 13 8 8 13" strokeLinecap="round" />
      <path d="M7 15C9 13 12 10 17 3" strokeLinecap="round" />
      <path d="M5 17C5 17 6 14 8 12" strokeLinecap="round" opacity="0.5" />
      <path d="M10 10C11 9 12 7 13 5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function FlowerIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="10" r="2" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 4C13.5 6 13.5 8 12 10C10.5 8 10.5 6 12 4Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M7 7C9.5 7 11 8.5 12 10C10 9.5 8 9.5 7 7Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M17 7C14.5 7 13 8.5 12 10C14 9.5 16 9.5 17 7Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M7 13C9.5 13 11 11.5 12 10C10 10.5 8 10.5 7 13Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M17 13C14.5 13 13 11.5 12 10C14 10.5 16 10.5 17 13Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 10V20" strokeWidth="0.8" />
      <path d="M12 15C10 14 8 14.5 7 16" strokeWidth="0.6" />
      <path d="M12 17C14 16 15.5 16.5 16.5 18" strokeWidth="0.6" />
    </svg>
  )
}

export function PaletteIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7 3 3 7.5 3 12C3 16 6 18 8 18C10 18 10 16 12 16C14 16 14 18 16 18C18 18 21 16 21 12C21 7.5 17 3 12 3Z" strokeLinecap="round" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="7.5" r="1.2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="16" cy="10" r="1.2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="13" cy="13" r="1" fill="currentColor" fillOpacity="0.2" />
    </svg>
  )
}

export function ScissorsIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.5 8L20 18" strokeLinecap="round" />
      <path d="M8.5 16L20 6" strokeLinecap="round" />
    </svg>
  )
}

export function TerrariumIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 20C6 20 4 12 7 7L12 3L17 7C20 12 18 20 18 20" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="5" y1="20" x2="19" y2="20" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 20C10 17 11 15 12 14" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M12 14C11 13 10 12.5 9 13" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M12 16C13 15 14.5 15 15 16" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="12" cy="11" r="0.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}

export function PlantGameIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20V12" strokeLinecap="round" />
      <path d="M12 12C12 8 15 5 18 4C17 8 14 10 12 12Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 14C12 10 9 7 6 6C7 10 10 12 12 14Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M8 20H16" strokeLinecap="round" />
      <path d="M9 20L9 18C9 17 10 16 12 16C14 16 15 17 15 18V20" strokeWidth="0.8" />
      <circle cx="17" cy="5" r="1" strokeWidth="0.6" />
      <path d="M16.3 4.3L15 3" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M17.7 4.3L19 3" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M17 4L17 2.5" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  )
}

export function TicketIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7H21V10C19.5 10 18.5 11 18.5 12C18.5 13 19.5 14 21 14V17H3V14C4.5 14 5.5 13 5.5 12C5.5 11 4.5 10 3 10V7Z" strokeLinejoin="round" />
      <line x1="9" y1="7" x2="9" y2="17" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  )
}

export function CalendarIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

export function LocationIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 2 5 5.5 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5.5 16 2 12 2Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

export function EmailIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7L12 13L21 7" strokeLinejoin="round" />
    </svg>
  )
}

export function InstagramIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.3 2 12 3.3 12 5V8H9V12H12V22H16V12H19L20 8H16V5.5C16 5.2 16.2 5 16.5 5H20V2H18Z" />
    </svg>
  )
}

export function TikTokIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12C6.8 12 5 13.8 5 16C5 18.2 6.8 20 9 20C11.2 20 13 18.2 13 16V4C13.8 6 16 8 19 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRightIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
    </svg>
  )
}

export function MenuIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20M4 12H16M4 17H20" strokeLinecap="round" />
    </svg>
  )
}

export function PlusIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" strokeLinecap="round" />
    </svg>
  )
}

export function MinusIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" strokeLinecap="round" />
    </svg>
  )
}

export function TrashIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EditIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L19 9L9 19H5V15L15 5Z" strokeLinejoin="round" />
      <path d="M13 7L17 11" />
    </svg>
  )
}

export function UsersIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20C3 16 6 14 9 14C12 14 15 16 15 20" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M16 14C18.5 14 21 15.5 21 19" strokeLinecap="round" />
    </svg>
  )
}

export function SparkleIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" opacity="0.6" />
      <path d="M19 14L19.75 16.25L22 17L19.75 17.75L19 20L18.25 17.75L16 17L18.25 16.25L19 14Z" opacity="0.4" />
      <path d="M5 16L5.5 17.5L7 18L5.5 18.5L5 20L4.5 18.5L3 18L4.5 17.5L5 16Z" opacity="0.3" />
    </svg>
  )
}

export function CheckIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12L10 17L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LockIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V11" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}

export function ChevronDownIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronLeftIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRightIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FloralCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 40C10 35 20 25 25 0" />
      <path d="M0 50C15 42 28 30 35 0" />
      <path d="M0 60C20 50 35 35 45 0" />
      <path d="M10 40C8 35 10 28 15 25" fill="currentColor" fillOpacity="0.05" />
      <path d="M20 30C18 25 20 18 25 15" fill="currentColor" fillOpacity="0.05" />
      <circle cx="18" cy="30" r="1.5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="28" cy="18" r="1" fill="currentColor" fillOpacity="0.15" />
    </svg>
  )
}
