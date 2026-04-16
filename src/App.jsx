import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventsPage from './pages/EventsPage'
import EventDetail from './pages/EventDetail'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Admin from './pages/Admin'
import Design1 from './pages/Design1'
import Design2 from './pages/Design2'
import Design3 from './pages/Design3'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
        return
      }
    }
    window.scrollTo(0, 0)
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
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/design1" element={<Design1 />} />
          <Route path="/design2" element={<Design2 />} />
          <Route path="/design3" element={<Design3 />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}
