import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ locale = 'fa', onPrimary, onSecondary }) {
  const isFa = locale === 'fa'
  const t = {
    fa: {
      title: 'الویت اسکریپتس — چیت سخت‌افزاری با کیفیت پریمیوم',
      subtitle:
        'دستگاه Elevate v.1 و لایسنس‌های ESP + Aimbot برای VMP، CS2 و Rainbow Six. تحویل لایسنس تا ۱ ساعت. ارسال سخت‌افزار فقط داخل ایران.',
      ctaPrimary: 'مشاهده فروشگاه',
      ctaSecondary: 'وضعیت تشخیص',
    },
    en: {
      title: 'Elevate Scripts — Premium Hardware-Based Cheats',
      subtitle:
        'Elevate v.1 device and ESP + Aimbot licenses for VMP, CS2, and Rainbow Six. License delivery within 1 hour. Hardware shipping in Iran only.',
      ctaPrimary: 'Browse Shop',
      ctaSecondary: 'Detection Status',
    },
  }[isFa ? 'fa' : 'en']

  return (
    <section className={`relative min-h-[70vh] w-full overflow-hidden ${isFa ? 'rtl' : 'ltr'}`}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fcD-iW8YZHyBp1qq/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col gap-6 items-start">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_12px_rgba(57,255,20,0.35)]">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
          {t.subtitle}
        </p>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={onPrimary}
            className="bg-[#39FF14] text-black font-semibold px-6 py-3 rounded-md shadow-[0_0_20px_rgba(57,255,20,0.6)] hover:shadow-[0_0_28px_rgba(57,255,20,0.9)] transition-shadow"
          >
            {t.ctaPrimary}
          </button>
          <button
            onClick={onSecondary}
            className="bg-transparent border border-[#39FF14] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#141414] hover:border-white transition-colors"
          >
            {t.ctaSecondary}
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(57,255,20,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(57,255,20,0.08),transparent_45%)]" />
    </section>
  )
}
