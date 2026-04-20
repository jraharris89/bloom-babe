import { FloralDivider } from './Icons'
import { AboutBotanicals } from './BotanicalBackgrounds'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-40 bg-cream overflow-hidden">
      {/* Botanical background layers */}
      <AboutBotanicals />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Two-column editorial layout — text left, pull quote right */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start mb-20">
          <div className="md:col-span-3">
            <p className="text-gold text-xs tracking-[0.12em] uppercase mb-3 font-sans font-medium">
              About
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-6">
              What is Bloom Babe?
            </h2>
            <p className="text-charcoal-light text-base md:text-lg leading-relaxed mb-6 max-w-prose">
              Bloom Babe is your invitation to slow down, get creative, and share an experience
              with people who love beautiful things. From floral arrangements to terrariums to
              paint nights — we host workshops that feel less like a class and more like a
              get-together with your favorite people.
            </p>
            <p className="text-charcoal-light text-base md:text-lg leading-relaxed max-w-prose">
              Whether you come solo or with your crew, our goal is simple: for you to
              feel inspired, welcomed, and just a little more like yourself when you leave.
            </p>
          </div>

          {/* Pull quote — right column */}
          <div className="md:col-span-2 md:pt-16">
            <FloralDivider className="w-24 text-gold/60 mb-6" />
            <blockquote className="font-serif text-2xl md:text-3xl text-charcoal leading-snug">
              Get your hands a little dirty. Laugh with strangers who become friends.
              <span className="block italic text-gold-dark mt-2">Walk away recharged.</span>
            </blockquote>
          </div>
        </div>

        {/* Values — three-stage botanical journey: Create → Connect → Recharge */}
        <div className="relative grid md:grid-cols-3 gap-px bg-gold/10 rounded-xl overflow-hidden">
          <div className="bg-cream p-8 md:p-10">
            <span className="font-serif text-lg text-charcoal">Create</span>
            <p className="text-charcoal-light text-sm leading-relaxed mt-2">
              Get your hands a little dirty and walk away with something you made yourself.
            </p>
          </div>
          <div className="bg-cream p-8 md:p-10">
            <span className="font-serif text-lg text-charcoal">Connect</span>
            <p className="text-charcoal-light text-sm leading-relaxed mt-2">
              Laugh with strangers who become friends in a warm, welcoming space.
            </p>
          </div>
          <div className="bg-cream p-8 md:p-10">
            <span className="font-serif text-lg text-charcoal">Recharge</span>
            <p className="text-charcoal-light text-sm leading-relaxed mt-2">
              Step away from the everyday and feel a little more like yourself when you leave.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
