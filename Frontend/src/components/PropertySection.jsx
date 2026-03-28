import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'

export default function PropertySection({ compact = false, ctaText = 'View All Properties' }) {
  const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.API_URL || '').replace(/\/+$/, '')
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const fetchProperties = async () => {
      if (!mounted) return
      try {
        const apiUrl = API_URL ? `${API_URL}/api/properties` : '/api/properties'
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error(`Unable to fetch properties from ${apiUrl}`)
        const data = await res.json()
        if (!mounted) return
        setProperties(data.properties || [])
      } catch (err) {
        if (!mounted) return
        console.error(err)
        setError('Could not load properties.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProperties()
    const intervalId = setInterval(fetchProperties, 1000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [])

  return (
    <section id='properties' className='pt-24 pb-20'>
      {!compact && (
        <div className='mx-auto mb-10 max-w-3xl text-center'>
          <span className='block text-sm font-semibold uppercase tracking-widest text-cyan-500'>Latest Listings</span>
          <h2 className='mt-3 text-3xl font-bold text-slate-900'>Featured Properties</h2>
          <p className='mx-auto mt-4 text-slate-600'>Hand-picked homes from our latest listings across London and the surrounding areas.</p>
        </div>
      )}

      {loading ? (
        <div className='text-center text-slate-500'>Loading properties...</div>
      ) : error ? (
        <div className='text-center text-red-500'>{error}</div>
      ) : (
        <div className='mx-5 grid max-w-[100%] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {properties.map((prop) => (
            <PropertyCard key={prop._id} property={prop} />
          ))}
        </div>
      )}

      {!compact && (
        <div className='mt-10 text-center'>
          <Link className='inline-flex rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500' to='/properties'>
            {ctaText}
          </Link>
        </div>
      )}
    </section>
  )
}
