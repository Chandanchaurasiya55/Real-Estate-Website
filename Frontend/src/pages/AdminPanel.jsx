import { useEffect, useRef, useState } from 'react';

const TAB_OPTIONS = ['dashboard', 'properties', 'users'];

const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  properties: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  logout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  add: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  trash: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  upload: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
};

function AdminPanel() {
  const API_URL = import.meta.env.VITE_API_URL;
  const rawUser = localStorage.getItem('user');
  let user = null;
  try { if (rawUser) user = JSON.parse(rawUser); } catch { user = null; }

  const name = user?.name || user?.email?.split('@')[0] || 'Admin';
  const isAdmin = (user?.role || 'admin').toString().toLowerCase() === 'admin';

  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const [form, setForm] = useState({
    title: '', description: '', type: 'sale', location: '',
    price: '', area: '', bedrooms: '', bathrooms: '', coverImage: null, images: [],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'properties') getProperties();
    else if (activeTab === 'users') getUsers();
  }, [activeTab]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6f3] p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Access denied</h2>
          <p className="mt-2 text-sm text-slate-600">Yeh page sirf admin ke liye hai.</p>
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => window.location.href = '/profile'} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm font-semibold transition-colors">Profile</button>
            <button onClick={() => window.location.href = '/'} className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200 text-sm font-medium transition-colors">Home</button>
          </div>
        </div>
      </div>
    );
  }

  const getProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch { setMessage('Failed to load properties'); }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/users`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch { setMessage('Failed to load users'); }
  };

  const fileToDataURL = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

  const dataURLSizeBytes = (dataURL) => {
    if (!dataURL || !dataURL.includes(',')) return 0;
    return Math.ceil(((dataURL.split(',')[1] || '').length * 3) / 4);
  };

  const compressImage = async (file) => {
    const fileData = await fileToDataURL(file);
    if (!fileData) return null;
    const attemptCompress = (img, quality, maxWidth) => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', quality);
    };
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          let maxWidth = 1600, quality = 0.92;
          let compressed = attemptCompress(img, quality, maxWidth);
          let size = dataURLSizeBytes(compressed);
          while (size > 800000 && quality >= 0.7) {
            quality -= 0.05;
            compressed = attemptCompress(img, quality, maxWidth);
            size = dataURLSizeBytes(compressed);
            if (quality <= 0.7 && maxWidth > 1200) maxWidth = 1200;
          }
          resolve(size < 250000 ? fileData : compressed || fileData);
        } catch { resolve(fileData); }
      };
      img.onerror = () => resolve(fileData);
      img.src = fileData;
    });
  };

  const handleCoverFile = async (file) => {
    try {
      const data = await compressImage(file);
      setForm(prev => ({ ...prev, coverImage: data }));
      setMessage(`Cover image selected: ${file.name}`);
    } catch { setMessage('Failed to process cover image'); }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    if (!files.length) return;
    const items = [];
    for (const file of files) {
      try {
        const data = await compressImage(file);
        if (data) items.push({ filename: file.name, contentType: file.type, data });
      } catch {}
    }
    setForm(prev => ({ ...prev, images: items }));
    setMessage(`${items.length} image(s) selected`);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    if (!form.coverImage && (!Array.isArray(form.images) || !form.images.length)) {
      setMessage('Please select a cover image or at least one gallery image.');
      return;
    }
    const outgoingCover = form.coverImage ? (form.coverImage.data || form.coverImage) : '';
    const outgoingImages = Array.isArray(form.images)
      ? form.images.map(img => ({ filename: img.filename || '', contentType: img.contentType || 'image/jpeg', data: img.data || '' })).filter(img => img.data)
      : [];
    try {
      const res = await fetch(`${API_URL}/api/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description, type: form.type,
          location: form.location, price: Number(form.price), area: Number(form.area),
          bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms),
          coverImage: outgoingCover, images: outgoingImages,
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Failed to create property');
      setMessage(resData.message || 'Property created successfully');
      setForm({ title: '', description: '', type: 'sale', location: '', price: '', area: '', bedrooms: '', bathrooms: '', coverImage: '', images: [] });
      if (coverInputRef.current) coverInputRef.current.value = '';
      if (imagesInputRef.current) imagesInputRef.current.value = '';
      getProperties();
      setTimeout(() => setMessage(''), 3500);
    } catch (error) { setMessage(error.message); }
  };

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Delete failed'); }
      setMessage('Property deleted');
      getProperties();
    } catch (error) { setMessage(error.message); }
  };

  const tabLabel = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  const inputCls = "w-full bg-[#fafafa] border border-[#e8e8e8] rounded-[10px] px-[14px] py-[10px] text-sm text-[#1a1a1a] outline-none focus:border-blue-600 focus:bg-white transition-all font-sans";
  const labelCls = "text-xs font-semibold text-[#666]";

  return (
    <div className="flex min-h-screen bg-[#f7f6f3] text-[#1a1a1a]">

      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] z-10 bg-white border-r border-[#ebebeb] px-5 py-8 overflow-y-auto">

        {/* Logo & greeting */}
        <div className="text-[22px] font-bold text-[#1a1a1a] tracking-tight mb-1">Admin</div>
        <div className="text-xs text-[#999] font-normal mb-9">Welcome back, {name}</div>

        {/* Mini stats */}
        <div className="bg-[#fafafa] border border-[#ebebeb] rounded-xl px-4 py-3 mb-2">
          <p className="text-[11px] text-[#aaa] uppercase tracking-wide mb-1">Properties</p>
          <p className="text-[22px] font-semibold text-[#1a1a1a]">{properties.length || 0}</p>
        </div>
        <div className="bg-[#fafafa] border border-[#ebebeb] rounded-xl px-4 py-3 mb-6">
          <p className="text-[11px] text-[#aaa] uppercase tracking-wide mb-1">Users</p>
          <p className="text-[22px] font-semibold text-[#1a1a1a]">{users.length || 0}</p>
        </div>

        {/* Nav label */}
        <div className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#bbb] pl-3 mb-2.5">Navigation</div>

        {/* Nav buttons */}
        <nav className="flex flex-col gap-0.5">
          {TAB_OPTIONS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium text-left transition-all border-none cursor-pointer
                ${activeTab === tab
                  ? 'bg-[#f0f5ff] text-blue-600 [&_svg]:stroke-blue-600'
                  : 'bg-transparent text-[#666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]'
                }`}
            >
              {icons[tab]}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Logout pushed to bottom */}
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 w-full px-3 py-2.5 rounded-[10px] border border-[#fee2e2] bg-white text-red-500 text-[13px] font-medium hover:bg-red-50 transition-all cursor-pointer"
        >
          {icons.logout} Sign out
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 lg:ml-60 px-6 lg:px-10 py-9 min-h-[calc(100vh-4rem)]">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] font-bold text-[#1a1a1a] tracking-tight">{tabLabel}</h1>
          <span className="bg-[#f0f5ff] text-blue-600 text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide">Admin Panel</span>
        </div>

        {/* Message banner */}
        {message && (
          <div className="flex items-center gap-2.5 bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] rounded-[10px] px-4 py-3 text-[13px] mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {message}
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

              {/* Properties stat */}
              <div className="relative bg-white border border-[#ebebeb] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-blue-500 to-blue-300" />
                <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#aaa] mb-2.5">Total Properties</div>
                <div className="text-[36px] font-semibold text-[#1a1a1a] leading-none">{properties.length || 0}</div>
              </div>

              {/* Users stat */}
              <div className="relative bg-white border border-[#ebebeb] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-amber-400 to-yellow-300" />
                <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#aaa] mb-2.5">Total Users</div>
                <div className="text-[36px] font-semibold text-[#1a1a1a] leading-none">{users.length || 0}</div>
              </div>

              {/* Server status */}
              <div className="relative bg-white border border-[#ebebeb] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-emerald-500 to-teal-300" />
                <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#aaa] mb-2.5">Server Status</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 text-base font-semibold">Online</span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="text-[15px] font-semibold text-[#1a1a1a] mb-5">Quick Actions</div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setActiveTab('properties')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
                >
                  {icons.add} Add Property
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className="flex items-center gap-2 bg-[#f0f5ff] hover:bg-blue-100 text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
                >
                  {icons.users} View Users
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── PROPERTIES ── */}
        {activeTab === 'properties' && (
          <div>
            {/* Add property form */}
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
              <div className="flex items-center gap-2 text-[15px] font-semibold text-[#1a1a1a] mb-5">
                {icons.add} Add New Property
              </div>

              <form onSubmit={handleCreateProperty}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {[
                    { name: 'title',     label: 'Property Title', placeholder: 'e.g. Modern 2BHK Flat' },
                    { name: 'location',  label: 'Location',       placeholder: 'e.g. Agra, UP' },
                    { name: 'price',     label: 'Price (£)',      placeholder: '0' },
                    { name: 'area',      label: 'Area (sq ft)',   placeholder: '0' },
                    { name: 'bedrooms',  label: 'Bedrooms',       placeholder: '0' },
                    { name: 'bathrooms', label: 'Bathrooms',      placeholder: '0' },
                  ].map(field => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label className={labelCls}>{field.label}</label>
                      <input
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleInput}
                        placeholder={field.placeholder}
                        className={inputCls}
                        required
                      />
                    </div>
                  ))}

                  {/* Listing type */}
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Listing Type</label>
                    <select name="type" value={form.type} onChange={handleInput} className={inputCls}>
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>

                  {/* Description - full width */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className={labelCls}>Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInput}
                      rows={3}
                      placeholder="Describe the property..."
                      className={inputCls + ' resize-y min-h-[90px]'}
                      required
                    />
                  </div>

                  {/* Cover image upload - full width */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className={labelCls}>Cover Image</label>
                    <label className="relative flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#d0d0d0] rounded-xl p-5 bg-[#fafafa] cursor-pointer hover:border-blue-500 hover:bg-[#f0f5ff] transition-all group">
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverFile(f); }}
                      />
                      <span className="text-[#aaa] group-hover:text-blue-500 transition-colors">{icons.upload}</span>
                      <span className="text-[13px] text-[#888]">
                        {form.coverImage
                          ? <span className="text-emerald-600 font-semibold">✓ Cover image selected</span>
                          : <><span className="text-blue-600 font-semibold">Click to upload</span> cover image</>
                        }
                      </span>
                    </label>
                  </div>

                  {/* Gallery upload - full width */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className={labelCls}>Gallery Photos (max 10)</label>
                    <label className="relative flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#d0d0d0] rounded-xl p-5 bg-[#fafafa] cursor-pointer hover:border-blue-500 hover:bg-[#f0f5ff] transition-all group">
                      <input
                        ref={imagesInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={handleFileChange}
                      />
                      <span className="text-[#aaa] group-hover:text-blue-500 transition-colors">{icons.upload}</span>
                      <span className="text-[13px] text-[#888]">
                        {form.images.length > 0
                          ? <span className="text-emerald-600 font-semibold">✓ {form.images.length} image(s) selected</span>
                          : <><span className="text-blue-600 font-semibold">Click to upload</span> gallery images</>
                        }
                      </span>
                    </label>
                  </div>

                  {/* Submit - full width */}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold px-6 py-3 rounded-[10px] transition-all cursor-pointer border-none mt-1"
                    >
                      {icons.add} Add Property
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Property list */}
            <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
              <div className="flex items-center gap-2 text-[15px] font-semibold text-[#1a1a1a] mb-5">
                {icons.properties} All Properties ({properties.length})
              </div>

              {properties.length === 0 ? (
                <div className="text-center py-10 text-[#bbb] text-[13px]">No properties added yet.</div>
              ) : (
                <div className="flex flex-col gap-2">
                  {properties.map(p => (
                    <div key={p._id} className="flex items-center justify-between gap-4 px-4 py-3.5 border border-[#f0f0f0] rounded-xl hover:border-[#ddd] hover:bg-[#fafafa] transition-all">
                      <div>
                        <div className="text-[14px] font-semibold text-[#1a1a1a] mb-1">{p.title}</div>
                        <div className="flex items-center gap-2 text-[12px] text-[#999]">
                          <span>{p.location}</span>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#ccc]" />
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            p.type === 'sale' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>{p.type}</span>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#ccc]" />
                          <span className="font-semibold text-[#1a1a1a]">£{p.price?.toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteProperty(p._id)}
                        className="flex items-center gap-1.5 bg-transparent border border-[#fecaca] text-red-400 hover:bg-red-50 hover:border-red-400 hover:text-red-500 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer shrink-0"
                      >
                        {icons.trash} Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {activeTab === 'users' && (
          <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-[#1a1a1a] mb-5">
              {icons.users} All Users ({users.length})
            </div>

            {users.length === 0 ? (
              <div className="text-center py-10 text-[#bbb] text-[13px]">No users yet.</div>
            ) : (
              <div className="flex flex-col gap-2">
                {users.map(u => (
                  <div key={u._id} className="flex items-center gap-3.5 px-4 py-3.5 border border-[#f0f0f0] rounded-xl hover:border-[#ddd] transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-[15px] font-bold text-blue-600 shrink-0">
                      {(u.name || u.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#1a1a1a] truncate">{u.name || 'Unnamed'}</div>
                      <div className="text-[12px] text-[#999] truncate">{u.email}</div>
                    </div>
                    <span className="text-[12px] text-[#bbb] shrink-0">{u.phone || 'N/A'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;