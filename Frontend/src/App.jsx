import { Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Rent from './pages/Rent'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PropertyDetail from './pages/PropertyDetail'
import Login from './Authentication/Login'
import BuyPage from './pages/BuyPage'
import './styles/PropertyDetail.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/rent" element={<Rent />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buy/:slug" element={<BuyPage />} />
    </Routes>
  )
}

export default App
