import { Link } from 'react-router-dom'
import { CheckIcon, FlowerIcon, EmailIcon } from '../components/Icons'

export default function CheckoutSuccess() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/15 text-sage-dark mb-6">
          <CheckIcon className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-3xl text-charcoal mb-3">You're In!</h1>
        <p className="text-charcoal-light mb-8 leading-relaxed">
          Your tickets have been confirmed. We can't wait to see you there!
        </p>

        <div className="bg-white rounded-2xl border border-gold/10 p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-gold/10">
              <EmailIcon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-medium text-charcoal text-sm">Check Your Email</h3>
              <p className="text-charcoal-light text-xs">A confirmation with all the details has been sent to your inbox.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-sage/10">
              <FlowerIcon className="w-5 h-5 text-sage-dark" />
            </div>
            <div>
              <h3 className="font-medium text-charcoal text-sm">What to Bring</h3>
              <p className="text-charcoal-light text-xs">Just yourself and your creativity — we'll have everything else ready for you.</p>
            </div>
          </div>
        </div>

        <Link
          to="/events"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gold text-charcoal font-medium text-sm tracking-wide hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
        >
          Browse More Workshops
        </Link>
      </div>
    </div>
  )
}
