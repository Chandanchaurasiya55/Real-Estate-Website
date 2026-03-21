import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import '../styles/RentPage.css'

export const RENT_MENU_ITEMS = [
  {
    slug: 'properties-to-let',
    title: 'Properties To Let',
    description: 'Browse rental homes and apartments across the areas you want to live in.',
  },
  {
    slug: 'commercial-properties',
    title: 'Commercial Properties',
    description: 'Explore retail, office, and mixed-use spaces available for lease.',
  },
  {
    slug: 'tenants-guide',
    title: 'Tenants Guide',
    description: 'Learn what to expect when renting, from applications to moving in.',
  },
  {
    slug: 'tenants-fees-terms',
    title: 'Tenants Fees & Terms',
    description: 'Understand deposits, fees, tenancy terms, and what you are paying for.',
  },
  {
    slug: 'renting-reviews',
    title: 'Renting Reviews',
    description: 'See what tenants say about the rental process and local support.',
  },
]

export function getRentPageBySlug(slug) {
  return RENT_MENU_ITEMS.find((item) => item.slug === slug)
}

const TENANT_CHECKLIST = [
  'Set your budget and move-in date',
  'Shortlist locations, transport links, and amenities',
  'Prepare documents for referencing and applications',
  'Review tenancy terms, deposits, and inventory details',
  'Confirm move-in arrangements and utilities',
]

const COMMERCIAL_PANELS = [
  {
    title: 'Retail Units',
    text: 'Prominent shopfronts and high-footfall locations for local businesses.',
  },
  {
    title: 'Office Space',
    text: 'Flexible office suites for growing teams, consultants, and remote hubs.',
  },
  {
    title: 'Industrial Units',
    text: 'Practical warehouse and light-industrial space for operations and storage.',
  },
]

const REVIEW_SAMPLE = [
  { name: 'Daniel P.', rating: 5, note: 'Clear viewing process and fast communication from the lettings team.' },
  { name: 'Priya S.', rating: 4, note: 'Helpful guidance on documents, deposits, and move-in timing.' },
  { name: 'Hassan M.', rating: 5, note: 'Straightforward tenancy terms and a smooth handover.' },
]

const FEE_ITEMS = [
  { label: 'Holding Deposit', value: 'Up to 1 week rent' },
  { label: 'Security Deposit', value: 'Up to 5 weeks rent' },
  { label: 'Rent in Advance', value: '1 month or as agreed' },
  { label: 'Late Payment / Lost Key Fees', value: 'Subject to tenancy terms' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

function estimateMoveInCost(monthlyRent, depositWeeks) {
  if (!monthlyRent) {
    return 0
  }

  const weeklyRent = monthlyRent / 4.345
  const deposit = weeklyRent * depositWeeks
  return monthlyRent + deposit
}

function TenantGuideTool() {
  const [doneSteps, setDoneSteps] = useState([])

  function toggleStep(step) {
    setDoneSteps((prev) =>
      prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step],
    )
  }

  return (
    <div className="rent-tool-card">
      <h2>Tenant Checklist</h2>
      <ul className="rent-checklist">
        {TENANT_CHECKLIST.map((step) => (
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

function CommercialTool() {
  return (
    <div className="rent-tool-card">
      <h2>Commercial Rental Options</h2>
      <div className="rent-feature-grid">
        {COMMERCIAL_PANELS.map((panel) => (
          <article key={panel.title}>
            <h3>{panel.title}</h3>
            <p>{panel.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function FeesTool() {
  const [monthlyRent, setMonthlyRent] = useState(1600)
  const [depositWeeks, setDepositWeeks] = useState(5)
  const estimatedMoveInCost = useMemo(
    () => estimateMoveInCost(monthlyRent, depositWeeks),
    [monthlyRent, depositWeeks],
  )

  return (
    <div className="rent-tool-card">
      <h2>Fees & Move-In Estimate</h2>
      <div className="rent-tool-grid">
        <label>
          Monthly Rent
          <input type="number" min="500" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
        </label>
        <label>
          Deposit Weeks
          <input type="number" min="1" max="10" value={depositWeeks} onChange={(e) => setDepositWeeks(Number(e.target.value))} />
        </label>
      </div>
      <ul className="rent-fee-list">
        {FEE_ITEMS.map((item) => (
          <li key={item.label}>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
      <p className="rent-tool-result">Estimated move-in cost: {formatCurrency(estimatedMoveInCost)}</p>
    </div>
  )
}

function ReviewsTool() {
  const average = (
    REVIEW_SAMPLE.reduce((sum, review) => sum + review.rating, 0) / REVIEW_SAMPLE.length
  ).toFixed(1)

  return (
    <div className="rent-tool-card">
      <h2>Tenant Reviews</h2>
      <p className="rent-tool-result">Average Rating: {average} / 5</p>
      <div className="rent-reviews-grid">
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
  if (slug === 'commercial-properties') {
    return <CommercialTool />
  }
  if (slug === 'tenants-guide') {
    return <TenantGuideTool />
  }
  if (slug === 'tenants-fees-terms') {
    return <FeesTool />
  }
  if (slug === 'renting-reviews') {
    return <ReviewsTool />
  }
  return null
}

export default function RentPage() {
  const { slug } = useParams()
  const page = getRentPageBySlug(slug)

  if (!page) {
    return (
      <main className="rent-page">
        <div className="rent-page-shell">
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist in the Rent section.</p>
          <Link className="rent-page-back" to="/rent">
            Back to Rent
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="rent-page">
      <div className="rent-page-shell">
        <section className="rent-page-hero">
          <p className="rent-page-eyebrow">Rent</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="rent-page-actions">
            <Link className="rent-page-back" to="/rent">
              Properties To Let
            </Link>
            <Link className="rent-page-muted" to="/contact">
              Contact Lettings Team
            </Link>
          </div>
        </section>
        {getPageTool(slug)}
      </div>
    </main>
  )
}
