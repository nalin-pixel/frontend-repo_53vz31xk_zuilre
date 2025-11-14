import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import Layout from './components/Layout'
import Shop from './pages/Shop'
import Status from './pages/Status'
import Placeholder from './pages/Placeholder'
import { CartProvider } from './context/CartContext'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Product from './pages/Product'

function RootRouter() {
  const [locale, setLocale] = React.useState('fa')
  const [theme, setTheme] = React.useState('dark')

  return (
    <CartProvider>
      <Layout locale={locale} onLocale={setLocale} theme={theme} onTheme={setTheme}>
        <Routes>
          <Route path="/" element={<App locale={locale} theme={theme} />} />
          <Route path="/shop" element={<Shop locale={locale} />} />
          <Route path="/status" element={<Status locale={locale} />} />
          <Route path="/product/:slug" element={<Product locale={locale} />} />
          <Route path="/cart" element={<Cart locale={locale} />} />
          <Route path="/checkout" element={<Checkout locale={locale} />} />
          <Route path="/support" element={<Placeholder title={locale==='fa'?'پشتیبانی':'Support'} body={locale==='fa'?'فرم تیکت و اطلاعات تماس به زودی.':'Ticket form and contact info coming soon.'} />} />
          <Route path="/faq" element={<Placeholder title={locale==='fa'?'سوالات متداول':'FAQ'} />} />
          <Route path="/about" element={<Placeholder title={locale==='fa'?'درباره':'About'} />} />
          <Route path="/account" element={<Placeholder title={locale==='fa'?'حساب کاربری':'Account'} />} />
          <Route path="/terms" element={<Placeholder title={locale==='fa'?'قوانین خدمات':'Terms of Service'} />} />
          <Route path="/refund" element={<Placeholder title={locale==='fa'?'قوانین بازگشت وجه':'Refund Policy'} />} />
          <Route path="/privacy" element={<Placeholder title={locale==='fa'?'حریم خصوصی':'Privacy Policy'} />} />
          <Route path="*" element={<Placeholder title={locale==='fa'?'صفحه پیدا نشد':'404 Not Found'} />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  </React.StrictMode>,
)
