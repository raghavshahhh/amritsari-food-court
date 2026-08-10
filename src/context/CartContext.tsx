'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  isVeg: boolean
  image?: string
  addOns?: string[]
  spiceLevel?: string
}

export interface MenuItemForModal {
  id: string
  name: string
  price: number
  isVeg: boolean
  image?: string
  desc?: string
}

export interface Toast {
  id: string
  message: string
  type?: 'success' | 'info' | 'error'
}

export interface PlacedOrder {
  id: string
  customerName: string
  customerPhone: string
  type: 'Dine In' | 'Takeaway' | 'Delivery'
  tableOrAddress: string
  items: CartItem[]
  subtotal: number
  tax: number
  deliveryFee: number
  total: number
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled'
  createdAt: string
}

interface CartContextType {
  cart: CartItem[]
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  toasts: Toast[]
  showToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
  activeOrder: PlacedOrder | null
  setActiveOrder: (order: PlacedOrder | null) => void
  isTrackerOpen: boolean
  setIsTrackerOpen: (open: boolean) => void
  fetchOrderStatus: (id: string) => Promise<void>
  selectedItemForModal: MenuItemForModal | null
  openAddToCartModal: (item: MenuItemForModal) => void
  closeAddToCartModal: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'amritsari_cart_v2'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy state initialization for localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [activeOrder, setActiveOrder] = useState<PlacedOrder | null>(null)
  const [isTrackerOpen, setIsTrackerOpen] = useState(false)
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItemForModal | null>(null)

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to storage', e)
    }
  }, [cart])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `${Math.random().toString(36).substring(2, 9)}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      removeToast(id)
    }, 3500)
  }, [removeToast])

  const openAddToCartModal = (item: MenuItemForModal) => {
    setSelectedItemForModal(item)
  }

  const closeAddToCartModal = () => {
    setSelectedItemForModal(null)
  }

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qtyToAdd = item.quantity || 1
    const cartItemId = item.addOns && item.addOns.length > 0
      ? `${item.id}-${item.addOns.sort().join('-')}`
      : item.id

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === cartItemId)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += qtyToAdd
        return updated
      }
      return [...prev, { ...item, id: cartItemId, quantity: qtyToAdd }]
    })
    showToast(`Added ${item.name} to cart`)
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const fetchOrderStatus = useCallback(async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders?id=${orderId}`)
      const data = await res.json()
      if (data.success && data.order) {
        setActiveOrder(data.order)
      }
    } catch (e) {
      console.error('Error fetching order status:', e)
    }
  }, [])

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        toasts,
        showToast,
        removeToast,
        activeOrder,
        setActiveOrder,
        isTrackerOpen,
        setIsTrackerOpen,
        fetchOrderStatus,
        selectedItemForModal,
        openAddToCartModal,
        closeAddToCartModal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
