import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <div className="cta-banner" id="valuation">
      <h2>Ready to Get Started?</h2>
      <p>Book your free property valuation or register for new property alerts — it only takes a minute.</p>
      <div className="cta-btns">
        <Link to="/contact" className="btn-primary" style={{textDecoration: 'none'}}>📅 Book Free Valuation</Link>
        <Link to="/contact" className="btn-outline" style={{textDecoration: 'none'}}>🔔 Register for Alerts</Link>
      </div>
    </div>
  )
}
