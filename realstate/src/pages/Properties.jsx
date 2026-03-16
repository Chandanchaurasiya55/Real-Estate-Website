import Navbar from '../components/Navbar'
import PropertySection from '../components/PropertySection'
import Footer from '../components/Footer'

export default function Properties() {
  return (
    <>
      <Navbar />
      <div style={{paddingTop: '80px', textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.8rem', marginBottom: '16px', color: 'var(--navy)'}}>All Properties</h1>
        <p style={{color: 'var(--gray)', fontSize: '1.05rem'}}>Browse our complete collection of properties</p>
      </div>
      <PropertySection />
      <Footer />
    </>
  )
}
