import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('elevate_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [coupon, setCoupon] = useState(() => localStorage.getItem('elevate_coupon') || '')

  useEffect(() => {
    localStorage.setItem('elevate_cart', JSON.stringify(items))
  }, [items])
  useEffect(() => {
    if (coupon) localStorage.setItem('elevate_coupon', coupon)
    else localStorage.removeItem('elevate_coupon')
  }, [coupon])

  const addItem = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.slug === item.slug && (p.duration_label || '') === (item.duration_label || '')
      )
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + (item.qty || 1) }
        return copy
      }
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }

  const updateItem = (index, patch) => {
    setItems((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], ...patch }
      if (copy[index].qty <= 0) copy.splice(index, 1)
      return copy
    })
  }

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => setItems([])

  const value = useMemo(() => ({ items, addItem, updateItem, removeItem, clearCart, coupon, setCoupon }), [items, coupon])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
