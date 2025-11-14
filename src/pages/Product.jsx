import React, { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Product({ locale = 'fa' }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('1m')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const slug = window.location.pathname.split('/').pop()
  const { addItem } = useCart()
  const isFa = locale === 'fa'

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const r = await fetch(`${baseUrl}/api/products`)
        const d = await r.json()
        const p = (d.items || []).find(x => x.slug === slug)
        setProduct(p || null)
      } catch (e) {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [slug])

  const priceDisplay = useMemo(() => {
    if (!product) return ''
    if (product.type === 'hardware') return `${(product.price||0).toLocaleString(isFa?'fa-IR':'en-US')} تومان`
    const dur = (product.durations||[]).find(d=>d.label===selected)
    if (!dur) return ''
    return `${(dur.price||0).toLocaleString(isFa?'fa-IR':'en-US')} تومان`
  }, [product, selected, isFa])

  const addToCart = () => {
    if (!product) return
    if (product.type === 'hardware') addItem({ slug: product.slug, qty: 1 })
    else addItem({ slug: product.slug, qty: 1, duration_label: selected })
    alert(isFa ? 'به سبد اضافه شد.' : 'Added to cart.')
  }

  if (loading) return <div className="max-w-6xl mx-auto px-6 py-12 text-gray-400">{isFa ? 'در حال بارگذاری...' : 'Loading...'}</div>
  if (!product) return <div className="max-w-6xl mx-auto px-6 py-12 text-gray-400">{isFa ? 'محصول یافت نشد.' : 'Product not found.'}</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      <div className="aspect-video bg-[#141414] rounded-lg border border-white/10" />
      <div>
        <h1 className="text-2xl font-bold mb-2">{isFa ? product.title_fa : product.title_en}</h1>
        <p className="text-gray-400 mb-4">{isFa ? product.description_fa : product.description_en}</p>
        {product.type === 'license' && (
          <div className="mb-4 flex gap-2">
            {(product.durations||[]).map((d) => (
              <button key={d.label} onClick={()=>setSelected(d.label)} className={`px-3 py-2 rounded border ${selected===d.label? 'border-[#39FF14] bg-[#132]' : 'border-white/10'}`}>{d.label}</button>
            ))}
          </div>
        )}
        <div className="text-xl font-bold mb-4">{priceDisplay}</div>
        <button onClick={addToCart} className="bg-[#39FF14] text-black font-semibold px-5 py-2 rounded">{isFa ? 'افزودن به سبد' : 'Add to Cart'}</button>
      </div>
    </div>
  )
}
