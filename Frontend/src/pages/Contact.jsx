import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name:'', email:'', phone:'', message:'' })

  const handleChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value})

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
        <p className="mt-3 text-slate-600">Questions? Let's help you find the right property solution.</p>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-slate-900">Our Office</h2>
          <p className="mt-4 text-slate-700">📍 166 Heston Road, London, TW5 0QU</p>
          <p className="mt-2 text-slate-700">📞 020 8570 4848</p>
          <p className="mt-2 text-slate-700">✉️ info@nestfind.co.uk</p>
          <div className="mt-4 text-sm text-slate-500">Mon–Sat 9am–6pm</div>
        </div>
        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md" onSubmit={(e)=>e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" />
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Subject" />
          </div>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Message" className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" />
          <button type="submit" className="mt-4 rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-500">Send Message</button>
        </form>
      </div>
    </div>
  )
}
