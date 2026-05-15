import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventsPage from './pages/EventsPage'
import EventDetail from './pages/EventDetail'
import CalendarPage from './pages/CalendarPage'
import FAQPage from './pages/FAQPage'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'
import Design1 from './pages/Design1'
import Design2 from './pages/Design2'
import Design3 from './pages/Design3'
import ConceptPitch from './pages/ConceptPitch'

function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-gold text-xs tracking-[0.15em] uppercase mb-3 font-sans font-medium">
          Lost in the garden
        </p>
        <h1 className="font-serif text-4xl text-charcoal mb-3">Page not found</h1>
        <p className="text-charcoal-light text-sm mb-8 leading-relaxed">
          That link doesn't lead anywhere. Try one of these instead.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light transition-colors"
          >
            Back to home
          </Link>
          <Link
            to="/events"
            className="px-6 py-2.5 rounded-full border border-gold/30 text-charcoal font-medium text-sm hover:bg-cream-dark transition-colors"
          >
            See upcoming events
          </Link>
        </div>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [pathname, hash])

  useLayoutEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/design1" element={<Design1 />} />
          <Route path="/design2" element={<Design2 />} />
          <Route path="/design3" element={<Design3 />} />
          <Route path="/concept-pitch" element={<ConceptPitch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}
