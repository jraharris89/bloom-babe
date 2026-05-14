import { ChevronDownIcon } from "./Icons";
import { HeroBotanicals } from "./BotanicalBackgrounds";

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-cream overflow-hidden">
      {/* Warm botanical background wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 60%, rgba(201,169,110,0.12) 0%, transparent 50%),
                           radial-gradient(circle at 85% 30%, rgba(168,181,160,0.10) 0%, transparent 45%),
                           radial-gradient(circle at 50% 90%, rgba(242,224,208,0.25) 0%, transparent 50%)`,
        }}
      />

      {/* Botanical background layers */}
      <HeroBotanicals />

      {/* Content — asymmetric two-column layout on desktop, stacked on mobile */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text — left-aligned */}
          <div>
            <p className="text-gold text-xs md:text-sm tracking-[0.12em] uppercase mb-4 font-sans font-medium">
              Floral & Events
            </p>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal mb-6 leading-tight">
              Where Creativity
              <span className="block italic text-gold-dark">Blooms</span>
            </h1>

            <p className="text-charcoal-light text-base md:text-lg max-w-lg mb-10 leading-relaxed">
              Hands-on workshops where you connect, create, and walk away with
              something beautiful you made yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#events"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-charcoal text-cream font-medium text-sm tracking-wide hover:bg-charcoal-light transition-all duration-300"
              >
                Events
              </a>
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-charcoal/20 text-charcoal font-medium text-sm tracking-wide hover:bg-charcoal/5 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Image — right side */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/bloom-babe-logo-large.jpeg"
              alt="Bloom Babe Floral & Events"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl ring-2 ring-gold/15"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-charcoal/30 hover:text-charcoal/50 transition-colors duration-300 ease-out"
      >
        <ChevronDownIcon className="w-6 h-6" />
      </button>
    </section>
  );
}
