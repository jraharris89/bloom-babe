import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuIcon, CloseIcon, FlowerIcon } from './Icons'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  const scrollToSection = (id) => {
    if (!isHome) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/bloom-babe-logo-large.jpeg"
            alt="Bloom Babe"
            className="h-10 w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className={`font-serif text-lg tracking-wide transition-colors duration-300 ${
            scrolled ? 'text-charcoal' : 'text-cream'
          }`}>
            Bloom Babe
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('about')} className={`nav-link ${scrolled ? 'text-charcoal-light hover:text-gold' : 'text-cream/80 hover:text-cream'}`}>
                About
              </button>
              <button onClick={() => scrollToSection('events')} className={`nav-link ${scrolled ? 'text-charcoal-light hover:text-gold' : 'text-cream/80 hover:text-cream'}`}>
                Events
              </button>
            </>
          ) : (
            <>
              <Link to="/#about" className={`nav-link ${scrolled ? 'text-charcoal-light hover:text-gold' : 'text-cream/80 hover:text-cream'}`}>
                About
              </Link>
              <Link to="/#events" className={`nav-link ${scrolled ? 'text-charcoal-light hover:text-gold' : 'text-cream/80 hover:text-cream'}`}>
                Events
              </Link>
            </>
          )}
          <Link
            to="/events"
            className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              scrolled
                ? 'bg-charcoal text-cream hover:bg-charcoal-light'
                : 'bg-cream/15 text-cream border border-cream/30 hover:bg-cream/25'
            }`}
          >
            <FlowerIcon className="w-4 h-4" />
            Book a Workshop
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-charcoal' : 'text-cream'}`}
        >
          {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-cream/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3 border-t border-gold/10">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('about')} className="text-left py-2 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide">About</button>
              <button onClick={() => scrollToSection('events')} className="text-left py-2 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide">Events</button>
            </>
          ) : (
            <>
              <Link to="/#about" className="py-2 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide">About</Link>
              <Link to="/#events" className="py-2 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide">Events</Link>
            </>
          )}
          <Link to="/events" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium bg-charcoal text-cream hover:bg-charcoal-light transition-colors">
            <FlowerIcon className="w-4 h-4" />
            Book a Workshop
          </Link>
        </div>
      </div>
    </nav>
  )
}
