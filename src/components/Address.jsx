import React, { useEffect, useState } from 'react'

export default function Address({ user, onContinue }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name:'', mobile:'', pincode:'', street:'', city:'', is_default:true })

  const load = async () => {
    const res = await fetch(`${API}/api/addresses?user_id=${user.user_id}`)
    setList(await res.json())
  }
  useEffect(() => { if (user) load() }, [user])

  const create = async () => {
    const payload = { ...form, user_id: user.user_id }
    const res = await fetch(`${API}/api/addresses`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok) { setForm({ name:'', mobile:'', pincode:'', street:'', city:'', is_default:true }); load() }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Saved Addresses</h3>
        {list.map(a => (
          <div key={a._id} className={`p-4 rounded-2xl border ${a.is_default?'border-emerald-500':'border-gray-200'}`}>
            <div className="font-semibold">{a.name} • {a.mobile}</div>
            <div className="text-sm text-gray-600">{a.street}, {a.city} - {a.pincode}</div>
            {a.is_default && <div className="text-xs text-emerald-600 font-medium mt-1">Default</div>}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold">Add New</h3>
        {['name','mobile','pincode','street','city'].map(k => (
          <input key={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k.charAt(0).toUpperCase()+k.slice(1)} className="w-full px-4 py-3 rounded-xl border" />
        ))}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_default} onChange={e=>setForm({...form,is_default:e.target.checked})} /> Set default address
        </label>
        <button onClick={create} className="w-full py-3 rounded-xl text-white" style={{ background:'#2ECC71' }}>Save Address</button>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button onClick={onContinue} className="px-6 py-3 rounded-xl text-white" style={{ background:'#27AE60' }}>Continue</button>
      </div>
    </div>
  )
}
