import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4">
        <div>
          <Link to="/" className="mb-3 inline-block text-2xl font-bold text-white">Nest<span className="text-amber-300">Find</span></Link>
          <p className="max-w-xs text-sm text-slate-300">Your trusted local estate agents serving Heston, Hounslow and Southall since 1982. We help you buy, sell, let and rent with confidence.</p>
          <div className="mt-4 flex gap-3 text-lg">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20">??</a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20">??</a>
            <a href="#" aria-label="Twitter/X" className="rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20">??</a>
            <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20">??</a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Properties</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/properties" className="hover:text-white">For Sale</Link></li>
            <li><Link to="/properties" className="hover:text-white">To Rent</Link></li>
            <li><Link to="/properties" className="hover:text-white">New Homes</Link></li>
            <li><Link to="/properties" className="hover:text-white">Commercial</Link></li>
            <li><Link to="/properties" className="hover:text-white">Sold Properties</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Services</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/services" className="hover:text-white">Sell Your Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Let Your Property</Link></li>
            <li><Link to="/contact" className="hover:text-white">Free Valuation</Link></li>
            <li><a href="#" className="hover:text-white">Mortgage Advice</a></li>
            <li><a href="#" className="hover:text-white">Property Management</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Our Offices</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><strong className="text-slate-100">Heston Office</strong></li>
            <li><a href="tel:02085704848" className="hover:text-white">?? 166 Heston Road, TW5 0QU</a></li>
            <li><a href="tel:02085704848" className="hover:text-white">?? 020 8570 4848</a></li>
            <li className="mt-2"><strong className="text-slate-100">Hounslow Office</strong></li>
            <li><a href="tel:02085704747" className="hover:text-white">?? 36 Bath Road, TW3 3EB</a></li>
            <li><a href="tel:02085704747" className="hover:text-white">?? 020 8570 4747</a></li>
            <li className="mt-2"><strong className="text-slate-100">Southall Office</strong></li>
            <li><a href="tel:02085714646" className="hover:text-white">?? South Road, UB1 1SW</a></li>
            <li><a href="tel:02085714646" className="hover:text-white">?? 020 8571 4646</a></li>
            <li><a href="mailto:info@nestfind.co.uk" className="hover:text-white">?? info@nestfind.co.uk</a></li>
            <li><a href="#" className="hover:text-white">? Mon�Sat 9am�6pm</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-slate-700 pt-6 text-sm text-slate-300">
        <div className="space-y-1">
          <strong className="text-white">?? Get the Latest Property Alerts</strong>
          <p>Be the first to know about new listings in your area.</p>
        </div>
        <form className="flex flex-wrap items-center gap-3">
          <input type="email" placeholder="Enter your email address�" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30" />
          <button type="submit" className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-500">Sign Up</button>
        </form>
      </div>

      <div className="mt-8 border-t border-slate-700 pt-4 text-center text-xs text-slate-400">
        � 2026 NestFind Estate Agents | <a href="#" className="hover:text-white">Terms of Use</a> | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Cookie Policy</a>
      </div>
    </footer>
  )
}

export default Footer
