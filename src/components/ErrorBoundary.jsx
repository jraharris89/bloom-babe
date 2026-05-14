import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack)
  }

  handleReload = () => {
    window.location.assign('/')
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          <p className="text-gold text-xs tracking-[0.15em] uppercase mb-3 font-sans font-medium">
            Well, that's unexpected
          </p>
          <h1 className="font-serif text-3xl text-charcoal mb-3">
            Something went sideways on our end.
          </h1>
          <p className="text-charcoal-light text-sm mb-8 leading-relaxed">
            Give the page a refresh, or head back to the homepage and try again.
            If it keeps happening, email us at{' '}
            <a
              href="mailto:Idahobloombabe@gmail.com"
              className="text-gold-dark hover:underline"
            >
              Idahobloombabe@gmail.com
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-charcoal text-cream font-medium text-sm hover:bg-charcoal-light transition-colors"
            >
              Refresh the page
            </button>
            <button
              onClick={this.handleReload}
              className="px-6 py-2.5 rounded-full border border-gold/30 text-charcoal font-medium text-sm hover:bg-cream-dark transition-colors"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    )
  }
}
