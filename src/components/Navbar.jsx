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

  const scrollToEvents = (e) => {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById('events')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAbout = (e) => {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById('about')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinkClass = 'text-charcoal-light hover:text-gold transition-colors text-sm font-sans tracking-wide'
  const activeLinkClass = (path) =>
    location.pathname === path ? 'text-gold' : navLinkClass

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
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
        <div className="hidden md:flex items-center gap-7">
          <Link
            to={isHome ? '#about' : '/#about'}
            onClick={scrollToAbout}
            className={navLinkClass}
          >
            About
          </Link>
          <Link to="/calendar" className={activeLinkClass('/calendar')}>
            Calendar
          </Link>
          <Link to="/faq" className={activeLinkClass('/faq')}>
            FAQ
          </Link>
          {/* Primary CTA — scrolls to #events on home, goes to /#events otherwise */}
          <Link
            to={isHome ? '#events' : '/#events'}
            onClick={scrollToEvents}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium bg-charcoal text-cream hover:bg-charcoal-light transition-all duration-300"
          >
            <FlowerIcon className="w-4 h-4" />
            Events
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-charcoal transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className={`bg-cream/97 backdrop-blur-md px-6 py-4 flex flex-col gap-1 border-t border-gold/10 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Link
              to={isHome ? '#about' : '/#about'}
              onClick={(e) => { scrollToAbout(e); setIsOpen(false) }}
              className="py-2.5 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide border-b border-gold/5"
            >
              About
            </Link>
            <Link
              to="/calendar"
              className="py-2.5 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide border-b border-gold/5"
            >
              Calendar
            </Link>
            <Link
              to="/faq"
              className="py-2.5 text-charcoal-light hover:text-gold transition-colors font-sans text-sm tracking-wide border-b border-gold/5"
            >
              FAQ
            </Link>
            <div className="pt-3">
              <Link
                to={isHome ? '#events' : '/#events'}
                onClick={(e) => { scrollToEvents(e); setIsOpen(false) }}
                className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-sm font-medium bg-charcoal text-cream hover:bg-charcoal-light transition-colors w-full"
              >
                <FlowerIcon className="w-4 h-4" />
                Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
