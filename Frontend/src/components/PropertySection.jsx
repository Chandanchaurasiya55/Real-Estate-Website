import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'

export default function PropertySection({ compact = false, ctaText = 'View All Properties' }) {
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
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop',
      type: 'sale'
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
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop',
      type: 'sale'
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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a0ca31c60?w=600&auto=format&fit=crop',
      type: 'rent'
    }
  ]

  return (
    <section id="properties" className={compact ? 'property-section-compact' : ''}>
      {!compact && (
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <div className="section-label">Latest Listings</div>
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-sub" style={{margin: '0 auto'}}>Hand-picked homes from our latest listings across London and the surrounding areas.</p>
        </div>
      )}
      <div className="cards-grid">
        {properties.map(prop => (
          <PropertyCard 
            key={prop.id} 
            property={prop}
          />
        ))}
      </div>
      {!compact && (
        <div style={{textAlign: 'center', marginTop: '36px'}}>
          <Link to="/properties" className="btn-primary" style={{textDecoration: 'none'}}>{ctaText}</Link>
        </div>
      )}
    </section>
  )
}
