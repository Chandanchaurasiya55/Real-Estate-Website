import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()

  const user = (() => {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })()

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    // Force refresh so Navbar recalculates auth state and shows Login
    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 p-6 text-center">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-gray-600">Login first to view profile.</p>
        </div>
      </div>
    )
  }

  const displayName = user.name || user.email?.split('@')[0] || 'User'
  const isAdmin = (user.role || '').toLowerCase() === 'admin'

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <h1 className="text-3xl font-black">{isAdmin ? 'Admin Profile' : 'User Profile'}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200"
            >
              Back Home
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center mb-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-300 bg-blue-100 text-4xl font-black text-slate-900">
              {displayName[0].toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400">Name</div>
              <div className="font-semibold text-slate-900">{displayName}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400">Email</div>
              <div className="font-semibold text-slate-900">{user.email}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400">Role</div>
              <div className="font-semibold text-slate-900">{(user.role || 'User').toString()}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400">Phone</div>
              <div className="font-semibold text-slate-900">{user.phone || 'N/A'}</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={logout}
              className="rounded-2xl bg-red-500 px-8 py-2 text-white font-bold hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
