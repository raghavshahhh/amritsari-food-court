import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const order = store.getOrderById(id)
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, order })
  }

  const orders = store.getOrders()
  return NextResponse.json({ success: true, orders, count: orders.length })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, customerPhone, type, tableOrAddress, items, notes } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart cannot be empty' }, { status: 400 })
    }

    const subtotal = items.reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0)
    const tax = Math.round(subtotal * 0.05) // 5% GST
    const deliveryFee = type === 'Delivery' ? 40 : 0
    const total = subtotal + tax + deliveryFee

    const newOrder = store.createOrder({
      customerName: customerName || 'Guest Customer',
      customerPhone: customerPhone || '+91 99999 99999',
      type: type || 'Takeaway',
      tableOrAddress: tableOrAddress || (type === 'Dine In' ? 'Table 1' : 'Counter Pickup'),
      items,
      subtotal,
      tax,
      deliveryFee,
      total,
      notes: notes || '',
    })

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Order ID and status required' }, { status: 400 })
    }

    const updatedOrder = store.updateOrderStatus(id, status)
    if (!updatedOrder) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, order: updatedOrder })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update order status' }, { status: 500 })
  }
}
