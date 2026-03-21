import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{color: 'var(--white)', textDecoration: 'none'}}>Nest<span style={{color: 'var(--gold)'}}>Find</span></Link>
          <p>Your trusted local estate agents serving Heston, Hounslow and Southall since 1982. We help you buy, sell, let and rent with confidence.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">🐦</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter/X">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Properties</h4>
          <ul>
            <li><Link to="/properties" style={{textDecoration: 'none'}}>For Sale</Link></li>
            <li><Link to="/properties" style={{textDecoration: 'none'}}>To Rent</Link></li>
            <li><Link to="/properties" style={{textDecoration: 'none'}}>New Homes</Link></li>
            <li><Link to="/properties" style={{textDecoration: 'none'}}>Commercial</Link></li>
            <li><Link to="/properties" style={{textDecoration: 'none'}}>Sold Properties</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services" style={{textDecoration: 'none'}}>Sell Your Home</Link></li>
            <li><Link to="/services" style={{textDecoration: 'none'}}>Let Your Property</Link></li>
            <li><Link to="/contact" style={{textDecoration: 'none'}}>Free Valuation</Link></li>
            <li><a href="#" style={{textDecoration: 'none'}}>Mortgage Advice</a></li>
            <li><a href="#" style={{textDecoration: 'none'}}>Property Management</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Offices</h4>
          <ul>
            <li><strong style={{color: 'rgba(255,255,255,.75)'}}>Heston Office</strong></li>
            <li><a href="tel:02085704848" style={{textDecoration: 'none'}}>📍 166 Heston Road, TW5 0QU</a></li>
            <li><a href="tel:02085704848" style={{textDecoration: 'none'}}>📞 020 8570 4848</a></li>
            <li style={{marginTop: '10px'}}><strong style={{color: 'rgba(255,255,255,.75)'}}>Hounslow Office</strong></li>
            <li><a href="tel:02085704747" style={{textDecoration: 'none'}}>📍 36 Bath Road, TW3 3EB</a></li>
            <li><a href="tel:02085704747" style={{textDecoration: 'none'}}>📞 020 8570 4747</a></li>
            <li style={{marginTop: '10px'}}><strong style={{color: 'rgba(255,255,255,.75)'}}>Southall Office</strong></li>
            <li><a href="tel:02085714646" style={{textDecoration: 'none'}}>📍 South Road, UB1 1SW</a></li>
            <li><a href="tel:02085714646" style={{textDecoration: 'none'}}>📞 020 8571 4646</a></li>
            <li style={{marginTop: '10px'}}><a href="mailto:info@nestfind.co.uk" style={{textDecoration: 'none'}}>✉️ info@nestfind.co.uk</a></li>
            <li><a href="#" style={{textDecoration: 'none'}}>⏰ Mon–Sat 9am–6pm</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-newsletter">
        <div>
          <strong style={{color: '#fff', fontSize: '1rem'}}>📬 Get the Latest Property Alerts</strong>
          <p style={{fontSize: '.85rem', marginTop: '4px'}}>Be the first to know about new listings in your area.</p>
        </div>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address…" />
          <button>Sign Up</button>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 NestFind Estate Agents &nbsp;|&nbsp;
        <a href="#" style={{color: 'rgba(255,255,255,.4)', textDecoration: 'none'}}>Terms of Use</a> &nbsp;|&nbsp;
        <a href="#" style={{color: 'rgba(255,255,255,.4)', textDecoration: 'none'}}>Privacy Policy</a> &nbsp;|&nbsp;
        <a href="#" style={{color: 'rgba(255,255,255,.4)', textDecoration: 'none'}}>Cookie Policy</a>
      </div>
    </footer>
  )
}


export default Footer;