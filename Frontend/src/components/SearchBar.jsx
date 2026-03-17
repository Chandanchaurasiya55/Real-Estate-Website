export default function SearchBar() {
  return (
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
  )
}
