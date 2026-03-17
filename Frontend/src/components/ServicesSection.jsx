import ServiceCard from './ServiceCard'

export default function ServicesSection() {
  const services = [
    {
      icon: '🏠',
      title: 'Buying a Property',
      description: 'Step-by-step guidance from your first viewing to collecting the keys. We\'re with you every step.'
    },
    {
      icon: '💷',
      title: 'Selling a Property',
      description: 'Market-leading valuations and targeted marketing to get you the best price fast.'
    },
    {
      icon: '🔑',
      title: 'Letting Your Property',
      description: 'Full landlord support — from tenant-finding to full property management packages.'
    },
    {
      icon: '📋',
      title: 'Tenants Guide',
      description: 'Everything you need to know about renting — deposits, checks, and your rights explained.'
    },
    {
      icon: '📊',
      title: 'Free Valuation',
      description: 'Curious what your home is worth? Get a free online or in-person valuation today.'
    },
    {
      icon: '🔔',
      title: 'Property Alerts',
      description: 'Register and be the first to hear about new properties that match your requirements.'
    }
  ]

  return (
    <section className="services-bg">
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">Our Services</h2>
      </div>
      <div className="services-grid">
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </section>
  )
}
