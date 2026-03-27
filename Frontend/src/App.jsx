import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/LandingPage'
import Properties from './pages/Properties'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PropertyDetail from './pages/PropertyDetail'
import UserLogin from './Auth/UserLogin'
import UserRegister from './Auth/UserRegister'
import AdminLogin from './Auth/Adminlogin'
import AdminRegister from './Auth/AdminRegister'
import BuyPage from './pages/BuyPage'
import RentPage from './pages/RentPage'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`min-h-[calc(100vh-4rem)] ${isHome ? '' : 'pt-16'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/rent/:slug" element={<RentPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/owner" element={<AdminLogin />} />
        <Route path="/owner/register" element={<AdminRegister />} />
        <Route path="/buy/:slug" element={<BuyPage />} />
      </Routes>
    </div>
  )
}

export default App
