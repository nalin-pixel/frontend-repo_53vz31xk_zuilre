import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User, Globe, Sun, Moon } from 'lucide-react'

export default function Layout({ children, locale = 'fa', onLocale, theme = 'dark', onTheme }) {
  const isFa = locale === 'fa'
  const nav = isFa
    ? [
        { to: '/', label: 'خانه' },
        { to: '/shop', label: 'فروشگاه' },
        { to: '/status', label: 'وضعیت' },
        { to: '/support', label: 'پشتیبانی' },
        { to: '/faq', label: 'سوالات متداول' },
        { to: '/about', label: 'درباره' },
        { to: '/account', label: 'حساب' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/shop', label: 'Shop' },
        { to: '/status', label: 'Status' },
        { to: '/support', label: 'Support' },
        { to: '/faq', label: 'FAQ' },
        { to: '/about', label: 'About' },
        { to: '/account', label: 'Account' },
      ]

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#101010]'} min-h-screen flex flex-col ${isFa ? 'rtl' : 'ltr'}`}>
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-extrabold tracking-tight text-xl">
            Elevate <span className="text-[#39FF14]">Scripts</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `text-sm ${isActive ? 'text-[#39FF14]' : 'text-gray-300 hover:text-white'}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => onLocale(isFa ? 'en' : 'fa')} className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-[#141414] border border-white/10">
              <Globe size={16} /> {isFa ? 'FA' : 'EN'}
            </button>
            <button onClick={() => onTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-[#141414] border border-white/10">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <Link to="/cart" className="relative p-2 rounded hover:bg-white/5">
              <ShoppingCart size={18} />
            </Link>
            <Link to="/account" className="relative p-2 rounded hover:bg-white/5">
              <User size={18} />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-lg mb-3">Elevate Scripts</div>
            <p className="text-sm text-gray-400">ایران — پرداخت امن ریالی — پشتیبانی از طریق تیکت</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Links</div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/status">Status</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Policies</div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/refund">Refund</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Contact</div>
            <p className="text-sm text-gray-300">support@elevatescripts.dev</p>
            <div className="text-xs text-gray-500 mt-2">Telegram / Discord placeholders</div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 py-4 border-t border-white/5">© {new Date().getFullYear()} Elevate Scripts. All rights reserved.</div>
      </footer>
    </div>
  )
}
