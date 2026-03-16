import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

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

  const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleCardClick = () => {
    navigate(`/property/${property.id}`)
  }

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="card-img">
        <img src={property.image} alt={property.title} />
        <span className={`card-badge ${property.type === 'rent' ? 'rent' : ''}`}>
          {property.badge}
        </span>
        <button 
          className="card-heart" 
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
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
