import { useEffect, useRef, useState } from 'react';

const TAB_OPTIONS = ['dashboard', 'properties', 'users'];

function AdminPanel() {
  const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3000';
  const rawUser = localStorage.getItem('user');
  let user = null;
  try {
    if (rawUser) user = JSON.parse(rawUser);
  } catch {
    user = null;
  }

  const name = user?.name || user?.email?.split('@')[0] || 'Admin';
  const isAdmin = (user?.role || 'admin').toString().toLowerCase() === 'admin';

  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'sale',
    location: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    coverImage: null,
    images: [],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'properties') {
      getProperties();
    } else if (activeTab === 'users') {
      getUsers();
    }
  }, [activeTab]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  if (!isAdmin) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-100 p-6'>
        <div className='w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-lg'>
          <h2 className='text-2xl font-bold text-red-600'>Access denied</h2>
          <p className='mt-2 text-sm text-slate-600'>Yeh page sirf admin ke liye hai. Kripya profile ya login page par jayen.</p>
          <div className='mt-4 flex justify-center gap-2'>
            <button onClick={() => window.location.href = '/profile'} className='rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600'>Profile</button>
            <button onClick={() => window.location.href = '/'} className='rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300'>Home</button>
          </div>
        </div>
      </div>
    )
  }

  const getProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error(error);
      setMessage('Failed to load properties');
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/users`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error(error);
      setMessage('Failed to load users');
    }
  };

  const fileToDataURL = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

  const dataURLSizeBytes = (dataURL) => {
    if (!dataURL || !dataURL.includes(',')) return 0;
    const base64 = dataURL.split(',')[1] || '';
    return Math.ceil((base64.length * 3) / 4);
  };

  const compressImage = async (file) => {
    const fileData = await fileToDataURL(file);
    if (!fileData) return null;

    const attemptCompress = (img, quality, maxWidth) => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', quality);
    };

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          let maxWidth = 1600;
          let quality = 0.92;
          let compressed = attemptCompress(img, quality, maxWidth);
          let size = dataURLSizeBytes(compressed);
          while (size > 800000 && quality >= 0.7) {
            quality -= 0.05;
            compressed = attemptCompress(img, quality, maxWidth);
            size = dataURLSizeBytes(compressed);
            if (quality <= 0.7 && maxWidth > 1200) {
              maxWidth = 1200;
            }
          }
          // Prefer full resolution if aggressive compression causes quality loss
          const final = (size < 250000) ? fileData : compressed;
          resolve(final || fileData);
        } catch (err) {
          resolve(err.fileData);
        }
      };
      img.onerror = () => resolve(fileData);
      img.src = fileData;
    });
  };

  const handleCoverFile = async (file) => {
    try {
      const data = await compressImage(file);
      setForm((prev) => ({ ...prev, coverImage: data }));
      setMessage(`Cover image selected: ${file.name}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to process cover image');
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    if (files.length === 0) return;
    if (files.length > 10) {
      setMessage('Can only upload up to 10 images');
      return;
    }

    const items = [];
    for (const file of files) {
      try {
        const data = await compressImage(file);
        if (data) {
          items.push({ filename: file.name, contentType: file.type, data });
        } else {
          console.warn('Skipping unprocessable file:', file.name);
        }
      } catch (err) {
        console.error('Image compress error for', file.name, err);
      }
    }

    setForm((prev) => ({ ...prev, images: items }));
    setMessage(`Selected ${items.length} image(s)`);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();

    if (!form.coverImage && (!Array.isArray(form.images) || form.images.length === 0)) {
      setMessage('Please select cover image or at least one gallery image.');
      return;
    }

    const outgoingCover = form.coverImage ? (form.coverImage.data || form.coverImage) : '';
    const outgoingImages = Array.isArray(form.images)
      ? form.images.map((img) => ({
          filename: img.filename || '',
          contentType: img.contentType || 'image/jpeg',
          data: img.data || '',
        })).filter((img) => img.data)
      : [];

    const getDocumentSize = (payload) => {
      const str = JSON.stringify(payload);
      return new Blob([str]).size;
    };

    const docSize = getDocumentSize({
      title: form.title,
      description: form.description,
      type: form.type,
      location: form.location,
      price: Number(form.price),
      area: Number(form.area),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      coverImage: outgoingCover,
      images: outgoingImages,
    });

    if (docSize > 16000000) {
      // This should not happen because API stores image files to disk and only URLs in DB.
      console.warn('Large property payload detected:', docSize);
    }

    console.log('Admin createProperty payload', {
      title: form.title,
      coverImage: outgoingCover ? outgoingCover.slice(0, 80) : '(empty)',
      imagesCount: outgoingImages.length,
      docSize,
    });

    try {
      const res = await fetch(`${API_URL}/api/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          type: form.type,
          location: form.location,
          price: Number(form.price),
          area: Number(form.area),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          coverImage: outgoingCover,
          images: outgoingImages,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || 'Failed to create property');
      }
      setMessage(resData.message || 'Property created successfully');
      setForm({ title: '', description: '', type: 'sale', location: '', price: '', area: '', bedrooms: '', bathrooms: '', coverImage: '', images: [] });
      if (coverInputRef.current) coverInputRef.current.value = '';
      if (imagesInputRef.current) imagesInputRef.current.value = '';
      getProperties();
      setTimeout(() => setMessage(''), 3500);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Delete failed');
      }
      setMessage('Property deleted');
      getProperties();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 p-6 text-slate-900'>
      <div className='mx-auto flex w-full max-w-7xl flex-col lg:flex-row gap-6'>
        <aside className='w-full lg:w-[20%] rounded-2xl border border-slate-200 bg-white p-5 shadow-md'>
          <h2 className='text-2xl font-black tracking-wide text-slate-900'>Admin Menu</h2>
          <p className='mt-1 text-sm text-slate-600'>Hello, {name}</p>
          <div className='mt-4 space-y-2'>
            <div className='rounded-lg bg-slate-800 p-3'>
              <p className='text-xs uppercase text-slate-400'>Total Properties</p>
              <p className='text-xl font-bold'>{properties.length || 0}</p>
            </div>
            <div className='rounded-lg bg-slate-800 p-3'>
              <p className='text-xs uppercase text-slate-400'>Total Users</p>
              <p className='text-xl font-bold'>{users.length || 0}</p>
            </div>
          </div>
          <div className='mt-5 flex flex-col gap-2'>
            {TAB_OPTIONS.map((tab) => (
              <button
                key={tab}
                className={`rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${activeTab === tab ? 'bg-cyan-400 text-slate-900' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={logout} className='mt-5 w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600'>Logout</button>
        </aside>

        <main className='w-full lg:w-[80%] flex flex-col gap-6'>
          <div className='flex flex-wrap gap-2 rounded-xl bg-white p-3 shadow-sm'>
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? 'bg-cyan-400 text-slate-900' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

          <div className='rounded-2xl border border-slate-700 bg-white p-5 text-slate-800 shadow-2xl'>
          {message && <div className='mb-4 rounded-lg bg-amber-100 p-3 text-sm text-amber-800'>{message}</div>}

          {activeTab === 'dashboard' && (
            <div className='space-y-4'>
              <h2 className='text-xl font-bold text-slate-900'>Dashboard</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='rounded-xl border border-slate-200 p-4'>
                  <p className='text-xs uppercase text-slate-500'>Total Properties</p>
                  <p className='text-3xl font-extrabold'>{properties.length || 0}</p>
                </div>
                <div className='rounded-xl border border-slate-200 p-4'>
                  <p className='text-xs uppercase text-slate-500'>Total Users</p>
                  <p className='text-3xl font-extrabold'>{users.length || 0}</p>
                </div>
                <div className='rounded-xl border border-slate-200 p-4'>
                  <p className='text-xs uppercase text-slate-500'>Live Status</p>
                  <p className='text-3xl font-extrabold text-emerald-500'>Online</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className='space-y-4'>
              <div className='rounded-xl border border-slate-200 p-4'>
                <h2 className='text-xl font-bold text-slate-900 mb-3'>Add Property</h2>
                <form className='grid gap-3 sm:grid-cols-2' onSubmit={handleCreateProperty}>
                  {[
                    { name: 'title', label: 'Title' },
                    { name: 'location', label: 'Location' },
                    { name: 'type', label: 'Type', type: 'select' },
                    { name: 'price', label: 'Price' },
                    { name: 'area', label: 'Area' },
                    { name: 'bedrooms', label: 'Bedrooms' },
                    { name: 'bathrooms', label: 'Bathrooms' },
                  ].map((field) => (
                    <div key={field.name} className='flex flex-col'>
                      <label className='mb-1 text-sm font-semibold text-slate-500'>{field.label}</label>
                      {field.type === 'select' ? (
                        <select name={field.name} value={form[field.name]} onChange={handleInput} className='rounded-lg border border-slate-300 p-2'>
                          <option value='sale'>Sale</option>
                          <option value='rent'>Rent</option>
                        </select>
                      ) : (
                        <input
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleInput}
                          className='rounded-lg border border-slate-300 p-2'
                          required
                        />
                      )}
                    </div>
                  ))}
                  <div className='flex flex-col sm:col-span-2'>
                    <label className='mb-1 text-sm font-semibold text-slate-500'>Cover Image</label>
                    <input
                      ref={coverInputRef}
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleCoverFile(file)
                      }}
                      className='rounded-lg border border-slate-300 p-2'
                    />
                    <p className='mt-1 text-xs text-slate-500'>{form.coverImage ? 'Cover image selected' : 'No cover image selected'}</p>
                  </div>
                  <div className='flex flex-col sm:col-span-2'>
                    <label className='mb-1 text-sm font-semibold text-slate-500'>Photos (max 10)</label>
                    <input
                      ref={imagesInputRef}
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleFileChange}
                      className='rounded-lg border border-slate-300 p-2'
                    />
                    <p className='mt-1 text-xs text-slate-500'>{form.images.length} selected</p>
                  </div>
                  <div className='sm:col-span-2'>
                    <label className='mb-1 text-sm font-semibold text-slate-500'>Description</label>
                    <textarea
                      name='description'
                      value={form.description}
                      onChange={handleInput}
                      rows={3}
                      className='w-full rounded-lg border border-slate-300 p-2'
                      required
                    />
                  </div>
                  <button type='submit' className='sm:col-span-2 rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-700'>
                    Add Property
                  </button>
                </form>
              </div>

              <div className='rounded-xl border border-slate-200 p-4'>
                <h2 className='text-xl font-bold text-slate-900 mb-3'>Property List</h2>
                {properties.length === 0 ? (
                  <p className='text-sm text-slate-500'>No properties yet.</p>
                ) : (
                  <ul className='space-y-2'>
                    {properties.map((p) => (
                      <li key={p._id} className='rounded-lg border border-slate-200 p-3'>
                        <div className='flex items-start justify-between gap-4'>
                          <div>
                            <p className='font-semibold'>{p.title}</p>
                            <p className='text-sm text-slate-500'>{p.location} • {p.type} • £{p.price}</p>
                          </div>
                          <button onClick={() => deleteProperty(p._id)} className='rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600'>Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className='rounded-xl border border-slate-200 p-4'>
              <h2 className='text-xl font-bold text-slate-900 mb-3'>Users</h2>
              {users.length === 0 ? (
                <p className='text-sm text-slate-500'>No users yet.</p>
              ) : (
                <div className='space-y-2'>
                  {users.map((u) => (
                    <div key={u._id} className='flex justify-between rounded-lg border border-slate-200 p-3'>
                      <div>
                        <p className='font-semibold'>{u.name}</p>
                        <p className='text-sm text-slate-500'>{u.email}</p>
                      </div>
                      <p className='text-sm text-slate-500'>{u.phone || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
  )
}


export default AdminPanel;