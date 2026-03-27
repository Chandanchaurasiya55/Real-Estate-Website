import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const properties = [
  { id:1, price:'£485,000', title:'4-Bed Detached House', location:'Heston, Middlesex', beds:4, baths:2, feature:'Garage', badge:'For Sale', image:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop', type:'sale', description:'Beautiful detached house with spacious gardens and modern amenities. Perfect for families looking for comfort and privacy.', fullDescription:'This stunning 4-bedroom detached house offers the perfect blend of modern comfort and classic charm. Located in the heart of Heston, Middlesex, this property features a spacious master suite, modern fully equipped kitchen, and elegant living areas. The property boasts a well-maintained garage and beautiful landscaped garden, ideal for outdoor entertainment and family gatherings.', features:['4 Bedrooms','2 Bathrooms','Garage','Garden','Modern Kitchen','Spacious Living Area'], agent:'John Smith', agentPhone:'+44 (0)20 7946 0958' },
  { id:2, price:'£720,000', title:'5-Bed Modern Villa', location:'Hounslow, TW3', beds:5, baths:3, feature:'Pool', badge:'For Sale', image:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop', type:'sale', description:'Luxury modern villa featuring a stunning pool, premium finishes, and breathtaking views. An ideal investment property.', fullDescription:'A contemporary masterpiece in Hounslow, this 5-bedroom modern villa is designed for those with discerning taste. Features include a resort-style swimming pool, state-of-the-art home automation, cinema room, and expansive entertaining spaces. Premium materials and finishes throughout, with floor-to-ceiling windows offering spectacular views.', features:['5 Bedrooms','3 Bathrooms','Swimming Pool','Home Automation','Cinema Room','Gym'], agent:'Sarah Johnson', agentPhone:'+44 (0)20 7946 0959' },
  { id:3, price:'£1,800 / mo', title:'2-Bed Modern Apartment', location:'Southall, UB1', beds:2, baths:1, feature:'Parking', badge:'To Rent', image:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop', type:'rent', description:'Contemporary apartment with smart home features in a vibrant neighborhood. Close to transport and shopping centers.', fullDescription:'A modern 2-bedroom apartment in a prime location, Southall. This newly renovated apartment features smart home technology, open-plan living, and contemporary interior design. Located near Southall station with excellent public transport links, shopping centers, and dining options.', features:['2 Bedrooms','1 Bathroom','Parking','Smart Home','Open Plan','Modern Finishing'], agent:'Mike Wilson', agentPhone:'+44 (0)20 7946 0960' },
  { id:4, price:'£360,000', title:'3-Bed Semi-Detached', location:'Heston, TW5', beds:3, baths:2, feature:'Garden', badge:'For Sale', image:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&auto=format&fit=crop', type:'sale', description:'Charming semi-detached home with character and space. Recently renovated with quality upgrades throughout.', fullDescription:'A charming 3-bedroom semi-detached home in Heston with character and modern updates. This property features recently renovated interiors, a beautiful rear garden, and excellent access to local schools and amenities. Perfect for growing families or investors.', features:['3 Bedrooms','2 Bathrooms','Garden','Updated Kitchen','Driveway','Recently Renovated'], agent:'Emma Davis', agentPhone:'+44 (0)20 7946 0961' }
]
export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  const property = properties.find((p) => p.id === parseInt(id,10))

  if (!property) {
    return (
      <div className="mx-auto mt-28 max-w-3xl px-4 text-center">
        <h1 className="text-3xl font-bold">Property Not Found</h1>
        <button onClick={() => navigate('/')} className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-white">
          ← Back to Home
        </button>
      </div>
    )
  }

  const relatedProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.beds === property.beds))
    .slice(0,4)

  return (
    <div className="mx-auto w-[97%] px-4 py-8 sm:px-8 lg:px-16">

      <section className="mx-auto max-w-full rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <div className="relative h-96 sm:h-[460px]">
          <img src={property.image} alt={property.title} className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg bg-white/90 px-3 py-1 text-sm font-semibold shadow"
            >
              ← Back
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="rounded-lg bg-white/90 px-3 py-1 text-sm shadow"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="absolute bottom-6 left-6 w-[calc(100%-4rem)] text-white sm:w-[calc(100%-6rem)]">
            <span className="inline-block rounded-full bg-cyan-500/90 px-4 py-1 text-xs font-bold uppercase tracking-wider">{property.badge}</span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">{property.title}</h1>
            <p className="mt-2 text-sm sm:text-base">📍 {property.location}</p>
          </div>
        </div>

        <div className="grid gap-8 bg-white p-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900">{property.price}</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Beds', value: property.beds, icon: '🛏' },
                  { label: 'Baths', value: property.baths, icon: '🛁' },
                  { label: 'Feature', value: property.feature, icon: '⭐' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <p className="text-sm text-slate-500">{item.icon} {item.label}</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800">Description</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{property.fullDescription}</p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800">Key Features</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {property.features.map((feat) => (
                    <span key={feat} className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700">✓ {feat}</span>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Related Properties</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedProperties.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => navigate(`/property/${rel.id}`)}
                    className="group text-left overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                  >
                    <img src={rel.image} className="h-32 w-full object-cover" alt={rel.title} />
                    <div className="p-3">
                      <h4 className="font-semibold text-slate-900 group-hover:text-cyan-500">{rel.title}</h4>
                      <p className="text-sm text-slate-500">{rel.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Quick Summary</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><strong>Type:</strong> {property.type === 'rent' ? 'To Rent' : 'For Sale'}</li>
                <li><strong>Price:</strong> {property.price}</li>
                <li><strong>Location:</strong> {property.location}</li>
              </ul>
              <button className="mt-5 w-full rounded-xl bg-cyan-500 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400">Schedule Viewing 📅</button>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Contact Agent</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="text-3xl">👤</div>
                <div>
                  <p className="font-semibold text-slate-800">{property.agent}</p>
                  <p className="text-sm text-slate-600">{property.agentPhone}</p>
                </div>
              </div>
              <button className="mt-5 w-full rounded-xl bg-cyan-500 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400">Contact Now 📧</button>
            </article>
          </aside>
        </div>
      </section>
    </div>
  )
}