import { Link } from 'react-router-dom'

export default function WhyChooseUs() {
  const stats = [
    { number: '40+', label: 'Years Experience' },
    { number: '2,500+', label: 'Homes Sold' },
    { number: '98%', label: 'Happy Clients' },
    { number: '3', label: 'Local Offices' }
  ]

  return (
    <section className="bg-slate-900 border-t border-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/40">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop" alt="Our Team" />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">Why NestFind</p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Your Trusted Local Property Experts</h2>
          <p className="mt-4 text-slate-300">With over 40 years of experience serving the community, we understand the local market better than anyone. Our friendly team is dedicated to making your property journey smooth, stress-free, and successful.</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
                <h3 className="text-2xl font-bold text-white">{stat.number}</h3>
                <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>

          <Link to="/contact" className="mt-8 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400" style={{ textDecoration: 'none' }}>
            Meet Our Team →
          </Link>
        </div>
      </div>
    </section>
  )
}
