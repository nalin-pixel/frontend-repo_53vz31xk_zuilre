import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import Layout from './components/Layout'

export default function App() {
  const navigate = useNavigate()
  const [locale, setLocale] = useState('fa')
  const [theme, setTheme] = useState('dark')

  useMemo(() => {
    if (theme === 'dark') document.documentElement.classList.remove('light')
    else document.documentElement.classList.add('light')
  }, [theme])

  return (
    <Layout locale={locale} onLocale={setLocale} theme={theme} onTheme={setTheme}>
      <div className={theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#101010]'}>
        <Hero
          locale={locale}
          onPrimary={() => navigate('/shop')}
          onSecondary={() => navigate('/status')}
        />
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
          {[{
            fa: 'تحویل سریع لایسنس (تا ۱ ساعت)', en: 'Fast license delivery (within 1 hour)'
          }, {
            fa: 'ارسال ایران‌پست (حداکثر ۷ روز)', en: 'Post shipping (up to 7 days)'
          }, {
            fa: 'تخفیف با کدهای تخفیف', en: 'Discount codes supported'
          }, {
            fa: 'داشبورد لایسنس حرفه‌ای', en: 'Pro license dashboard'
          }].map((p, idx) => (
            <div key={idx} className="bg-[#141414] rounded-lg p-6 border border-white/10 hover:border-[#39FF14] transition-colors">
              <div className="text-[#39FF14] font-mono text-sm mb-2">●</div>
              <div className="font-semibold">{locale === 'fa' ? p.fa : p.en}</div>
            </div>
          ))}
        </section>
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-bold mb-6">{locale === 'fa' ? 'محصولات منتخب' : 'Featured Products'}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[{
              title_fa: 'Elevate v.1', title_en: 'Elevate v.1', price: '1,000,000 تومان', to: '/product/elevate-v1', badge: 'New'
            },{
              title_fa: 'لایسنس VMP', title_en: 'VMP License', price: '3,000,000/۸,000,000 تومان', to: '/product/vmp-license', badge: 'Best Value'
            },{
              title_fa: 'لایسنس CS2', title_en: 'CS2 License', price: '3,000,000/۸,000,000 تومان', to: '/product/cs2-license'
            },{
              title_fa: 'لایسنس Rainbow Six', title_en: 'R6 License', price: '3,000,000/۸,000,000 تومان', to: '/product/r6-license'
            }].map((c, i) => (
              <div key={i} onClick={() => navigate(c.to)} className="cursor-pointer bg-[#141414] rounded-lg p-6 border border-white/10 hover:border-[#39FF14] transition-colors">
                {c.badge && <span className="text-xs bg-[#39FF14] text-black px-2 py-1 rounded">{c.badge}</span>}
                <div className="mt-3 text-lg font-semibold">{locale === 'fa' ? c.title_fa : c.title_en}</div>
                <div className="text-sm text-gray-400">{c.price}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
