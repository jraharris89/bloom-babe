import Hero from '../components/Hero'
import About from '../components/About'
import EventGrid from '../components/EventGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <EventGrid limit={3} />
    </>
  )
}
