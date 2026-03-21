import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import '../styles/BuyPage.css'

export const BUY_MENU_ITEMS = [
  {
    slug: 'properties-for-sale',
    title: 'Properties For Sale',
    description: 'Browse homes available to purchase in your preferred locations and price range.',
  },
  {
    slug: 'land-and-new-homes',
    title: 'Land and New Homes',
    description: 'Explore development plots and newly built homes with modern amenities.',
  },
  {
    slug: 'buyers-guide',
    title: 'Buyers Guide',
    description: 'Step-by-step guidance for first-time and experienced buyers.',
  },
  {
    slug: 'buying-reviews',
    title: 'Buying Reviews',
    description: 'Read buyer experiences and insights before making your decision.',
  },
  {
    slug: 'mortgages',
    title: 'Mortgages',
    description: 'Understand mortgage options, terms, and what fits your budget.',
  },
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Estimate monthly mortgage repayments based on amount and duration.',
  },
  {
    slug: 'stamp-duty-calculator',
    title: 'Stamp Duty Calculator',
    description: 'Calculate expected stamp duty costs for your property purchase.',
  },
]

export function getBuyPageBySlug(slug) {
  return BUY_MENU_ITEMS.find((item) => item.slug === slug)
}

const GUIDE_STEPS = [
  'Define budget and agreement in principle',
  'Shortlist neighbourhoods and property type',
  'Book viewings and compare local market value',
  'Make offer and start legal checks',
  'Complete surveys, mortgage and exchange contracts',
]

const REVIEW_SAMPLE = [
  { name: 'Aisha R.', rating: 5, note: 'Clear communication and fast process from shortlist to completion.' },
  { name: 'Omar K.', rating: 4, note: 'Great property options and honest advice for first-time buyers.' },
  { name: 'Mia D.', rating: 5, note: 'Mortgage guidance and legal coordination saved us a lot of time.' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

function calculateMortgage(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12
  const totalPayments = years * 12

  if (!principal || !annualRate || !years) {
    return 0
  }

  if (monthlyRate === 0) {
    return principal / totalPayments
  }

  return (principal * monthlyRate * (1 + monthlyRate) ** totalPayments) / ((1 + monthlyRate) ** totalPayments - 1)
}

function calculateStampDuty(price) {
  if (!price || price <= 250000) {
    return 0
  }

  const bands = [
    { threshold: 250000, rate: 0 },
    { threshold: 925000, rate: 0.05 },
    { threshold: 1500000, rate: 0.1 },
    { threshold: Infinity, rate: 0.12 },
  ]

  let tax = 0
  let previousThreshold = 0

  for (const band of bands) {
    const taxableInBand = Math.min(price, band.threshold) - previousThreshold
    if (taxableInBand > 0) {
      tax += taxableInBand * band.rate
    }
    previousThreshold = band.threshold
    if (price <= band.threshold) {
      break
    }
  }

  return tax
}

function MortgageTool() {
  const [amount, setAmount] = useState(350000)
  const [rate, setRate] = useState(4.6)
  const [years, setYears] = useState(25)

  const monthlyPayment = useMemo(() => calculateMortgage(amount, rate, years), [amount, rate, years])

  return (
    <div className="buy-tool-card">
      <h2>Mortgage Estimator</h2>
      <div className="buy-tool-grid">
        <label>
          Loan Amount
          <input type="number" min="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <label>
          Interest Rate (%)
          <input type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label>
          Term (Years)
          <input type="number" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </label>
      </div>
      <p className="buy-tool-result">Estimated Monthly Payment: {formatCurrency(monthlyPayment)}</p>
    </div>
  )
}

function StampDutyTool() {
  const [price, setPrice] = useState(450000)
  const tax = useMemo(() => calculateStampDuty(price), [price])

  return (
    <div className="buy-tool-card">
      <h2>Stamp Duty Estimator</h2>
      <div className="buy-tool-grid single">
        <label>
          Property Price
          <input type="number" min="50000" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
      </div>
      <p className="buy-tool-result">Estimated Stamp Duty: {formatCurrency(tax)}</p>
    </div>
  )
}

function BuyersGuideTool() {
  const [doneSteps, setDoneSteps] = useState([])

  function toggleStep(step) {
    setDoneSteps((prev) =>
      prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step],
    )
  }

  return (
    <div className="buy-tool-card">
      <h2>Buyer Checklist</h2>
      <ul className="buy-checklist">
        {GUIDE_STEPS.map((step) => (
          <li key={step}>
            <button
              type="button"
              className={doneSteps.includes(step) ? 'checked' : ''}
              onClick={() => toggleStep(step)}
            >
              {doneSteps.includes(step) ? '✔' : '○'} {step}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReviewsTool() {
  const average = (
    REVIEW_SAMPLE.reduce((sum, review) => sum + review.rating, 0) / REVIEW_SAMPLE.length
  ).toFixed(1)

  return (
    <div className="buy-tool-card">
      <h2>Verified Buyer Reviews</h2>
      <p className="buy-tool-result">Average Rating: {average} / 5</p>
      <div className="buy-reviews-grid">
        {REVIEW_SAMPLE.map((review) => (
          <article key={review.name}>
            <h3>{review.name}</h3>
            <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            <small>{review.note}</small>
          </article>
        ))}
      </div>
    </div>
  )
}

function getPageTool(slug) {
  if (slug === 'mortgage-calculator') {
    return <MortgageTool />
  }
  if (slug === 'stamp-duty-calculator') {
    return <StampDutyTool />
  }
  if (slug === 'buyers-guide') {
    return <BuyersGuideTool />
  }
  if (slug === 'buying-reviews') {
    return <ReviewsTool />
  }
  return null
}

export default function BuyPage() {
  const { slug } = useParams()
  const page = getBuyPageBySlug(slug)

  if (!page) {
    return (
      <main className="buy-page">
        <div className="buy-page-shell">
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist in the Buy section.</p>
          <Link className="buy-page-back" to="/properties">
            Back to Properties
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="buy-page">
      <div className="buy-page-shell">
        <section className="buy-page-hero">
          <p className="buy-page-eyebrow">Buy</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="buy-page-actions">
            <Link className="buy-page-back" to="/properties">
              Explore Properties
            </Link>
            <Link className="buy-page-muted" to="/contact">
              Contact Advisor
            </Link>
          </div>
        </section>
        {getPageTool(slug)}
      </div>
    </main>
  )
}
