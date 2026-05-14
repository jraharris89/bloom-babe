import FAQ from '../components/FAQ'

export default function FAQPage() {
  return (
    <div className="pt-24 pb-8 min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 mb-6">
        <p className="text-gold text-xs tracking-[0.12em] uppercase mb-2 font-sans font-medium">
          Help
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
          Frequently Asked Questions
        </h1>
      </div>
      <FAQ />
    </div>
  )
}
