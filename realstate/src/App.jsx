import './App.css'

function App() {
  const properties = [
    {
      id: 1,
      price: '£485,000',
      title: '4-Bed Detached House',
      location: 'Heston, Middlesex',
      beds: 4,
      baths: 2,
      feature: 'Garage',
      badge: 'For Sale',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop',
      type: 'sale'
    },
    {
      id: 2,
      price: '£720,000',
      title: '5-Bed Modern Villa',
      location: 'Hounslow, TW3',
      beds: 5,
      baths: 3,
      feature: 'Pool',
      badge: 'For Sale',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop',
      type: 'sale'
    },
    {
      id: 3,
      price: '£1,800 / mo',
      title: '2-Bed Modern Apartment',
      location: 'Southall, UB1',
      beds: 2,
      baths: 1,
      feature: 'Parking',
      badge: 'To Rent',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop',
      type: 'rent'
    },
    {
      id: 4,
      price: '£360,000',
      title: '3-Bed Semi-Detached',
      location: 'Heston, TW5',
      beds: 3,
      baths: 2,
      feature: 'Garden',
      badge: 'For Sale',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop',
      type: 'sale'
    },
    {
      id: 5,
      price: '£950,000',
      title: '6-Bed Luxury Home',
      location: 'Hounslow Central',
      beds: 6,
      baths: 4,
      feature: 'Large Plot',
      badge: 'For Sale',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop',
      type: 'sale'
    },
    {
      id: 6,
      price: '£1,200 / mo',
      title: '1-Bed Studio Flat',
      location: 'Southall, UB2',
      beds: 1,
      baths: 1,
      feature: 'Near Tube',
      badge: 'To Rent',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop',
      type: 'rent'
    }
  ]

  const services = [
    {
      icon: '🏠',
      title: 'Buying a Property',
      description: 'Step-by-step guidance from your first viewing to collecting the keys. We\'re with you every step.'
    },
    {
      icon: '💷',
      title: 'Selling a Property',
      description: 'Market-leading valuations and targeted marketing to get you the best price fast.'
    },
    {
      icon: '🔑',
      title: 'Letting Your Property',
      description: 'Full landlord support — from tenant-finding to full property management packages.'
    },
    {
      icon: '📋',
      title: 'Tenants Guide',
      description: 'Everything you need to know about renting — deposits, checks, and your rights explained.'
    },
    {
      icon: '📊',
      title: 'Free Valuation',
      description: 'Curious what your home is worth? Get a free online or in-person valuation today.'
    },
    {
      icon: '🔔',
      title: 'Property Alerts',
      description: 'Register and be the first to hear about new properties that match your requirements.'
    }
  ]

  return (
    <>
      {/* NAVBAR */}
      <nav>
        <div className="logo">Dum<span>my</span></div>
        <ul className="nav-links">
          <li><a href="#">Buy</a></li>
          <li><a href="#">Rent</a></li>
          <li><a href="#">Sell</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#" className="nav-cta">Property Search</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop" alt="Beautiful modern home" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Your <span>Dream</span> Home Today</h1>
          <p>Buying, selling, or renting — we guide you every step of the way with expert advice and personal support.</p>
          <div className="hero-btns">
            <a href="#properties" className="btn-primary">Browse Properties</a>
            <a href="#valuation" className="btn-outline">Free Valuation</a>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="search-section">
        <div className="search-bar">
          <div className="search-field">
            <label>Location</label>
            <input type="text" placeholder="City, area or postcode…" />
          </div>
          <div className="search-field">
            <label>Property Type</label>
            <select>
              <option>Any Type</option>
              <option>House</option>
              <option>Flat / Apartment</option>
              <option>Bungalow</option>
              <option>Commercial</option>
            </select>
          </div>
          <div className="search-field">
            <label>Listing Type</label>
            <select>
              <option>Buy or Rent</option>
              <option>For Sale</option>
              <option>To Rent</option>
            </select>
          </div>
          <div className="search-field">
            <label>Max Price</label>
            <select>
              <option>No Limit</option>
              <option>£200,000</option>
              <option>£400,000</option>
              <option>£600,000</option>
              <option>£1,000,000+</option>
            </select>
          </div>
          <button className="search-btn">🔍 Search</button>
        </div>
      </div>

      {/* FEATURED PROPERTIES */}
      <section id="properties">
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <div className="section-label">Latest Listings</div>
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-sub" style={{margin: '0 auto'}}>Hand-picked homes from our latest listings across London and the surrounding areas.</p>
        </div>
        <div className="cards-grid">
          {properties.map(prop => (
            <div key={prop.id} className="card">
              <div className="card-img">
                <img src={prop.image} alt={prop.title} />
                <span className={`card-badge ${prop.type === 'rent' ? 'rent' : ''}`}>{prop.badge}</span>
              </div>
              <div className="card-body">
                <div className="card-price">{prop.price}</div>
                <div className="card-title">{prop.title}</div>
                <div className="card-loc">📍 {prop.location}</div>
                <div className="card-features">
                  <span>🛏 {prop.beds} Beds</span>
                  <span>🚿 {prop.baths} Baths</span>
                  <span>{prop.feature === 'Garage' ? '🚗' : prop.feature === 'Pool' ? '🏊' : prop.feature === 'Parking' ? '🅿️' : prop.feature === 'Garden' ? '🌿' : prop.feature === 'Large Plot' ? '🏡' : '🚇'} {prop.feature}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign: 'center', marginTop: '36px'}}>
          <a href="#" className="btn-primary">View All Properties</a>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-bg">
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Our Services</h2>
        </div>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section>
        <div className="why-grid">
          <div className="why-img">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop" alt="Our Team" />
          </div>
          <div className="why-text">
            <div className="section-label">Why NestFind</div>
            <h2>Your Trusted Local Property Experts</h2>
            <p>With over 40 years of experience serving the community, we understand the local market better than anyone. Our friendly team is dedicated to making your property journey smooth, stress-free, and successful.</p>
            <div className="stats">
              <div className="stat-item">
                <h3>40+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>2,500+</h3>
                <p>Homes Sold</p>
              </div>
              <div className="stat-item">
                <h3>98%</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h3>3</h3>
                <p>Local Offices</p>
              </div>
            </div>
            <a href="#" className="btn-primary">Meet Our Team →</a>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner" id="valuation">
        <h2>Ready to Get Started?</h2>
        <p>Book your free property valuation or register for new property alerts — it only takes a minute.</p>
        <div className="cta-btns">
          <a href="#" className="btn-primary">📅 Book Free Valuation</a>
          <a href="#" className="btn-outline">🔔 Register for Alerts</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo">Nest<span style={{color: 'var(--gold)'}}>Find</span></span>
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
              <li><a href="#">For Sale</a></li>
              <li><a href="#">To Rent</a></li>
              <li><a href="#">New Homes</a></li>
              <li><a href="#">Commercial</a></li>
              <li><a href="#">Sold Properties</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Sell Your Home</a></li>
              <li><a href="#">Let Your Property</a></li>
              <li><a href="#">Free Valuation</a></li>
              <li><a href="#">Mortgage Advice</a></li>
              <li><a href="#">Property Management</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Offices</h4>
            <ul>
              <li><strong style={{color: 'rgba(255,255,255,.75)'}}>Heston Office</strong></li>
              <li><a href="#">📍 166 Heston Road, TW5 0QU</a></li>
              <li><a href="#">📞 020 8570 4848</a></li>
              <li style={{marginTop: '10px'}}><strong style={{color: 'rgba(255,255,255,.75)'}}>Hounslow Office</strong></li>
              <li><a href="#">📍 36 Bath Road, TW3 3EB</a></li>
              <li><a href="#">📞 020 8570 4747</a></li>
              <li style={{marginTop: '10px'}}><strong style={{color: 'rgba(255,255,255,.75)'}}>Southall Office</strong></li>
              <li><a href="#">📍 South Road, UB1 1SW</a></li>
              <li><a href="#">📞 020 8571 4646</a></li>
              <li style={{marginTop: '10px'}}><a href="#">✉️ info@nestfind.co.uk</a></li>
              <li><a href="#">⏰ Mon–Sat 9am–6pm</a></li>
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
    </>
  )
}

export default App
