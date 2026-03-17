import '../styles/Contact.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Navbar />
      <div style={{padding: '120px 32px'}}>
        <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{fontSize: '2.8rem', marginBottom: '24px', color: 'var(--navy)'}}>Get In Touch</h1>
          <p style={{color: 'var(--gray)', fontSize: '1.05rem', marginBottom: '40px', lineHeight: '1.6'}}>
            Have questions about our properties or services? Contact us today and our team will be happy to help.
          </p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '48px'}}>
            <div style={{padding: '24px', border: '1.5px solid var(--border)', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '12px'}}>📍</div>
              <h3 style={{marginBottom: '8px', color: 'var(--navy)'}}>Heston Office</h3>
              <p style={{color: 'var(--gray)', fontSize: '.9rem'}}>166 Heston Road, TW5 0QU</p>
              <p style={{color: 'var(--gray)', fontSize: '.9rem'}}>020 8570 4848</p>
            </div>
            
            <div style={{padding: '24px', border: '1.5px solid var(--border)', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '12px'}}>📍</div>
              <h3 style={{marginBottom: '8px', color: 'var(--navy)'}}>Hounslow Office</h3>
              <p style={{color: 'var(--gray)', fontSize: '.9rem'}}>36 Bath Road, TW3 3EB</p>
              <p style={{color: 'var(--gray)', fontSize: '.9rem'}}>020 8570 4747</p>
            </div>
            
            <div style={{padding: '24px', border: '1.5px solid var(--border)', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '12px'}}>📍</div>
              <h3 style={{marginBottom: '8px', color: 'var(--navy)'}}>Southall Office</h3>
              <p style={{color: 'var(--gray)', fontSize: '.9rem'}}>South Road, UB1 1SW</p>
              <p style={{color: 'var(--gray)', fontSize: '.9rem'}}>020 8571 4646</p>
            </div>
          </div>

          <form style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto'}}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={{padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: '8px', fontSize: '.95rem'}}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              style={{padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: '8px', fontSize: '.95rem'}}
            />
            <textarea 
              placeholder="Your Message" 
              rows="5"
              style={{padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: '8px', fontSize: '.95rem', fontFamily: 'DM Sans, sans-serif'}}
            ></textarea>
            <button 
              type="submit"
              style={{padding: '12px 28px', background: 'var(--pink)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '.95rem'}}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
