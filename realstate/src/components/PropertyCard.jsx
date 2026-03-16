export default function PropertyCard({ property }) {
  const getEmoji = (feature) => {
    switch(feature) {
      case 'Garage': return '🚗';
      case 'Pool': return '🏊';
      case 'Parking': return '🅿️';
      case 'Garden': return '🌿';
      case 'Large Plot': return '🏡';
      default: return '🚇';
    }
  }

  return (
    <div className="card">
      <div className="card-img">
        <img src={property.image} alt={property.title} />
        <span className={`card-badge ${property.type === 'rent' ? 'rent' : ''}`}>
          {property.badge}
        </span>
      </div>
      <div className="card-body">
        <div className="card-price">{property.price}</div>
        <div className="card-title">{property.title}</div>
        <div className="card-loc">📍 {property.location}</div>
        <div className="card-features">
          <span>🛏 {property.beds} Beds</span>
          <span>🚿 {property.baths} Baths</span>
          <span>{getEmoji(property.feature)} {property.feature}</span>
        </div>
      </div>
    </div>
  )
}
