'use client'

import { ReactLenis } from 'lenis/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { CartProvider } from '@/context/CartContext'
import ToastContainer from './ToastContainer'
import OrderTrackerModal from './OrderTrackerModal'
import AddToCartModal from './AddToCartModal'
import FloatingCartBar from './FloatingCartBar'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ReactLenis
          root
          options={{
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
          }}
        >
          {children}
          <ToastContainer />
          <OrderTrackerModal />
          <AddToCartModal />
          <FloatingCartBar />
        </ReactLenis>
      </CartProvider>
    </QueryClientProvider>
  )
}