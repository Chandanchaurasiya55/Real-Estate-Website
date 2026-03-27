import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-[86vh] min-h-162.5 overflow-hidden bg-slate-950 text-white">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop"
        alt="Beautiful modern home"
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ transform: `translateY(${scrollY * 0.1 + 30}px)` }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 via-slate-950/70 to-slate-900/70" />
      <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center pl-4 text-left sm:pl-6 lg:pl-8">
        <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl">
          Find Your <span className="text-emerald-300">Dream</span><br />
          Home Today
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-100 sm:text-xl">
          Buying, selling, or renting � we guide you every step of the way with expert advice and personal support.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
          <Link
            to="/properties"
            className="rounded-lg bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-500"
          >
            🔍 Browse Properties
          </Link>
          <Link
            to="/contact"
            className="rounded-lg bg-cyan-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-500"
          >
            💎 Free Valuation
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
