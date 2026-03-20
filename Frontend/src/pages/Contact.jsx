import { useState } from 'react'
import '../styles/Contact.css'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  inquiryType: 'Buying',
  message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setSuccess('Thanks, your message has been sent. Our advisor will contact you soon.')
    setFormData(initialForm)
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <p className="contact-kicker">Contact Us</p>
          <h1>Talk To A Local Property Advisor</h1>
          <p>
            Whether you are buying, renting, or selling, our team can guide you with clear steps and quick answers.
          </p>
          <div className="contact-quick-stats">
            <article>
              <h3>3 Offices</h3>
              <p>Across West London</p>
            </article>
            <article>
              <h3>24h</h3>
              <p>Typical Response Time</p>
            </article>
            <article>
              <h3>4.8/5</h3>
              <p>Client Satisfaction</p>
            </article>
          </div>
        </div>
        <div className="contact-hero-card">
          <h2>Visit Our Offices</h2>
          <ul>
            <li>
              <strong>Heston Office</strong>
              <span>166 Heston Road, TW5 0QU</span>
              <span>020 8570 4848</span>
            </li>
            <li>
              <strong>Hounslow Office</strong>
              <span>36 Bath Road, TW3 3EB</span>
              <span>020 8570 4747</span>
            </li>
            <li>
              <strong>Southall Office</strong>
              <span>South Road, UB1 1SW</span>
              <span>020 8571 4646</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="contact-form-wrap">
        <div className="contact-form-header">
          <h2>Send Us A Message</h2>
          <p>Share your requirement and our expert will get back with tailored options.</p>
        </div>

        <form className="contact-form-ui" onSubmit={handleSubmit} noValidate>
          <div className="contact-grid-2">
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </label>
            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
          </div>

          <div className="contact-grid-2">
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Optional"
              />
            </label>
            <label>
              Inquiry Type
              <select name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                <option>Buying</option>
                <option>Renting</option>
                <option>Selling</option>
                <option>Valuation</option>
              </select>
            </label>
          </div>

          <label>
            Your Message
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what kind of property or service you are looking for"
              required
            />
          </label>

          {error && <p className="contact-feedback error">{error}</p>}
          {success && <p className="contact-feedback success">{success}</p>}

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </section>
    </main>
  )
}
