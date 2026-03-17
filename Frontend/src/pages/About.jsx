import Navbar from '../components/Navbar'
import WhyChooseUs from '../components/WhyChooseUs'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{paddingTop: '80px'}}></div>
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </>
  )
}
