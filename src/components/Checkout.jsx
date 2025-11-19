import React, { useEffect, useState } from 'react'

export default function Checkout({ user }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [addresses, setAddresses] = useState([])
  const [selected, setSelected] = useState(null)
  const [payment, setPayment] = useState('COD')
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/addresses?user_id=${user.user_id}`)
      const a = await res.json()
      setAddresses(a)
      const def = a.find(x=>x.is_default)
      if (def) setSelected(def._id)
    }
    if (user) load()
  }, [user])

  const placeOrder = async () => {
    if (!selected) return alert('Select address')
    setPlacing(true)
    const res = await fetch(`${API}/api/orders/create`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id: user.user_id, address_id: selected, payment_method: payment }) })
    const data = await res.json()
    setPlacing(false)
    if (res.ok) setOrderId(data.order_id)
    else alert(data.detail || 'Error placing order')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-4">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      <div className="space-y-2">
        <div className="font-semibold">Delivery Address</div>
        {addresses.map(a => (
          <label key={a._id} className="flex gap-3 p-3 rounded-xl border items-start">
            <input type="radio" name="addr" checked={selected===a._id} onChange={()=>setSelected(a._id)} />
            <div>
              <div className="font-medium">{a.name} • {a.mobile}</div>
              <div className="text-sm text-gray-600">{a.street}, {a.city} - {a.pincode}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <div className="font-semibold">Payment Method</div>
        {['COD','UPI','Card'].map(m => (
          <label key={m} className="flex items-center gap-2">
            <input type="radio" name="pay" checked={payment===m} onChange={()=>setPayment(m)} /> {m}
          </label>
        ))}
      </div>

      <button disabled={placing} onClick={placeOrder} className="px-6 py-3 rounded-xl text-white disabled:opacity-60" style={{ background:'#2ECC71' }}>{placing?'Placing...':'Place Order'}</button>

      {orderId && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">Order placed! ID: {orderId}</div>
      )}
    </div>
  )
}
