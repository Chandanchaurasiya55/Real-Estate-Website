import { Link } from 'react-router-dom'

export default function WhyChooseUs() {
  const stats = [
    { number: '40+', label: 'Years Experience' },
    { number: '2,500+', label: 'Homes Sold' },
    { number: '98%', label: 'Happy Clients' },
    { number: '3', label: 'Local Offices' }
  ]

  return (
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
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-primary" style={{textDecoration: 'none'}}>Meet Our Team →</Link>
        </div>
      </div>
    </section>
  )
}
