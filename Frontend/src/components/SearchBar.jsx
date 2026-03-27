export default function SearchBar() {
  return (
    <div className="mx-auto mt-3.5 w-[95%] max-w-6xl rounded-2xl flex justify-center items-center border p-4 md:p-6">
      <form className="grid gap-4 md:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Location</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200" type="text" placeholder="City, area or postcode..." />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Property Type</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200">
            <option>Any Type</option>
            <option>House</option>
            <option>Flat / Apartment</option>
            <option>Bungalow</option>
            <option>Commercial</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Listing Type</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200">
            <option>Buy or Rent</option>
            <option>For Sale</option>
            <option>To Rent</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Max Price</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200">
            <option>No Limit</option>
            <option>�200,000</option>
            <option>�400,000</option>
            <option>�600,000</option>
            <option>�1,000,000+</option>
          </select>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <button type="submit" className="h-12 w-full max-w-xs rounded-lg bg-cyan-500 px-5 font-bold text-white hover:bg-cyan-500">Search</button>
        </div>
      </form>
    </div>
  )
}
