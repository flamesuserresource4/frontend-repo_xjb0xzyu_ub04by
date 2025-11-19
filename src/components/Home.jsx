import React, { useEffect, useState } from 'react'

const theme = {
  primary: '#2ECC71',
  secondary: '#27AE60',
  background: '#F4F9F4',
  text: '#1A1A1A',
}

export default function Home({ user }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [category, setCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const url = new URL(`${API}/api/products`)
    if (category !== 'all') url.searchParams.set('category', category)
    fetch(url).then(r=>r.json()).then(setProducts)
  }, [category, API])

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  const addToCart = async (product, variant='1kg') => {
    if (!user) return alert('Please login first')
    const body = { user_id: user.user_id, product_id: product._id, variant, qty: 1 }
    const res = await fetch(`${API}/api/cart/add`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if (res.ok) {
      alert('Added to cart')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: theme.background }}>
      <div className="sticky top-0 z-10" style={{ background: theme.background }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 items-center">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search vegetables..." className="flex-1 px-4 py-3 rounded-xl border" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-4 flex gap-2 overflow-x-auto">
          {['all','leafy','root','fruits','organic'].map(cat => (
            <button key={cat} onClick={()=>setCategory(cat)} className={`px-4 py-2 rounded-full border ${category===cat?'text-white':''}`} style={{ background: category===cat?theme.primary:'white', color: category===cat?'white':theme.text }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filtered.map(p => (
          <div key={p._id} className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden">
            <img src={p.image_url} alt={p.name} className="h-44 w-full object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg" style={{ color: theme.text }}>{p.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="font-bold" style={{ color: theme.secondary }}>₹{p.price_per_kg} / kg</div>
                <button onClick={()=>addToCart(p)} className="px-4 py-2 rounded-full text-white" style={{ background: theme.primary }}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
