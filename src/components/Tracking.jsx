import React, { useEffect, useState } from 'react'

export default function Tracking({ orderId }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/orders/${orderId}/track`)
      const d = await res.json()
      setData(d)
    }
    if (orderId) load()
  }, [orderId])

  if (!data) return null

  return (
    <div className="max-w-2xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold">Order Tracking</h2>
      <div className="mt-4 flex items-center justify-between">
        {data.steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${i<=data.active_index?'bg-emerald-500':'bg-gray-300'}`}>{i+1}</div>
            {i < data.steps.length-1 && <div className={`h-1 flex-1 ${i<data.active_index?'bg-emerald-500':'bg-gray-300'}`}></div>}
          </div>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600">ETA: {data.eta}</div>
      <div className="mt-6 p-4 rounded-xl border">
        Delivery partner location: {data.location.lat}, {data.location.lng}
      </div>
    </div>
  )}
