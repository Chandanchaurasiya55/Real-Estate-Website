import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { BUY_MENU_ITEMS } from '../data/buyPages'

const SELL_MENU_ITEMS = [
  { label: 'Free Valuation', to: '/contact' },
  { label: 'Seller Guide', to: '/services' },
  { label: 'Market Insights', to: '/properties' },
  { label: 'Book Consultation', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const buyDropdownRef = useRef(null)
  const sellDropdownRef = useRef(null)
  const letDropdownRef = useRef(null)
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false)
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false)
  const [letDropdownOpen, setLetDropdownOpen] = useState(false)

  useEffect(() => {
    function handleOutsideClick(event) {
      if (buyDropdownRef.current && !buyDropdownRef.current.contains(event.target)) {
        setBuyDropdownOpen(false)
      }
      if (sellDropdownRef.current && !sellDropdownRef.current.contains(event.target)) {
        setSellDropdownOpen(false)
      }
      if (letDropdownRef.current && !letDropdownRef.current.contains(event.target)) {
        setLetDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    setBuyDropdownOpen(false)
    setSellDropdownOpen(false)
    setLetDropdownOpen(false)
  }, [location.pathname])

  return (
    <nav>
      <Link to="/" className="logo" style={{textDecoration: 'none', cursor: 'pointer'}}>
        🏠 Dum<span>my</span>
      </Link>
      <ul className="nav-links">
        <li className="nav-dropdown" ref={buyDropdownRef}>
          <button
            type="button"
            className="nav-dropdown-toggle"
            onClick={() => setBuyDropdownOpen((prev) => !prev)}
            aria-expanded={buyDropdownOpen}
            aria-haspopup="menu"
          >
            <span className="nav-dropdown-label">Buy</span>
            <span className={`dropdown-chevron ${buyDropdownOpen ? 'open' : ''}`} aria-hidden="true"></span>
          </button>
          {buyDropdownOpen && (
            <div className="dropdown-menu" role="menu">
              {BUY_MENU_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  to={`/buy/${item.slug}`}
                  className={location.pathname === `/buy/${item.slug}` ? 'active-dropdown-link' : ''}
                  onClick={() => setBuyDropdownOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </li>
        <li><Link to="/rent" style={{textDecoration: 'none'}}> Rent</Link></li>
        <li className="nav-dropdown" ref={sellDropdownRef}>
          <button
            type="button"
            className="nav-dropdown-toggle"
            onClick={() => setSellDropdownOpen((prev) => !prev)}
            aria-expanded={sellDropdownOpen}
            aria-haspopup="menu"
          >
            <span className="nav-dropdown-label">Sell</span>
            <span className={`dropdown-chevron ${sellDropdownOpen ? 'open' : ''}`} aria-hidden="true"></span>
          </button>
          {sellDropdownOpen && (
            <div className="dropdown-menu" role="menu">
              {SELL_MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={location.pathname === item.to ? 'active-dropdown-link' : ''}
                  onClick={() => setSellDropdownOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </li>
        
        <li className="nav-dropdown" ref={letDropdownRef}>
          <button
            type="button"
            className="nav-dropdown-toggle"
            onClick={() => setLetDropdownOpen((prev) => !prev)}
            aria-expanded={letDropdownOpen}
            aria-haspopup="menu"
          >
            <span className="nav-dropdown-label">Let</span>
            <span className={`dropdown-chevron ${letDropdownOpen ? 'open' : ''}`} aria-hidden="true"></span>
          </button>
          {letDropdownOpen && (
            <div className="dropdown-menu" role="menu">
              <Link to="/properties" style={{textDecoration: 'none'}}>Landloards Guide</Link>
              <Link to="/properties" style={{textDecoration: 'none'}}>Landloards Services & Fees</Link>
              <Link to="/properties" style={{textDecoration: 'none'}}>EPC</Link>
              <Link to="/properties" style={{textDecoration: 'none'}}>Landloards Reviews</Link>
               <Link to="/properties" style={{textDecoration: 'none'}}>Book a Valuation</Link>
            </div>
          )}
        </li>

        <li><Link to="/about" style={{textDecoration: 'none'}}> About</Link></li>
        <li><Link to="/contact" style={{textDecoration: 'none'}}> Contact</Link></li>
        <li><Link to="/properties" className="nav-cta" style={{textDecoration: 'none'}}>🔍 Property Search</Link></li>
        <li><Link to="/login" className="nav-login-btn" style={{textDecoration: 'none'}}> Login</Link></li>
      </ul>
    </nav>
  )
}
