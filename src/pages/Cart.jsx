import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Cart({ locale = 'fa' }) {
  const { items, updateItem, removeItem, coupon, setCoupon } = useCart()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [calc, setCalc] = useState(null)
  const [loading, setLoading] = useState(false)
  const isFa = locale === 'fa'

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/api/cart/calc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: coupon || '', items }),
        })
        const data = await res.json()
        setCalc(data)
      } catch (e) {
        setCalc(null)
      } finally {
        setLoading(false)
      }
    }
    if (items.length) run()
    else setCalc(null)
  }, [items, coupon])

  const currency = (v) => (v || 0).toLocaleString(isFa ? 'fa-IR' : 'en-US')

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{isFa ? 'سبد خرید' : 'Cart'}</h1>
      {items.length === 0 ? (
        <div className="text-gray-400">{isFa ? 'سبد خرید شما خالی است.' : 'Your cart is empty.'}</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="bg-[#141414] rounded-lg p-4 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.slug} {it.duration_label ? `(${it.duration_label})` : ''}</div>
                  <div className="text-xs text-gray-400">{isFa ? 'تعداد' : 'Qty'}: {it.qty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateItem(idx, { qty: it.qty - 1 })} className="px-2 py-1 bg-white/10 rounded">-</button>
                  <button onClick={() => updateItem(idx, { qty: it.qty + 1 })} className="px-2 py-1 bg-white/10 rounded">+</button>
                  <button onClick={() => removeItem(idx)} className="px-2 py-1 bg-red-500/80 rounded">{isFa ? 'حذف' : 'Remove'}</button>
                </div>
              </div>
            ))}
            <div className="bg-[#141414] rounded-lg p-4 border border-white/10 flex items-center gap-2">
              <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder={isFa? 'کد تخفیف':'Coupon code'} className="flex-1 bg-transparent border border-white/10 rounded px-3 py-2 outline-none" />
              <div className="text-xs text-gray-400">WELCOME10</div>
            </div>
          </div>
          <div>
            <div className="bg-[#141414] rounded-lg p-6 border border-white/10">
              <div className="font-semibold mb-4">{isFa ? 'خلاصه' : 'Summary'}</div>
              {loading ? (
                <div className="text-gray-400 text-sm">{isFa ? 'در حال محاسبه...' : 'Calculating...'}</div>
              ) : calc ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>{isFa ? 'جمع جزء' : 'Subtotal'}</span><span>{currency(calc.subtotal)} تومان</span></div>
                  <div className="flex justify-between"><span>{isFa ? 'تخفیف' : 'Discount'}</span><span>{currency(calc.discount)} تومان</span></div>
                  <div className="flex justify-between"><span>{isFa ? 'هزینه ارسال' : 'Shipping'}</span><span>{currency(calc.shipping_fee)} تومان</span></div>
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold"><span>{isFa ? 'مبلغ نهایی' : 'Total'}</span><span>{currency(calc.total)} تومان</span></div>
                  <a href="/checkout" className="block text-center mt-4 bg-[#39FF14] text-black font-semibold px-4 py-2 rounded">{isFa ? 'ادامه به پرداخت' : 'Proceed to Checkout'}</a>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">{isFa ? 'کالایی برای محاسبه وجود ندارد.' : 'No items to calculate.'}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
