import React from 'react'

export default function ProductDetails({ product, onClose, onAdd }) {
  if (!product) return null
  const variants = product.variants || ["250g","500g","1kg","2kg"]
  const [selected, setSelected] = React.useState('1kg')

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
        <img src={product.image_url} alt={product.name} className="h-56 w-full object-cover" />
        <div className="p-6 space-y-3">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex gap-2 flex-wrap">
            {variants.map(v => (
              <button key={v} onClick={()=>setSelected(v)} className={`px-3 py-1 rounded-full border ${selected===v?'bg-emerald-500 text-white':'bg-white'}`}>{v}</button>
            ))}
          </div>
          <div className="flex justify-between pt-2">
            <div className="font-semibold text-emerald-600">₹{product.price_per_kg} / kg</div>
            <div className="space-x-2">
              <button onClick={onClose} className="px-4 py-2 rounded-xl border">Close</button>
              <button onClick={()=>onAdd?.(product, selected)} className="px-4 py-2 rounded-xl text-white" style={{ background: '#27AE60' }}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
