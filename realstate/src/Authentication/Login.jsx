import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('user', JSON.stringify({ email: formData.email }))
      navigate('/')
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-wrapper">
          {/* Left Section - Info */}
          <div className="login-left">
            <div className="login-info">
              <h1>Welcome Back</h1>
              <p>Sign in to access your property listings, saved searches, and much more.</p>
              
              <div className="info-cards">
                <div className="info-card">
                  <span className="info-icon">🏠</span>
                  <h3>Browse Properties</h3>
                  <p>Explore thousands of premium properties</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">❤️</span>
                  <h3>Save Favorites</h3>
                  <p>Keep your favorite listings in one place</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">📧</span>
                  <h3>Get Alerts</h3>
                  <p>Receive notifications about new listings</p>
                </div>
              </div>

              <div className="login-features">
                <h4>Why Sign In?</h4>
                <ul>
                  <li>✓ Access exclusive property deals</li>
                  <li>✓ Get instant notifications on new listings</li>
                  <li>✓ Schedule property viewings</li>
                  <li>✓ Track your property search history</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="login-right">
            <div className="login-form-container">
              <div className="login-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to continue</p>
              </div>

              {error && <div className="login-error">{error}</div>}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">📧 Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">🔒 Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-options">
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span> Signing In...
                    </>
                  ) : (
                    '🚀 Sign In'
                  )}
                </button>
              </form>

              <div className="login-divider">
                <span>OR</span>
              </div>

              <div className="social-login">
                <button className="social-btn google">
                  <span>🔵</span> Google
                </button>
                <button className="social-btn facebook">
                  <span>📘</span> Facebook
                </button>
              </div>

              <div className="login-footer">
                <p>🎯 Use demo credentials above to test the login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
