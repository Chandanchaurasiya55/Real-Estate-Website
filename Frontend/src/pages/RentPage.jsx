import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { RENT_MENU_ITEMS } from '../data/menuItems'

function getRentPageBySlug(slug) {
  return RENT_MENU_ITEMS.find((item) => item.slug === slug) || RENT_MENU_ITEMS[0]
}

const TENANT_CHECKLIST = [
  'Set your budget and move-in date',
  'Shortlist locations, transport links, and amenities',
  'Prepare documents for referencing and applications',
  'Review tenancy terms, deposits, and inventory details',
  'Confirm move-in arrangements and utilities',
]

const COMMERCIAL_PANELS = [
  { title: 'Retail Units', text: 'Prominent shopfronts and high-footfall locations for local businesses.' },
  { title: 'Office Space', text: 'Flexible office suites for growing teams, consultants, and remote hubs.' },
  { title: 'Industrial Units', text: 'Practical warehouse and light-industrial space for operations and storage.' },
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
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0)
}

function estimateMoveInCost(monthlyRent, depositWeeks) {
  if (!monthlyRent) return 0
  const weeklyRent = monthlyRent / 4.345
  return monthlyRent + weeklyRent * depositWeeks
}

function TenantGuideTool() {
  const [doneSteps, setDoneSteps] = useState([])
  const toggleStep = (step) => setDoneSteps((prev) => (prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step]))

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Tenant Checklist</h2>
      <ul className="mt-4 space-y-2">
        {TENANT_CHECKLIST.map((step) => (
          <li key={step}>
            <button onClick={() => toggleStep(step)} className={`w-full rounded-lg px-3 py-2 text-left ${doneSteps.includes(step) ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-50 text-slate-700'}`}>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Commercial Rental Options</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {COMMERCIAL_PANELS.map((panel) => (
          <article key={panel.title} className="rounded-lg border border-slate-200 p-3">
            <h3 className="font-semibold">{panel.title}</h3>
            <p className="text-sm text-slate-600">{panel.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function FeesTool() {
  const [monthlyRent, setMonthlyRent] = useState(1600)
  const [depositWeeks, setDepositWeeks] = useState(5)
  const estimatedMoveInCost = useMemo(() => estimateMoveInCost(monthlyRent, depositWeeks), [monthlyRent, depositWeeks])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Fees & Move-In Estimate</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Monthly Rent
          <input type="number" min="500" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Deposit Weeks
          <input type="number" min="1" max="10" value={depositWeeks} onChange={(e) => setDepositWeeks(Number(e.target.value))} className="rounded-lg border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {FEE_ITEMS.map((item) => (
          <li key={item.label} className="flex justify-between border-b border-slate-200 pb-2"> <span>{item.label}</span> <strong>{item.value}</strong></li>
        ))}
      </ul>
      <p className="mt-3 text-sm font-semibold">Estimated move-in cost: {formatCurrency(estimatedMoveInCost)}</p>
    </div>
  )
}

function ReviewsTool() {
  const average = (REVIEW_SAMPLE.reduce((sum, review) => sum + review.rating, 0) / REVIEW_SAMPLE.length).toFixed(1)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Tenant Reviews</h2>
      <p className="mt-2 text-sm">Average Rating: {average} / 5</p>
      <div className="mt-4 space-y-3">
        {REVIEW_SAMPLE.map((review) => (
          <article key={review.name} className="rounded-lg border border-slate-200 p-3">
            <h3 className="font-semibold">{review.name}</h3>
            <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            <small className="text-slate-600">{review.note}</small>
          </article>
        ))}
      </div>
    </div>
  )
}

function getPageTool(slug) {
  if (slug === 'commercial-properties') return <CommercialTool />
  if (slug === 'tenants-guide') return <TenantGuideTool />
  if (slug === 'tenants-fees-terms') return <FeesTool />
  if (slug === 'renting-reviews') return <ReviewsTool />
  return <TenantGuideTool />
}

export default function RentPage() {
  const { slug } = useParams()
  const pageData = getRentPageBySlug(slug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-2xl bg-linear-to-r from-cyan-500 to-emerald-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">{pageData.title}</h1>
        <p className="mt-3 max-w-3xl text-lg">{pageData.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">{getPageTool(slug)}</div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">More Guides</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {RENT_MENU_ITEMS.map((item) => (
                <li key={item.slug}>
                  <Link className="text-cyan-600 hover:text-cyan-700" to={`/rent/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Need Help?</h2>
            <p className="mt-2 text-sm text-slate-600">Contact our lettings team for personalised advice.</p>
            <button className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  )
}
