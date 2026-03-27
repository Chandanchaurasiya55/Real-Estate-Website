import { useEffect, useRef, useState } from 'react';

const TAB_OPTIONS = ['dashboard', 'properties', 'users'];

export default function AdminPanel() {
  const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3000';
  const rawUser = localStorage.getItem('user');
  let user = null;
  try {
    if (rawUser) user = JSON.parse(rawUser);
  } catch {
    user = null;
  }

  const name = user?.name || user?.email?.split('@')[0] || 'Admin';

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
          let maxWidth = 1200;
          let quality = 0.78;
          let compressed = attemptCompress(img, quality, maxWidth);
          let size = dataURLSizeBytes(compressed);
          while (size > 450000 && quality >= 0.3) {
            quality -= 0.1;
            compressed = attemptCompress(img, quality, maxWidth);
            size = dataURLSizeBytes(compressed);
            if (quality <= 0.3 && maxWidth > 640) {
              maxWidth = 640;
              quality = 0.5;
            }
          }
          resolve(compressed || fileData);
        } catch (err) {
          resolve(fileData);
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
      setMessage('Property payload too large (>16MB). Please use smaller images.');
      return;
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
    <div className='min-h-screen bg-slate-100 p-6'>
      <div className='mx-auto flex w-full max-w-7xl gap-4'>
        <aside className='w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
          <h2 className='mb-4 text-lg font-black'>Admin Panel</h2>
          <p className='mb-3 text-sm text-slate-500'>Hello, {name}</p>
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab}
              className={`mb-2 w-full rounded-lg px-3 py-2 text-left font-semibold ${activeTab === tab ? 'bg-cyan-600 text-white' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <button onClick={logout} className='mt-6 w-full rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600'>Logout</button>
        </aside>

        <main className='flex-1'>
          {message && <div className='mb-4 rounded-lg bg-amber-100 p-3 text-sm text-amber-800'>{message}</div>}

          {activeTab === 'dashboard' && (
            <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
              <h2 className='text-2xl font-bold'>Dashboard</h2>
              <p className='mt-2 text-slate-600'>Quick overview of latest updates.</p>
              <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='rounded-lg border border-slate-200 p-4'>
                  <p className='text-sm text-slate-500'>Total Properties</p>
                  <p className='text-3xl font-bold'>{properties.length || 0}</p>
                </div>
                <div className='rounded-lg border border-slate-200 p-4'>
                  <p className='text-sm text-slate-500'>Total Users</p>
                  <p className='text-3xl font-bold'>{users.length || 0}</p>
                </div>
                <div className='rounded-lg border border-slate-200 p-4'>
                  <p className='text-sm text-slate-500'>Active</p>
                  <p className='text-3xl font-bold'>Online</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className='space-y-4'>
              <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='text-2xl font-bold mb-4'>Add Property</h2>
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
                        <select name={field.name} value={form[field.name]} onChange={handleInput} className='rounded-lg border border-slate-300 p-2'><option value='sale'>Sale</option><option value='rent'>Rent</option></select>
                      ) : (
                        <input name={field.name} value={form[field.name]} onChange={handleInput} className='rounded-lg border border-slate-300 p-2' required />
                      )}
                    </div>
                  ))}
                  <div className='flex flex-col sm:col-span-2'>
                    <label className='mb-1 text-sm font-semibold text-slate-500'>Cover Image</label>
                    <input ref={coverInputRef} type='file' accept='image/*' onChange={(e) => { const file = e.target.files?.[0]; if (file) handleCoverFile(file); }} className='rounded-lg border border-slate-300 p-2' />
                    <p className='mt-1 text-xs text-slate-500'>{form.coverImage ? 'Cover image selected' : 'No cover image selected'}</p>
                  </div>
                  <div className='flex flex-col sm:col-span-2'>
                    <label className='mb-1 text-sm font-semibold text-slate-500'>Photos (max 10)</label>
                    <input ref={imagesInputRef} type='file' accept='image/*' multiple onChange={handleFileChange} className='rounded-lg border border-slate-300 p-2' />
                    <p className='mt-1 text-xs text-slate-500'>{form.images.length} selected</p>
                  </div>
                  <div className='sm:col-span-2'>
                    <label className='mb-1 text-sm font-semibold text-slate-500'>Description</label>
                    <textarea name='description' value={form.description} onChange={handleInput} rows={3} className='w-full rounded-lg border border-slate-300 p-2' required />
                  </div>
                  <button type='submit' className='sm:col-span-2 rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-700'>Add Property</button>
                </form>
              </div>

              <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                <h2 className='text-2xl font-bold mb-4'>Property List</h2>
                {properties.length === 0 ? (
                  <p className='text-sm text-slate-500'>No properties yet.</p>
                ) : (
                  <ul className='space-y-3'>
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
            <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-4'>Users</h2>
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
        </main>
      </div>
    </div>
  );
}

