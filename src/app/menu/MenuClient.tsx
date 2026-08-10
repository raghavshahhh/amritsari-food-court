'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Search, Flame, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const TextReveal = dynamic(() => import('@/components/TextReveal'), { ssr: false })

export interface MenuItem {
  id: string
  name: string
  desc: string
  price: number
  category: string
  tags: string[]
  isVeg: boolean
  spicyLevel?: 1 | 2 | 3
  image?: string
  popular?: boolean
}

export const MENU_ITEMS: MenuItem[] = [
  // Breads & Kulchas
  {
    id: 'kulcha-aloo',
    name: 'Amritsari Aloo Kulcha',
    desc: 'Hand-stuffed with spiced potatoes & pomegranate seeds, baked crisp in clay tandoor with melting butter',
    price: 120,
    category: 'Kulchas & Breads',
    tags: ['Signature', 'Bestseller'],
    isVeg: true,
    spicyLevel: 2,
    image: '/images/hero_kulcha.jpg',
    popular: true,
  },
  {
    id: 'kulcha-paneer',
    name: 'Amritsari Paneer Kulcha',
    desc: 'Stuffed with fresh cottage cheese, coriander and secret spice blend, served hot with chole',
    price: 140,
    category: 'Kulchas & Breads',
    tags: ['Veg', 'Popular'],
    isVeg: true,
    spicyLevel: 1,
    image: '/images/tandoori_tikka.jpg',
    popular: true,
  },
  {
    id: 'kulcha-onion',
    name: 'Amritsari Pyaz Kulcha',
    desc: 'Stuffed with caramelized onions, ajwain and green chili, crushed with butter',
    price: 110,
    category: 'Kulchas & Breads',
    tags: ['Veg'],
    isVeg: true,
    spicyLevel: 2,
  },
  {
    id: 'butter-naan',
    name: 'Butter Naan',
    desc: 'Soft fluffy leavened tandoori bread brushed generously with pure butter',
    price: 50,
    category: 'Kulchas & Breads',
    tags: ['Veg'],
    isVeg: true,
  },
  {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    desc: 'Tandoori naan topped with roasted garlic and fresh cilantro',
    price: 60,
    category: 'Kulchas & Breads',
    tags: ['Veg'],
    isVeg: true,
  },
  {
    id: 'lachha-paratha',
    name: 'Lachha Paratha',
    desc: 'Multi-layered crispy whole wheat bread from clay tandoor',
    price: 70,
    category: 'Kulchas & Breads',
    tags: ['Veg'],
    isVeg: true,
  },

  // Starters
  {
    id: 'paneer-tikka',
    name: 'Tandoori Paneer Tikka',
    desc: 'Marinated paneer cubes grilled on skewers with bell peppers and mint chutney',
    price: 220,
    category: 'Tandoori Starters',
    tags: ['Veg', 'Chef Special'],
    isVeg: true,
    spicyLevel: 2,
    image: '/images/tandoori_tikka.jpg',
    popular: true,
  },
  {
    id: 'chicken-tikka',
    name: 'Sizzling Chicken Tikka',
    desc: 'Juicy boneless chicken marinated in yogurt and spices, chargrilled to perfection',
    price: 260,
    category: 'Tandoori Starters',
    tags: ['Non-Veg', 'Signature'],
    isVeg: false,
    spicyLevel: 3,
    image: '/images/tandoori_tikka.jpg',
    popular: true,
  },
  {
    id: 'amritsari-fish',
    name: 'Amritsari Fried Fish',
    desc: 'Fresh fish fillets coated in spiced carom seed gram flour batter, deep fried crispy',
    price: 320,
    category: 'Tandoori Starters',
    tags: ['Non-Veg', 'Authentic'],
    isVeg: false,
    spicyLevel: 2,
  },
  {
    id: 'seekh-kebab',
    name: 'Mutton Seekh Kebab',
    desc: 'Minced lamb blended with herbs and aromatic spices, roasted on charcoal skewers',
    price: 280,
    category: 'Tandoori Starters',
    tags: ['Non-Veg'],
    isVeg: false,
    spicyLevel: 3,
  },

  // Main Course
  {
    id: 'chole-bhature',
    name: 'Amritsari Chole Bhature',
    desc: '2 fluffy golden bhature served with dark spicy chickpea curry, pickled chili and onion',
    price: 150,
    category: 'Main Course',
    tags: ['Must Try', 'Bestseller'],
    isVeg: true,
    spicyLevel: 2,
    image: '/images/chole_bhature.jpg',
    popular: true,
  },
  {
    id: 'butter-chicken',
    name: 'Punjabi Butter Chicken',
    desc: 'Tender chicken tikka simmered in rich creamy tomato butter sauce with cashew paste',
    price: 280,
    category: 'Main Course',
    tags: ['Non-Veg', 'Bestseller'],
    isVeg: false,
    spicyLevel: 1,
    image: '/images/butter_chicken.jpg',
    popular: true,
  },
  {
    id: 'dal-makhani',
    name: 'Slow-Cooked Dal Makhani',
    desc: 'Overnight slow-cooked black lentils enriched with butter, cream and garlic aroma',
    price: 180,
    category: 'Main Course',
    tags: ['Veg', 'Classic'],
    isVeg: true,
    spicyLevel: 1,
    image: '/images/dal_makhani.jpg',
    popular: true,
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    desc: 'Fresh cottage cheese cubes in silky tomato and butter gravy',
    price: 240,
    category: 'Main Course',
    tags: ['Veg'],
    isVeg: true,
    spicyLevel: 1,
  },
  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    desc: 'Cottage cheese tossed with bell peppers and freshly ground kadai spices',
    price: 230,
    category: 'Main Course',
    tags: ['Veg'],
    isVeg: true,
    spicyLevel: 2,
  },
  {
    id: 'mutton-rogan-josh',
    name: 'Mutton Rogan Josh',
    desc: 'Tender mutton pieces braised in aromatic Kashmiri red chili gravy',
    price: 350,
    category: 'Main Course',
    tags: ['Non-Veg'],
    isVeg: false,
    spicyLevel: 3,
  },

  // Drinks
  {
    id: 'sweet-lassi',
    name: 'Amritsari Sweet Lassi',
    desc: 'Thick hand-churned yogurt drink topped with heavy malai cream and pistachios',
    price: 60,
    category: 'Lassi & Drinks',
    tags: ['Popular', 'Refreshing'],
    isVeg: true,
    image: '/images/punjabi_lassi.jpg',
    popular: true,
  },
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    desc: 'Blend of fresh Alphonso mango pulp and thick sweet yogurt',
    price: 80,
    category: 'Lassi & Drinks',
    tags: ['Seasonal'],
    isVeg: true,
  },
  {
    id: 'salted-lassi',
    name: 'Cumin Salted Lassi',
    desc: 'Savory refreshing buttermilk with roasted cumin powder and mint',
    price: 60,
    category: 'Lassi & Drinks',
    tags: ['Digestive'],
    isVeg: true,
  },

  // Desserts
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun (2 pcs)',
    desc: 'Soft warm khoya dumplings soaked in cardamom rose syrup',
    price: 80,
    category: 'Sweet Desserts',
    tags: ['Sweet'],
    isVeg: true,
  },
  {
    id: 'rasmalai',
    name: 'Saffron Rasmalai (2 pcs)',
    desc: 'Spongy cottage cheese disks soaked in chilled saffron rabri milk',
    price: 100,
    category: 'Sweet Desserts',
    tags: ['Popular'],
    isVeg: true,
  },
]

