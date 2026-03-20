import '../styles/Properties.css'
import PropertySection from '../components/PropertySection'

export default function Properties() {
  return (
    <>
      <header className="listing-hero">
        <div className="listing-hero-content">
          <p className="listing-kicker">All Properties</p>
          <h1>Find The Right Home Faster</h1>
          <p>
            Browse curated listings with clean pricing, verified details, and the neighborhoods you actually want.
          </p>
          <div className="listing-stats">
            <article>
              <h3>180+</h3>
              <p>Verified Listings</p>
            </article>
            <article>
              <h3>24h</h3>
              <p>Avg. Response Time</p>
            </article>
            <article>
              <h3>4.8/5</h3>
              <p>Client Rating</p>
            </article>
          </div>
        </div>
        <div className="listing-hero-panel">
          <h2>Quick Filter</h2>
          <div className="listing-tags">
            <span>London</span>
            <span>Family Homes</span>
            <span>Under GBP 900k</span>
            <span>Ready To Move</span>
          </div>
        </div>
      </header>
      <PropertySection compact />
    </>
  )
}
