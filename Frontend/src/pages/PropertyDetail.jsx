import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function PropertyDetail() {
  const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3000'
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [coverImage, setCoverImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [imagesLoaded, setImagesLoaded] = useState(false)

  const defaultImage = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#CBD5E1" />
      <text x="50%" y="50%" text-anchor="middle" fill="#64748B" font-size="36" font-family="Arial, sans-serif" dy="0.35em">No Image Available</text>
    </svg>
  `)

  const getImageSrc = (img, fallbackId) => {
    if (fallbackId) return `${API_URL}/api/properties/images/${fallbackId}`
    if (!img) return defaultImage
    if (typeof img === 'string') {
      if (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) {
        return img
      }
      return defaultImage
    }
    if (img.fileId) {
      return `${API_URL}/api/properties/images/${img.fileId}`
    }
    if (img.externalUrl) {
      return img.externalUrl
    }
    if (img.url) {
      if (img.url.startsWith('data:') || img.url.startsWith('http://') || img.url.startsWith('https://') || img.url.startsWith('/')) {
        return img.url
      }
    }
    const data = img.data || ''
    if (data.startsWith('data:') || data.startsWith('http://') || data.startsWith('https://')) {
      return data
    }
    return defaultImage
  }

  const preloadImage = (src) => new Promise((resolve) => {
    if (!src) return resolve()
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })

  const prefetchImages = async (propertyData) => {
    const cover = getImageSrc(propertyData.coverImage, propertyData.coverImageId)
    const gallery = (propertyData.images || []).map((img) => getImageSrc(img))
    const imageUrls = [cover, ...gallery].filter((src) => src && src !== defaultImage)
    if (!imageUrls.length) {
      setImagesLoaded(true)
      return
    }
    await Promise.all(imageUrls.map(preloadImage))
    setImagesLoaded(true)
  }

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_URL}/api/properties/${id}`)
        if (!res.ok) throw new Error('Property not found')
        const data = await res.json()
        setProperty(data.property)
        prefetchImages(data.property)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id, API_URL])

  if (loading || !imagesLoaded) {
    return <div className='mx-auto mt-28 max-w-3xl px-4 text-center'>Loading property images...</div>
  }

  if (error || !property) {
    return (
      <div className='mx-auto mt-28 max-w-3xl px-4 text-center'>
        <h1 className='text-3xl font-bold'>{error || 'Property Not Found'}</h1>
        <button onClick={() => navigate('/')} className='mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-white'>
          ? Back to Home
        </button>
      </div>
    )
  }

  const preferredCover = coverImage || getImageSrc(property.coverImage, property.coverImageId) || getImageSrc(property.images?.[0]) || defaultImage
  const highResCover = preferredCover.startsWith('http') ? `${preferredCover}?dpr=2` : preferredCover

  return (
    <div className='mx-auto w-[97%] px-4 py-8 sm:px-8 lg:px-16'>
      <section className='relative mx-auto max-w-full rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden'>
        <div className='relative h-96 sm:h-[460px]'>
          <img
            src={preferredCover}
            srcSet={highResCover}
            alt={property.title}
            className='h-full w-full object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent' />

          <div className='absolute left-4 top-4 flex gap-2'>
            <button onClick={() => navigate('/')} className='rounded-lg bg-white/90 px-3 py-1 text-sm font-semibold shadow'>Back</button>
          </div>
          <div className='absolute bottom-6 left-6 w-[calc(100%-4rem)] text-white sm:w-[calc(100%-6rem)]'>
            <span className='inline-block rounded-full bg-cyan-500/90 px-4 py-1 text-xs font-bold uppercase tracking-wider'>{property.type === 'rent' ? 'To Rent' : 'For Sale'}</span>
            <h1 className='mt-3 text-4xl font-extrabold leading-tight sm:text-5xl'>{property.title}</h1>
            <p className='mt-2 text-sm sm:text-base'>{property.location}</p>
          </div>
        </div>

        <div className='bg-white p-6'>
          <div className='mb-4 flex gap-2 overflow-x-auto pb-2'>
            {([getImageSrc(property.coverImage, property.coverImageId), ...(property.images || []).map((img) => getImageSrc(img))]).filter((src) => src && src !== defaultImage).slice(0, 10).map((imgSrc, idx) => (
              <img key={idx} src={imgSrc} alt={`thumb-${idx}`} className='h-20 w-28 cursor-pointer rounded-lg object-cover' onClick={() => setCoverImage(imgSrc)} />
            ))}
          </div>
        </div>
      </section>

      <div className='grid gap-8 bg-white p-6 lg:grid-cols-3 mt-6 rounded-3xl border border-slate-200 shadow-sm'>
        <div className='lg:col-span-2 space-y-6'>
          <article className='rounded-2xl border border-slate-200 p-6 shadow-sm'>
            <h2 className='text-3xl font-bold text-slate-900'>£{property.price}</h2>
            <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3'>
              <div className='rounded-xl border border-slate-100 bg-slate-50 p-4 text-center'>
                <p className='text-sm text-slate-500'>Beds</p>
                <p className='mt-1 text-xl font-bold text-slate-900'>{property.bedrooms}</p>
              </div>
              <div className='rounded-xl border border-slate-100 bg-slate-50 p-4 text-center'>
                <p className='text-sm text-slate-500'>Baths</p>
                <p className='mt-1 text-xl font-bold text-slate-900'>{property.bathrooms}</p>
              </div>
              <div className='rounded-xl border border-slate-100 bg-slate-50 p-4 text-center'>
                <p className='text-sm text-slate-500'>Area</p>
                <p className='mt-1 text-xl font-bold text-slate-900'>{property.area}</p>
              </div>
            </div>
            <div className='mt-6'>
              <h3 className='text-lg font-semibold text-slate-800'>Description</h3>
              <p className='mt-3 text-slate-600 leading-relaxed break-words whitespace-pre-line'>{property.description}</p>
            </div>
          </article>
        </div>
        <aside className='space-y-4'>
          <article className='rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm'>
            <h3 className='text-lg font-bold text-slate-900'>Quick Summary</h3>
            <ul className='mt-3 space-y-2 text-sm text-slate-600'>
              <li><strong>Type:</strong> {property.type === 'rent' ? 'Rent' : 'Sale'}</li>
              <li><strong>Price:</strong> £{property.price}</li>
              <li><strong>Location:</strong> {property.location}</li>
            </ul>
          </article>
        </aside>
      </div>
    </div>
  )
}
