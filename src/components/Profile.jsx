import React, { useEffect, useState } from 'react'

export default function Profile({ user, onLogout }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/profile?user_id=${user.user_id}`)
      setData(await res.json())
    }
    if (user) load()
  }, [user])

  if (!data) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{data.user.name || 'VegHolic User'}</div>
          <div className="text-gray-600">{data.user.phone}</div>
        </div>
        <button onClick={onLogout} className="px-4 py-2 rounded-xl border">Logout</button>
      </div>

      <div>
        <div className="font-semibold mb-2">Address Book</div>
        <div className="grid md:grid-cols-2 gap-3">
          {data.addresses.map(a => (
            <div key={a._id} className="p-4 rounded-2xl border">
              <div className="font-medium">{a.name} • {a.mobile}</div>
              <div className="text-sm text-gray-600">{a.street}, {a.city} - {a.pincode}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold mb-2">Recent Orders</div>
        <div className="space-y-2">
          {data.recent_orders.map(o => (
            <div key={o._id} className="p-4 rounded-2xl border flex items-center justify-between">
              <div>
                <div className="font-medium">Order #{o._id.slice(-6)}</div>
                <div className="text-sm text-gray-600">{o.items.length} items • ₹{o.total_amount}</div>
              </div>
              <div className="text-emerald-600 font-semibold">{o.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
