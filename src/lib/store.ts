export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  isVeg: boolean
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  type: 'Dine In' | 'Takeaway' | 'Delivery'
  tableOrAddress: string
  items: OrderItem[]
  subtotal: number
  tax: number
  deliveryFee: number
  total: number
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled'
  createdAt: string
  notes?: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  date?: string
  guests?: string
  message: string
  createdAt: string
}

// Initial Sample Kitchen Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'AFC-1048',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    type: 'Dine In',
    tableOrAddress: 'Table 4',
    items: [
      { id: 'aloo-kulcha', name: 'Amritsari Aloo Kulcha', price: 120, quantity: 2, isVeg: true },
      { id: 'dal-makhani', name: 'Dal Makhani', price: 240, quantity: 1, isVeg: true },
      { id: 'sweet-lassi', name: 'Amritsari Sweet Lassi', price: 60, quantity: 2, isVeg: true },
    ],
    subtotal: 600,
    tax: 30,
    deliveryFee: 0,
    total: 630,
    status: 'Preparing',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'AFC-1047',
    customerName: 'Priya Singh',
    customerPhone: '+91 91234 56789',
    type: 'Delivery',
    tableOrAddress: 'B-12, Vasant Kunj Sector C, New Delhi',
    items: [
      { id: 'butter-chicken', name: 'Butter Chicken', price: 280, quantity: 1, isVeg: false },
      { id: 'garlic-naan', name: 'Butter Garlic Naan', price: 50, quantity: 2, isVeg: true },
      { id: 'paneer-tikka', name: 'Paneer Tikka', price: 220, quantity: 1, isVeg: true },
    ],
    subtotal: 600,
    tax: 30,
    deliveryFee: 40,
    total: 670,
    status: 'Out for Delivery',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: 'AFC-1046',
    customerName: 'Amit Verma',
    customerPhone: '+91 99887 76655',
    type: 'Takeaway',
    tableOrAddress: 'Counter Pickup',
    items: [
      { id: 'chole-bhature', name: 'Amritsari Chole Bhature', price: 150, quantity: 3, isVeg: true },
      { id: 'sweet-lassi', name: 'Amritsari Sweet Lassi', price: 60, quantity: 3, isVeg: true },
    ],
    subtotal: 630,
    tax: 31,
    deliveryFee: 0,
    total: 661,
    status: 'Completed',
    createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
  },
]

// Server global singleton store
class InMemoryStore {
  private orders: Order[] = [...INITIAL_ORDERS]
  private contactSubmissions: ContactSubmission[] = []
  private orderCounter = 1049

  public getOrders(): Order[] {
    return this.orders
  }

  public getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id)
  }

  public createOrder(data: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const newOrder: Order = {
      ...data,
      id: `AFC-${this.orderCounter++}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    this.orders.unshift(newOrder)
    return newOrder
  }

  public updateOrderStatus(id: string, status: Order['status']): Order | null {
    const order = this.orders.find((o) => o.id === id)
    if (order) {
      order.status = status
      return order
    }
    return null
  }

  public addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'createdAt'>): ContactSubmission {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: `SUB-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.contactSubmissions.unshift(newSubmission)
    return newSubmission
  }

  public getContactSubmissions(): ContactSubmission[] {
    return this.contactSubmissions
  }
}

// Global instance attached to globalThis to persist across Next.js dev server reloads
const globalStore = globalThis as unknown as { store?: InMemoryStore }
export const store = globalStore.store || new InMemoryStore()
if (process.env.NODE_ENV !== 'production') globalStore.store = store
