import '../styles/Services.css'
import ServicesSection from '../components/ServicesSection'

export default function Services() {
  return (
    <>
      <div style={{paddingTop: '80px', textAlign: 'center', marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.8rem', marginBottom: '16px', color: 'var(--navy)'}}>Our Services</h1>
        <p style={{color: 'var(--gray)', fontSize: '1.05rem'}}>Comprehensive real estate solutions</p>
      </div>
      <ServicesSection />
    </>
  )
}
