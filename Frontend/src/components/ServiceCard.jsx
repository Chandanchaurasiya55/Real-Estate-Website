export default function ServiceCard({ service }) {
  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 shadow-xl shadow-slate-900/50 transition duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:bg-slate-800">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-2xl">{service.icon}</div>
      <h3 className="text-xl font-bold text-white">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.description}</p>
      <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        Learn More
      </button>
    </article>
  )
}
