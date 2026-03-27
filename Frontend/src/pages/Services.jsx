import ServicesSection from '../components/ServicesSection'

function Services() {
  return (
    <main className="pt-24 bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">Our Expertise</p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Premium Services for Every Property Need</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300">Comprehensive real estate solutions built for buyers, sellers, and landlords. One place, a full suite of expert support.</p>
        </div>
      </section>

      <ServicesSection />
    </main>
  )
}

export default Services;
