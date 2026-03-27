import WhyChooseUs from '../components/WhyChooseUs'
import CtaBanner from '../components/CtaBanner'

export default function About() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-4 pt-24 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">About Us</p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Built on trust, driven by local expertise.</h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">At NestFind, we align our full-service property solutions with your goals — whether you're buying, selling, renting or investing around the city.</p>
        </div>
      </section>
      <WhyChooseUs />
      <CtaBanner />
    </main>
  )
}
