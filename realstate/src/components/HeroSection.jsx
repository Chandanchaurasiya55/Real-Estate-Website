import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <div className="hero">
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop" alt="Beautiful modern home" />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Find Your <span>Dream</span> Home Today</h1>
        <p>Buying, selling, or renting — we guide you every step of the way with expert advice and personal support.</p>
        <div className="hero-btns">
          <Link to="/properties" className="btn-primary" style={{textDecoration: 'none'}}>Browse Properties</Link>
          <Link to="/contact" className="btn-outline" style={{textDecoration: 'none'}}>Free Valuation</Link>
        </div>
      </div>
    </div>
  )
}
