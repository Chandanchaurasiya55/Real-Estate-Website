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
