import { Link } from 'react-router-dom'
import { BUY_MENU_ITEMS, RENT_MENU_ITEMS } from '../data/menuItems'

const SELL_MENU_ITEMS = [
  { label: 'Free Valuation', to: '/contact' },
  { label: 'Seller Guide', to: '/services' },
  { label: 'Market Insights', to: '/properties' },
  { label: 'Book Consultation', to: '/contact' },
]

function Navbar() {
  const user = (() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) return null

    try {
      return JSON.parse(savedUser)
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })()

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="flex h-16 mx-1.5 items-center justify-between px-2 sm:px-3 lg:px-4">
        <div className="flex gap-3">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-white">
            🏠 Dum<span className="text-amber-300">my</span>
          </Link>
        </div>

        <div className="hidden items-center justify-end gap-2 text-sm font-medium text-slate-200 lg:flex">
          <nav className="flex items-center gap-2">
            <div className="group relative">
              <span className="rounded-md px-3 py-2 hover:bg-slate-700 cursor-pointer">Buy</span>
              <div className="invisible absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100">
                {BUY_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/buy/${item.slug}`}
                    className="block rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="group relative">
              <span className="rounded-md px-3 py-2 hover:bg-slate-700 cursor-pointer">Rent</span>
              <div className="invisible absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100">
                {RENT_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/rent/${item.slug}`}
                    className="block rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/services" className="rounded-md px-3 py-2 hover:bg-slate-700">Sell</Link>
            <Link to="/rent" className="rounded-md px-3 py-2 hover:bg-slate-700">Let</Link>
            <Link to="/about" className="rounded-md px-3 py-2 hover:bg-slate-700">About</Link>
            <Link to="/contact" className="rounded-md px-3 py-2 hover:bg-slate-700">Contact</Link>
          </nav>
          <div className="ml-2 flex items-center gap-2">
            <Link to="/properties" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-cyan-500">🔍 Property Search</Link>
            {user ? (
              <Link
                to="/profile"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                title="Profile"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-blue-700">
                  {user.name ? user.name[0].toUpperCase() : (user.email || 'U')[0].toUpperCase()}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
