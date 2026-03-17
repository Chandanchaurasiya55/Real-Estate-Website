import '../styles/Home.css'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import SearchBar from '../components/SearchBar'
import PropertySection from '../components/PropertySection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchBar />
      <PropertySection />
      <ServicesSection />
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </>
  )
}
