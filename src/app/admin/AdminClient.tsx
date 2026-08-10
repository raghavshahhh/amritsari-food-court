'use client'

import { useState, useEffect, useCallback } from 'react'
import { Utensils, TrendingUp, Users, CheckCircle, Search, Plus, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Order } from '@/lib/store'

export default function AdminClient() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders)
      }
    } catch (e) {
      console.error('Error fetching admin orders:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Poll orders every 3 seconds for real-time kitchen sync
  useEffect(() => {
    let isMounted = true
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.orders)) {
          setOrders(data.orders)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false)
      })

    const interval = setInterval(fetchOrders, 3000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [fetchOrders])

  const handleStatusChange = async (id: string, newStatus: Order['status']) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
      }
    } catch (e) {
      console.error('Failed to update status', e)
    }
  }

  const handleCreateTestOrder = async () => {
    try {
      const testItems = [
        { id: 'kulcha-aloo', name: 'Amritsari Aloo Kulcha', price: 120, quantity: 2, isVeg: true },
        { id: 'sweet-lassi', name: 'Amritsari Sweet Lassi', price: 60, quantity: 2, isVeg: true },
      ]
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Test Customer',
          customerPhone: '+91 98765 00000',
          type: 'Dine In',
          tableOrAddress: 'Table 6',
          items: testItems,
        }),
      })
      const data = await res.json()
      if (data.success) {
        fetchOrders()
      }
    } catch (e) {
      console.error('Failed to create test order', e)
    }
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.tableOrAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const todayRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0)

  const activeOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length

  return (
    <div className="min-h-screen pt-24 pb-28">
      {/* Header Bar */}
      <section className="py-8 border-b border-white/10 bg-neutral-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Staff Control Panel · Live Sync Active
              </span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white mt-1">
              Live Kitchen & Order Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/15 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Refresh
            </button>
            <Link
              href="/menu"
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/15"
            >
              View Menu
            </Link>
            <button
              onClick={handleCreateTestOrder}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" /> Simulate Test Order
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 border border-white/12">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Today Revenue</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-display font-extrabold text-amber-400">₹{todayRevenue}</p>
            <p className="text-white/40 text-xs mt-1">Live calculate from store</p>
          </div>

          <div className="glass-card p-6 border border-white/12">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Total Orders</span>
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white">{orders.length}</p>
            <p className="text-white/40 text-xs mt-1">{activeOrdersCount} active in kitchen</p>
          </div>

          <div className="glass-card p-6 border border-white/12">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Active Tables</span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white">12 / 15</p>
            <p className="text-white/40 text-xs mt-1">80% occupancy</p>
          </div>

          <div className="glass-card p-6 border border-white/12">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Google Rating</span>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white">4.39★</p>
            <p className="text-white/40 text-xs mt-1">2,847 reviews</p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="glass-card border border-white/12 p-6 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
            <h2 className="text-xl font-display font-extrabold text-white flex items-center gap-2">
              <span>Live Kitchen Orders</span>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {orders.length} Orders
              </span>
            </h2>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-12 text-white/50 text-xs">Loading live orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-white/50 text-xs">No orders found.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 uppercase tracking-widest text-white/40 font-black">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Dishes</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-amber-400">{order.id}</td>
                      <td className="py-4 px-4 font-bold text-white">
                        <div>{order.customerName}</div>
                        <div className="text-[10px] text-white/40 font-normal">{order.customerPhone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-white/10 text-white border border-white/15">
                          {order.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/60">{order.tableOrAddress}</td>
                      <td className="py-4 px-4 max-w-xs">
                        <div className="truncate font-semibold text-white/90">
                          {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-white">₹{order.total}</td>
                      <td className="py-4 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] uppercase tracking-wider bg-black border focus:outline-none cursor-pointer ${
                            order.status === 'Completed'
                              ? 'text-emerald-400 border-emerald-500/40'
                              : order.status === 'Preparing'
                              ? 'text-amber-400 border-amber-500/40'
                              : order.status === 'Out for Delivery'
                              ? 'text-sky-400 border-sky-500/40'
                              : 'text-rose-400 border-rose-500/40'
                          }`}
                        >
                          <option value="Pending" className="bg-black text-white">Pending</option>
                          <option value="Preparing" className="bg-black text-white">Preparing</option>
                          <option value="Out for Delivery" className="bg-black text-white">Out for Delivery</option>
                          <option value="Completed" className="bg-black text-white">Completed</option>
                          <option value="Cancelled" className="bg-black text-white">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
