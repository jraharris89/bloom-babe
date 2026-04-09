import { FloralDivider, LeafIcon, FlowerIcon, SparkleIcon } from './Icons'

const values = [
  {
    icon: FlowerIcon,
    title: 'Create',
    description: 'Get your hands a little dirty and walk away with something you made yourself.',
  },
  {
    icon: SparkleIcon,
    title: 'Connect',
    description: 'Laugh with strangers who become friends in a warm, welcoming space.',
  },
  {
    icon: LeafIcon,
    title: 'Recharge',
    description: 'Step away from the everyday and feel a little more like yourself when you leave.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-sans font-medium">
            Welcome
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">
            What is Bloom Babe?
          </h2>
          <FloralDivider className="w-48 mx-auto text-gold mb-8" />
          <p className="text-charcoal-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Bloom Babe is your invitation to slow down, get creative, and share an experience
            with people who love beautiful things. From floral arrangements to terrariums to
            paint nights — we host workshops that feel less like a class and more like a
            get-together with your favorite people.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-8 rounded-2xl bg-white/60 border border-gold/10 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage/15 text-sage-dark mb-5 group-hover:bg-gold/15 group-hover:text-gold transition-colors duration-300">
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-3">{value.title}</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="relative bg-charcoal rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(201,169,110,0.3) 0%, transparent 50%),
                             radial-gradient(circle at 70% 50%, rgba(168,181,160,0.2) 0%, transparent 40%)`
          }} />
          <div className="relative z-10">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium">
              Our Mission
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-cream mb-6 leading-relaxed">
              At Bloom Babe, our mission is to create spaces where people can
              <span className="italic text-gold"> connect, create, and recharge</span>.
            </h3>
            <p className="text-cream/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We believe in the power of shared experiences — getting your hands a little dirty,
              laughing with strangers who become friends, and walking away with something you made
              yourself. Whether you come solo or with your crew, our goal is simple: for you to
              feel inspired, welcomed, and just a little more like yourself when you leave.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
