import { Link } from 'react-router-dom'
import { InstagramIcon, FacebookIcon, EmailIcon, FlowerIcon, FloralDivider } from './Icons'
import { FooterBotanicals } from './BotanicalBackgrounds'

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream overflow-hidden">
      {/* Botanical background layers */}
      <FooterBotanicals />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <img
            src="/bloom-babe-logo-large.jpeg"
            alt="Bloom Babe"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-1 ring-gold/20"
          />
          <h3 className="font-serif text-2xl mb-2">Bloom Babe</h3>
          <p className="text-cream/50 text-sm">Floral & Events</p>
        </div>

        <FloralDivider className="w-48 mx-auto text-gold/50 mb-12" />

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Quick links */}
          <div className="text-center md:text-left">
            <h4 className="text-xs tracking-widest uppercase text-gold mb-4 font-sans font-medium">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-cream/60 hover:text-cream text-sm transition-colors">Home</Link>
              <Link to="/calendar" className="text-cream/60 hover:text-cream text-sm transition-colors">Calendar</Link>
              <a href="/#about" className="text-cream/60 hover:text-cream text-sm transition-colors">About Us</a>
              <Link to="/faq" className="text-cream/60 hover:text-cream text-sm transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Connect */}
          <div className="text-center">
            <h4 className="text-xs tracking-widest uppercase text-gold mb-4 font-sans font-medium">Follow Along</h4>
            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/bloom.babe.events" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/30 transition-all hover:-translate-y-0.5">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/people/Bloom-Babe/61574419684661/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/30 transition-all hover:-translate-y-0.5">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="mailto:Idahobloombabe@gmail.com" className="p-2.5 rounded-full border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/30 transition-all hover:-translate-y-0.5">
                <EmailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-xs tracking-widest uppercase text-gold mb-4 font-sans font-medium">Get in Touch</h4>
            <p className="text-cream/60 text-sm mb-1">Questions about events?</p>
            <a href="mailto:Idahobloombabe@gmail.com" className="text-gold hover:text-gold-light text-sm transition-colors">
              Idahobloombabe@gmail.com
            </a>
            <div className="mt-6 border-t border-cream/10 pt-6">
              <p className="text-cream/50 text-xs leading-relaxed">
                Are you a venue interested in hosting a Bloom Babe event?{' '}
                <a href="mailto:Idahobloombabe@gmail.com" className="text-gold hover:text-gold-light transition-colors underline underline-offset-2">
                  Let's connect
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-cream/40 text-xs">
            <Link to="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
          </div>
          <p className="text-cream/30 text-xs">
            &copy; {new Date().getFullYear()} Bloom Babe Floral & Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
