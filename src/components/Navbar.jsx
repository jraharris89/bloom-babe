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
          <span className="font-serif text-lg tracking-wide text-charcoal transition-colors duration-300">
            Bloom Babe
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('about')} className="text-charcoal-light hover:text-gold transition-colors text-sm font-sans tracking-wide">
                About
              </button>
              <button onClick={() => scrollToSection('events')} className="text-charcoal-light hover:text-gold transition-colors text-sm font-sans tracking-wide">
                Events
              </button>
            </>
          ) : (
            <>
              <Link to="/#about" className="text-charcoal-light hover:text-gold transition-colors text-sm font-sans tracking-wide">
                About
              </Link>
              <Link to="/#events" className="text-charcoal-light hover:text-gold transition-colors text-sm font-sans tracking-wide">
                Events
              </Link>
            </>
          )}
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium bg-charcoal text-cream hover:bg-charcoal-light transition-all duration-300"
          >
            <FlowerIcon className="w-4 h-4" />
            Book a Workshop
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-charcoal transition-colors"
        >
          {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu — grid-rows animation avoids layout thrash */}
      <div
        className="md:hidden grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className={`bg-cream/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3 border-t border-gold/10 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
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
      </div>
    </nav>
  )
}
