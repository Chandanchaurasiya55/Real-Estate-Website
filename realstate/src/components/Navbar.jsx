import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo" style={{textDecoration: 'none', cursor: 'pointer'}}>Dum<span>my</span></Link>
      <ul className="nav-links">
        <li><Link to="/properties" style={{textDecoration: 'none'}}>Buy</Link></li>
        <li><Link to="/properties" style={{textDecoration: 'none'}}>Rent</Link></li>
        <li><Link to="/properties" style={{textDecoration: 'none'}}>Sell</Link></li>
        <li><Link to="/about" style={{textDecoration: 'none'}}>About</Link></li>
        <li><Link to="/contact" style={{textDecoration: 'none'}}>Contact</Link></li>
        <li><Link to="/properties" className="nav-cta" style={{textDecoration: 'none'}}>Property Search</Link></li>
      </ul>
    </nav>
  )
}