const CATEGORIES = ['All', 'Kulchas & Breads', 'Main Course', 'Tandoori Starters', 'Lassi & Drinks', 'Sweet Desserts']

export default function MenuClient() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'nonveg'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { cart, addToCart, updateQuantity } = useCart()

  const handleUpdateQuantity = (item: MenuItem, delta: number) => {
    const existing = cart.find((c) => c.id === item.id)
    if (!existing && delta > 0) {
      addToCart({ id: item.id, name: item.name, price: item.price, isVeg: item.isVeg, image: item.image })
    } else if (existing) {
      updateQuantity(item.id, delta)
    }
  }

  const getItemQuantity = (id: string) => {
    return cart.find((c) => c.id === id)?.quantity || 0
  }

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesDiet =
      dietaryFilter === 'all' || (dietaryFilter === 'veg' && item.isVeg) || (dietaryFilter === 'nonveg' && !item.isVeg)
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDiet && matchesSearch
  })

  return (
    <div className="min-h-screen pb-28">
      {/* Hero Banner */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/15 via-black/80 to-black z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <TextReveal as="span" className="text-xs font-black tracking-widest uppercase text-amber-500 mb-3 block" delay={0}>
            Authentic Punjabi Menu
          </TextReveal>
          <TextReveal as="h1" className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-4" delay={0.1}>
            Taste the <span className="gradient-text">Legendary Flavors</span>
          </TextReveal>
          <TextReveal as="p" className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8" delay={0.2}>
            50+ authentic dishes crafted live with pure ghee, fresh spices, and traditional Punjabi recipes since 2018.
          </TextReveal>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Kulcha, Butter Chicken, Lassi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-amber-500 shadow-xl text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs bg-white/10 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="sticky top-16 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Veg / Non-Veg Toggle */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dietaryFilter === 'all' ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'veg' ? 'bg-emerald-600 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Veg
            </button>
            <button
              onClick={() => setDietaryFilter('nonveg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'nonveg' ? 'bg-rose-600 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Non-Veg
            </button>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            <p className="text-2xl font-bold mb-2">No matching dishes found</p>
            <p className="text-sm">Try clearing your search query or filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id)
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card overflow-hidden hover:border-amber-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Dish Image */}
                    {item.image ? (
                      <div className="aspect-[16/9] relative overflow-hidden bg-black/40">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                              item.isVeg ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950/90 text-rose-400 border border-rose-500/40'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                          {item.popular && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black flex items-center gap-1 shadow-md">
                              <Flame className="w-3 h-3 fill-black" /> Popular
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 pt-6 flex justify-between items-start">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                            item.isVeg ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950/90 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-display font-extrabold text-white text-lg leading-snug">{item.name}</h3>
                        <span className="text-amber-400 font-display font-black text-xl shrink-0">₹{item.price}</span>
                      </div>

                      <p className="text-white/60 text-xs leading-relaxed mb-4">{item.desc}</p>

                      {/* Tags & Spicy meter */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {item.spicyLevel && (
                          <span className="text-xs text-amber-500/80 font-medium">
                            {'🌶️'.repeat(item.spicyLevel)}
                          </span>
                        )}
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 pt-0">
                    {qty === 0 ? (
                      <button
                        onClick={() => handleUpdateQuantity(item, 1)}
                        className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-amber-500/30"
                      >
                        <Plus className="w-4 h-4" /> Add to Order
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-amber-500 text-black rounded-xl p-1 font-bold">
                        <button
                          onClick={() => handleUpdateQuantity(item, -1)}
                          className="w-8 h-8 rounded-lg bg-black/10 hover:bg-black/20 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-display font-extrabold text-sm">{qty} in cart</span>
                        <button
                          onClick={() => handleUpdateQuantity(item, 1)}
                          className="w-8 h-8 rounded-lg bg-black/10 hover:bg-black/20 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}