import '../styles/Home.css'
import HeroSection from '../components/HeroSection'
import SearchBar from '../components/SearchBar'
import PropertySection from '../components/PropertySection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import CtaBanner from '../components/CtaBanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <PropertySection />
      <ServicesSection />
      <WhyChooseUs />
      <CtaBanner />
    </>
  )
}
