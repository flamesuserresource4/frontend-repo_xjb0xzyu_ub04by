import React, { useEffect, useState } from 'react'

export default function Cart({ user }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [items, setItems] = useState([])

  const load = async () => {
    if (!user) return
    const res = await fetch(`${API}/api/cart?user_id=${user.user_id}`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { load() }, [user])

  const updateQty = async (id, qty) => {
    await fetch(`${API}/api/cart/${id}/qty`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ qty }) })
    load()
  }

  const removeItem = async (id) => {
    await fetch(`${API}/api/cart/${id}`, { method:'DELETE' })
    load()
  }

  const total = items.reduce((sum, it) => sum + (it.price * it.qty), 0)

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {items.length===0 && <div className="text-gray-500">Cart is empty</div>}
      {items.map(it => (
        <div key={it._id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <img src={it.image_url} alt="" className="w-20 h-20 object-cover rounded-xl" />
          <div className="flex-1">
            <div className="font-semibold">{it.product_name}</div>
            <div className="text-sm text-gray-500">{it.variant}</div>
            <div className="text-emerald-600 font-semibold">₹{it.price}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>updateQty(it._id, Math.max(1, it.qty-1))} className="w-8 h-8 rounded-full border">-</button>
            <div>{it.qty}</div>
            <button onClick={()=>updateQty(it._id, it.qty+1)} className="w-8 h-8 rounded-full border">+</button>
          </div>
          <button onClick={()=>removeItem(it._id)} className="px-3 py-2 rounded-xl border">Remove</button>
        </div>
      ))}
      <div className="flex justify-between items-center pt-4">
        <div className="text-lg font-bold">Total: ₹{total.toFixed(2)}</div>
      </div>
    </div>
  )
}
