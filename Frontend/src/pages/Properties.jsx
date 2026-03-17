import Navbar from '../components/Navbar'
import PropertySection from '../components/PropertySection'
import Footer from '../components/Footer'

export default function Properties() {
  return (
    <>
      <Navbar />
      <div style={{
        paddingTop: '100px',
        paddingBottom: '60px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f7f6f2 0%, #f0ede8 100%)',
        marginBottom: '0'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '14px',
          color: 'var(--navy)',
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          animation: 'fadeInUp 0.8s ease'
        }}>
          🏠 All Properties
        </h1>
        <p style={{
          color: 'var(--gray)',
          fontSize: '1.1rem',
          animation: 'fadeInUp 0.8s ease 0.2s both'
        }}>
          Browse our complete collection of premium properties across the city
        </p>
      </div>
      <PropertySection />
      <Footer />
    </>
  )
}
