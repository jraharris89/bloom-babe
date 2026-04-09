import { FloralCorner, ChevronDownIcon } from './Icons'

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-charcoal overflow-hidden">
      {/* Background botanical pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(168,181,160,0.1) 0%, transparent 40%),
                           radial-gradient(circle at 60% 80%, rgba(201,169,110,0.1) 0%, transparent 45%)`
        }} />
      </div>

      {/* Floral corner decorations */}
      <FloralCorner className="absolute top-0 left-0 w-24 md:w-32 text-gold" />
      <FloralCorner className="absolute top-0 right-0 w-24 md:w-32 text-gold -scale-x-100" />
      <FloralCorner className="absolute bottom-0 left-0 w-24 md:w-32 text-gold -scale-y-100" />
      <FloralCorner className="absolute bottom-0 right-0 w-24 md:w-32 text-gold -scale-x-100 -scale-y-100" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img
            src="/bloom-babe-logo-large.jpeg"
            alt="Bloom Babe Floral & Events"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl ring-2 ring-gold/20"
          />
        </div>

        <p className="text-cream/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-sans">
          Floral & Events
        </p>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream mb-6 leading-tight">
          Where Creativity
          <span className="block italic text-gold">Blooms</span>
        </h1>

        <p className="text-cream/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Hands-on workshops where you connect, create, and walk away with something beautiful you made yourself.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#events"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold text-charcoal font-medium text-sm tracking-wide hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:-translate-y-0.5"
          >
            Explore Workshops
          </a>
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-cream/20 text-cream/80 font-medium text-sm tracking-wide hover:bg-cream/10 hover:border-cream/30 transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 hover:text-cream/60 transition-colors animate-bounce"
      >
        <ChevronDownIcon className="w-6 h-6" />
      </button>
    </section>
  )
}
