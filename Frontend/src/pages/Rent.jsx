import '../styles/Properties.css'
import PropertySection from '../components/PropertySection'

export default function Rent() {
  return (
    <>
      <header className="listing-hero listing-hero-rent">
        <div className="listing-hero-content">
          <p className="listing-kicker">Rent</p>
          <h1>Rental Homes That Match Your Lifestyle</h1>
          <p>
            Discover flats and houses for rent with transparent pricing, flexible terms, and move-in-ready options.
          </p>
          <div className="listing-stats">
            <article>
              <h3>120+</h3>
              <p>Rental Listings</p>
            </article>
            <article>
              <h3>7 Days</h3>
              <p>Average Let Time</p>
            </article>
            <article>
              <h3>90%</h3>
              <p>Tenant Satisfaction</p>
            </article>
          </div>
        </div>
        <div className="listing-hero-panel">
          <h2>Popular Searches</h2>
          <div className="listing-tags">
            <span>Pet Friendly</span>
            <span>Near Tube</span>
            <span>Furnished</span>
            <span>Long Term</span>
          </div>
        </div>
      </header>
      <PropertySection compact />
    </>
  )
}
