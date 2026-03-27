import PropertySection from '../components/PropertySection'

function Properties() {
  return (
    <>
      <header className="bg-linear-to-br from-slate-900 to-slate-800 text-white">
        <div className="mx-auto flex flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-cyan-300">All Properties</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Find The Right Home Faster</h1>
            <p className="mt-4 text-lg text-slate-200">Browse curated listings with clean pricing, verified details, and the neighborhoods you actually want.</p>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-800/70 p-4">
                <h3 className="text-3xl font-bold">180+</h3>
                <p>Verified Listings</p>
              </div>
              <div className="rounded-xl bg-slate-800/70 p-4">
                <h3 className="text-3xl font-bold">24h</h3>
                <p>Avg. Response Time</p>
              </div>
              <div className="rounded-xl bg-slate-800/70 p-4">
                <h3 className="text-3xl font-bold">4.8/5</h3>
                <p>Client Rating</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-cyan-500/40 bg-slate-900/90 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white">Quick Filter</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {['London', 'Family Homes', 'Under GBP 900k', 'Ready To Move'].map((tag) => (
                <span key={tag} className="rounded-lg bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-100">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </header>
      <PropertySection compact />
    </>
  )
}

export default Properties
