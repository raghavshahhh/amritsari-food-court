'use client'

import { useState } from 'react'
import { Utensils, TrendingUp, Users, CheckCircle, Search, Plus } from 'lucide-react'
import Link from 'next/link'

export interface AdminOrder {
  id: string
  customer: string
  type: 'Dine In' | 'Takeaway' | 'Delivery'
  tableOrAddress: string
  items: string
  total: number
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Completed'
  time: string
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'AFC-1048',
    customer: 'Rahul Sharma',
    type: 'Dine In',
    tableOrAddress: 'Table 4',
    items: '2x Amritsari Aloo Kulcha, 1x Dal Makhani, 2x Sweet Lassi',
    total: 540,
    status: 'Preparing',
    time: '19:42',
  },
  {
    id: 'AFC-1047',
    customer: 'Priya Singh',
    type: 'Delivery',
    tableOrAddress: 'B-12, Vasant Kunj Sector C',
    items: '1x Butter Chicken, 2x Garlic Naan, 1x Paneer Tikka',
    total: 620,
    status: 'Out for Delivery',
    time: '19:35',
  },
  {
    id: 'AFC-1046',
    customer: 'Amit Verma',
    type: 'Takeaway',
    tableOrAddress: 'Counter Pick Up',
    items: '3x Amritsari Chole Bhature, 3x Lassi',
    total: 630,
    status: 'Completed',
    time: '19:20',
  },
]

export default function AdminClient() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS)
  const [searchQuery, setSearchQuery] = useState('')

  const handleStatusChange = (id: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
  }

  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 pb-28">
      {/* Header Bar */}
      <section className="py-8 border-b border-white/10 bg-neutral-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Staff Control Panel
              </span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white mt-1">
              Live Kitchen & Order Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/15"
            >
              View Menu
            </Link>
            <button
              onClick={() => alert('Order simulator: New order received!')}
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
            <p className="text-3xl font-display font-extrabold text-amber-400">₹24,580</p>
            <p className="text-white/40 text-xs mt-1">+14% vs yesterday</p>
          </div>

          <div className="glass-card p-6 border border-white/12">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-white/50">Total Orders</span>
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-display font-extrabold text-white">84</p>
            <p className="text-white/40 text-xs mt-1">3 active kitchen orders</p>
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
            <h2 className="text-xl font-display font-extrabold text-white">Live Kitchen Orders</h2>
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
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 uppercase tracking-widest text-white/40 font-black">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Dishes</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80 font-medium">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-amber-400">{order.id}</td>
                    <td className="py-4 px-4 font-bold text-white">{order.customer}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-white/10 text-white border border-white/15">
                        {order.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/60">{order.tableOrAddress}</td>
                    <td className="py-4 px-4 max-w-xs truncate">{order.items}</td>
                    <td className="py-4 px-4 font-bold text-white">₹{order.total}</td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as AdminOrder['status'])}
                        className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] uppercase tracking-wider bg-black border focus:outline-none cursor-pointer ${
                          order.status === 'Completed'
                            ? 'text-emerald-400 border-emerald-500/40'
                            : order.status === 'Preparing'
                            ? 'text-amber-400 border-amber-500/40'
                            : 'text-sky-400 border-sky-500/40'
                        }`}
                      >
                        <option value="Pending" className="bg-black text-white">Pending</option>
                        <option value="Preparing" className="bg-black text-white">Preparing</option>
                        <option value="Out for Delivery" className="bg-black text-white">Out for Delivery</option>
                        <option value="Completed" className="bg-black text-white">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
