import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav>
      <Link to="/" className="logo" style={{textDecoration: 'none', cursor: 'pointer'}}>
        🏠 Dum<span>my</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/properties" style={{textDecoration: 'none'}}> Buy</Link></li>
        <li><Link to="/properties" style={{textDecoration: 'none'}}> Rent</Link></li>
        <li><Link to="/properties" style={{textDecoration: 'none'}}> Sell</Link></li>
        
        <li className="nav-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <Link style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}> 
            Let {dropdownOpen ? '▼' : '▶'} 
          </Link>
          {dropdownOpen && (
            <div className="dropdown-menu">
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
