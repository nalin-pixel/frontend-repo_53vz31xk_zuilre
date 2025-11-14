import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Checkout({ locale = 'fa' }) {
  const { items, coupon } = useCart()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [placing, setPlacing] = useState(false)
  const [result, setResult] = useState(null)
  const isFa = locale === 'fa'

  const placeOrder = async () => {
    setPlacing(true)
    try {
      const res = await fetch(`${baseUrl}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, address, items, coupon })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: true })
    } finally {
      setPlacing(false)
    }
  }

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-gray-400">{isFa ? 'سبد خرید خالی است.' : 'Cart is empty.'}</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">{isFa ? 'پرداخت' : 'Checkout'}</h1>
        <label className="block text-sm mb-1">{isFa ? 'ایمیل' : 'Email'}</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-3 py-2 mb-4" placeholder="you@example.com" />
        <label className="block text-sm mb-1">{isFa ? 'آدرس (برای سخت‌افزار)' : 'Address (for hardware)'}</label>
        <textarea value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-3 py-2 h-28" placeholder={isFa? 'تهران، ...':'Tehran, ...'} />
        <button onClick={placeOrder} disabled={placing || !email} className="mt-4 bg-[#39FF14] text-black font-semibold px-4 py-2 rounded disabled:opacity-60">{placing ? (isFa ? 'در حال ثبت...' : 'Placing...') : (isFa ? 'ثبت سفارش' : 'Place Order')}</button>
      </div>
      <div>
        <div className="bg-[#141414] rounded-lg p-6 border border-white/10">
          <div className="font-semibold mb-3">{isFa ? 'خلاصه سفارش' : 'Order Summary'}</div>
          <ul className="text-sm text-gray-300 space-y-1 mb-3">
            {items.map((it, i) => (
              <li key={i}>• {it.slug} {it.duration_label ? `(${it.duration_label})` : ''} × {it.qty}</li>
            ))}
          </ul>
          {result ? (
            <div className="text-sm">
              {result.error ? (
                <div className="text-red-400">{isFa ? 'خطا در ثبت سفارش' : 'Error placing order'}</div>
              ) : (
                <div>
                  <div className="mb-2">{isFa ? 'سفارش ثبت شد.' : 'Order created.'}</div>
                  <a href={result.payment_gateway?.redirect_url} className="text-[#39FF14] underline" target="_blank" rel="noreferrer">{isFa ? 'رفتن به درگاه' : 'Go to payment'}</a>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-400">{isFa ? 'پس از ثبت، شما به درگاه پرداخت هدایت می‌شوید.' : 'After placing, you will be redirected to payment gateway.'}</div>
          )}
        </div>
      </div>
    </div>
  )
}
