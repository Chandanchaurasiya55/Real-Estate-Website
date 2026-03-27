import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section className="bg-white border-t border-cyan-400/30 py-12">
      <div className="mx-auto w-[95%] max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">Ready to Get Started?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-black/90">Book your free property valuation or register for new property alerts — it only takes a minute.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300" style={{ textDecoration: 'none' }}>
            📅 Book Free Valuation
          </Link>
          <Link to="/contact" className="inline-flex items-center rounded-lg border border-cyan-300 px-6 py-3 text-black shadow-lg shadow-cyan-900/40 transition hover:border-cyan-100 hover:bg-cyan-500/30" style={{ textDecoration: 'none' }}>
            🔔 Register for Alerts
          </Link>
        </div>
      </div>
    </section>
  )
}
