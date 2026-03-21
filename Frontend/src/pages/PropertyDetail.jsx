import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles/PropertyDetail.css'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  // All properties data
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
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop',
      type: 'sale',
      description: 'Beautiful detached house with spacious gardens and modern amenities. Perfect for families looking for comfort and privacy.',
      fullDescription: 'This stunning 4-bedroom detached house offers the perfect blend of modern comfort and classic charm. Located in the heart of Heston, Middlesex, this property features a spacious master suite, modern fully equipped kitchen, and elegant living areas. The property boasts a well-maintained garage and beautiful landscaped garden, ideal for outdoor entertainment and family gatherings.',
      features: ['4 Bedrooms', '2 Bathrooms', 'Garage', 'Garden', 'Modern Kitchen', 'Spacious Living Area'],
      agent: 'John Smith',
      agentPhone: '+44 (0)20 7946 0958'
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
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop',
      type: 'sale',
      description: 'Luxury modern villa featuring a stunning pool, premium finishes, and breathtaking views. An ideal investment property.',
      fullDescription: 'A contemporary masterpiece in Hounslow, this 5-bedroom modern villa is designed for those with discerning taste. Features include a resort-style swimming pool, state-of-the-art home automation, cinema room, and expansive entertaining spaces. Premium materials and finishes throughout, with floor-to-ceiling windows offering spectacular views.',
      features: ['5 Bedrooms', '3 Bathrooms', 'Swimming Pool', 'Home Automation', 'Cinema Room', 'Gym'],
      agent: 'Sarah Johnson',
      agentPhone: '+44 (0)20 7946 0959'
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
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop',
      type: 'rent',
      description: 'Contemporary apartment with smart home features in a vibrant neighborhood. Close to transport and shopping centers.',
      fullDescription: 'A modern 2-bedroom apartment in a prime location, Southall. This newly renovated apartment features smart home technology, open-plan living, and contemporary interior design. Located near Southall station with excellent public transport links, shopping centers, and dining options.',
      features: ['2 Bedrooms', '1 Bathroom', 'Parking', 'Smart Home', 'Open Plan', 'Modern Finishing'],
      agent: 'Mike Wilson',
      agentPhone: '+44 (0)20 7946 0960'
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
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&auto=format&fit=crop',
      type: 'sale',
      description: 'Charming semi-detached home with character and space. Recently renovated with quality upgrades throughout.',
      fullDescription: 'A charming 3-bedroom semi-detached home in Heston with character and modern updates. This property features recently renovated interiors, a beautiful rear garden, and excellent access to local schools and amenities. Perfect for growing families or investors.',
      features: ['3 Bedrooms', '2 Bathrooms', 'Garden', 'Updated Kitchen', 'Driveway', 'Recently Renovated'],
      agent: 'Emma Davis',
      agentPhone: '+44 (0)20 7946 0961'
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
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop',
      type: 'sale',
      description: 'Grand luxury property with 6 bedrooms, premium amenities, and expansive grounds. Perfect for discerning buyers.',
      fullDescription: 'An exceptional grand luxury home situated in the heart of Hounslow Central. This prestigious 6-bedroom property is set on expansive grounds with manicured gardens. It features premium finishes, state-of-the-art technology, and multiple entertaining spaces including a formal dining room, library, and spa facilities.',
      features: ['6 Bedrooms', '4 Bathrooms', 'Large Plot', 'Tennis Court', 'Spa & Sauna', 'Wine Cellar'],
      agent: 'Robert Brown',
      agentPhone: '+44 (0)20 7946 0962'
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
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=1200&auto=format&fit=crop',
      type: 'rent',
      description: 'Compact studio flat ideal for professionals and first-time renters. Modern design with excellent connectivity.',
      fullDescription: 'A stylish 1-bedroom studio flat in Southall, perfectly designed for professionals and first-time renters. Features include modern interior design, dedicated workspace, and excellent connectivity to transport networks. Recently renovated with neutral décor.',
      features: ['1 Bedroom', '1 Bathroom', 'Studio Layout', 'Modern Finishing', 'Near Tube', 'Recently Renovated'],
      agent: 'Lisa Anderson',
      agentPhone: '+44 (0)20 7946 0963'
    },
    {
      id: 7,
      price: '£625,000',
      title: '4-Bed Townhouse',
      location: 'Hayes, UB3',
      beds: 4,
      baths: 2,
      feature: 'Terrace',
      badge: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
      type: 'sale',
      description: 'Beautiful 4-bed townhouse with modern facilities and spacious living areas. Perfect for families with outdoor terrace.',
      fullDescription: 'A stunning 4-bedroom townhouse in Hayes, featuring contemporary design and premium finishes. This spacious property includes a private rooftop terrace perfect for entertaining, modern open-plan living areas, and updated appliances throughout. Located in a quiet residential area with excellent local amenities.',
      features: ['4 Bedrooms', '2 Bathrooms', 'Rooftop Terrace', 'Open Plan', 'Modern Kitchen', 'Secure Parking'],
      agent: 'James Wilson',
      agentPhone: '+44 (0)20 7946 0964'
    },
    {
      id: 8,
      price: '£550,000',
      title: '3-Bed Corner House',
      location: 'Uxbridge, UB8',
      beds: 3,
      baths: 2,
      feature: 'Balcony',
      badge: 'For Sale',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop',
      type: 'sale',
      description: 'Corner property with natural light and spacious rooms. Features balcony with views and modern amenities.',
      fullDescription: 'A charming 3-bedroom corner house in Uxbridge with abundant natural light and contemporary renovations. This property features a spacious balcony, updated interior design, and access to modern shopping and dining outlets. Great investment opportunity in a rapidly developing area.',
      features: ['3 Bedrooms', '2 Bathrooms', 'Corner Plot', 'Balcony', 'Natural Light', 'Recently Updated'],
      agent: 'Patricia Martinez',
      agentPhone: '+44 (0)20 7946 0965'
    },
    {
      id: 9,
      price: '£1,500 / mo',
      title: '2-Bed Luxury Flat',
      location: 'Hounslow, TW4',
      beds: 2,
      baths: 2,
      feature: 'Gym Access',
      badge: 'To Rent',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
      type: 'rent',
      description: 'Premium 2-bed luxury flat with building amenities. Complete with gym, swimming pool, and covered parking.',
      fullDescription: 'An exquisite 2-bedroom luxury flat in Hounslow featuring premium finishes and exclusive building amenities. Residents enjoy access to a state-of-the-art gym, Olympic-size swimming pool, concierge service, and 24-hour security. Perfect for discerning professionals seeking comfort and luxury.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Gym Access', 'Pool', '24/7 Security', 'Concierge Service'],
      agent: 'Christopher Hall',
      agentPhone: '+44 (0)20 7946 0966'
    }
  ]

  const property = properties.find(p => p.id === parseInt(id))

  if (!property) {
    return (
      <div className="detail-not-found">
        <h1>Property Not Found</h1>
        <button onClick={() => navigate('/')} className="btn-primary">
          ← Back to Home
        </button>
      </div>
    )
  }

  const relatedProperties = properties.filter(p => 
    p.id !== property.id && 
    (p.type === property.type || p.beds === property.beds)
  ).slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <div className="detail-hero">
        <img src={property.image} alt={property.title} />
        <div className="detail-hero-overlay">
          <button 
            className="detail-back-btn" 
            onClick={() => navigate('/')}
          >
            ← Back
          </button>
          <button 
            className="detail-favorite-btn"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-container">
        <div className="detail-main">
          {/* Header */}
          <div className="detail-header">
            <div>
              <h1>{property.title}</h1>
              <div className="detail-badge">{property.badge}</div>
            </div>
            <div className="detail-price">{property.price}</div>
          </div>

          {/* Location */}
          <div className="detail-location">
            <span>📍 {property.location}</span>
          </div>

          {/* Quick Features */}
          <div className="detail-quick-features">
            <div className="quick-feature">
              <span className="feature-icon">🛏</span>
              <div>
                <div className="feature-label">Bedrooms</div>
                <div className="feature-value">{property.beds}</div>
              </div>
            </div>
            <div className="quick-feature">
              <span className="feature-icon">🚿</span>
              <div>
                <div className="feature-label">Bathrooms</div>
                <div className="feature-value">{property.baths}</div>
              </div>
            </div>
            <div className="quick-feature">
              <span className="feature-icon">✨</span>
              <div>
                <div className="feature-label">Feature</div>
                <div className="feature-value">{property.feature}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="detail-section">
            <h2>About This Property</h2>
            <p className="detail-description">{property.fullDescription}</p>
          </div>

          {/* Features */}
          <div className="detail-section">
            <h2>Key Features</h2>
            <div className="detail-features-grid">
              {property.features.map((feat, idx) => (
                <div key={idx} className="feature-badge">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Contact */}
          <div className="detail-agent">
            <h2>Contact Agent</h2>
            <div className="agent-info">
              <div className="agent-avatar">👤</div>
              <div className="agent-details">
                <h3>{property.agent}</h3>
                <p>📞 {property.agentPhone}</p>
              </div>
              <button className="btn-primary">Contact Now 📧</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">
          <div className="detail-box">
            <h3>Quick Summary</h3>
            <div className="summary-item">
              <span>Property Type</span>
              <strong>{property.type === 'rent' ? 'To Rent' : 'For Sale'}</strong>
            </div>
            <div className="summary-item">
              <span>Price</span>
              <strong className="price">{property.price}</strong>
            </div>
            <div className="summary-item">
              <span>Location</span>
              <strong>{property.location}</strong>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
              Schedule Viewing 📅
            </button>
          </div>

          <div className="detail-box">
            <h3>Virtual Tour</h3>
            <div className="virtual-tour">
              <span>🎬 Video Tour</span>
              <p>Click to view full property tour</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="detail-related">
          <div className="detail-container">
            <h2>Related Properties</h2>
            <div className="related-grid">
              {relatedProperties.map(related => (
                <div 
                  key={related.id} 
                  className="related-card"
                  onClick={() => navigate(`/property/${related.id}`)}
                >
                  <div className="related-card-img">
                    <img src={related.image} alt={related.title} />
                    <span className={`related-badge ${related.type === 'rent' ? 'rent' : ''}`}>
                      {related.badge}
                    </span>
                  </div>
                  <div className="related-card-content">
                    <div className="related-price">{related.price}</div>
                    <div className="related-title">{related.title}</div>
                    <div className="related-location">📍 {related.location}</div>
                    <div className="related-specs">
                      <span>🛏 {related.beds}</span>
                      <span>🚿 {related.baths}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
