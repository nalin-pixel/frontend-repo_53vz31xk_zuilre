import React, { useEffect, useState } from 'react'

export default function Shop({ locale = 'fa' }) {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/products`).then(r => r.json()).then(d => setItems(d.items || [])).catch(() => setItems([]))
  }, [])

  const isFa = locale === 'fa'

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{isFa ? 'فروشگاه' : 'Shop'}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <div key={i} className="bg-[#141414] rounded-lg p-6 border border-white/10 hover:border-[#39FF14] transition-colors">
            {p.badge && <span className="text-xs bg-[#39FF14] text-black px-2 py-1 rounded">{p.badge}</span>}
            <div className="mt-3 text-lg font-semibold">{isFa ? p.title_fa : p.title_en}</div>
            <div className="text-sm text-gray-400">{p.type === 'hardware' ? `${p.price?.toLocaleString?.('fa-IR')} تومان` : (isFa ? 'گزینه‌ی مدت زمان دارد' : 'Has duration options')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
