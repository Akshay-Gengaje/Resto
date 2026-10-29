import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check, ChefHat, ChevronLeft, Heart, MoreHorizontal, Search, ShoppingBag,
  Star, UtensilsCrossed, X,
} from 'lucide-react';
import DietaryIcon from '../../components/ui/DietaryIcon';
import FallbackImage from '../../components/ui/FallbackImage';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';
import MenuItemCard from './MenuItemCard';
import StickyCart from './StickyCart';

const CustomerMenu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cart = useAppStore(state => state.cart);
  const addToCart = useAppStore(state => state.addToCart);
  const removeFromCart = useAppStore(state => state.removeFromCart);
  const clearCart = useAppStore(state => state.clearCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const specials = MENU_ITEMS.filter(item => item.isSpecial);
  const filteredItems = useMemo(() => MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, searchTerm]);

  const placeOrder = () => {
    clearCart();
    setCheckoutOpen(false);
    setOrderPlaced(true);
    window.setTimeout(() => setOrderPlaced(false), 3500);
  };

  return (
    <main className="relative mx-auto min-h-screen max-w-md overflow-x-hidden border-x border-stone-100 bg-white pb-28 shadow-xl">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/95 px-4 py-4 backdrop-blur">
        <button aria-label="Back" className="rounded-full p-2 text-stone-700 hover:bg-stone-100"><ChevronLeft size={23} /></button>
        <div className="flex items-center gap-4 text-stone-700">
          <button aria-label="Search menu" onClick={() => setSearchOpen(open => !open)} className="rounded-full p-2 hover:bg-stone-100"><Search size={20} /></button>
          <button aria-label="Favorites" className="rounded-full p-2 hover:bg-stone-100"><Heart size={20} /></button>
          <button aria-label="More options" className="rounded-full p-2 hover:bg-stone-100"><MoreHorizontal size={20} /></button>
        </div>
      </header>

      <div className="px-5">
        {searchOpen && (
          <label className="mb-4 flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
            <Search size={16} className="text-stone-400" />
            <input autoFocus value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search dishes" className="w-full bg-transparent text-sm outline-none" />
            <button aria-label="Close search" onClick={() => { setSearchOpen(false); setSearchTerm(''); }}><X size={16} /></button>
          </label>
        )}

        <section className="mb-6 mt-1 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-2 truncate text-2xl font-bold text-stone-900">Hotel Jagdamba <span className="text-xl text-emerald-600">🌿</span></h1>
            <p className="mt-1 truncate text-sm text-stone-500">Contemporary Indian Cuisine</p>
            <div className="mt-2 flex flex-wrap items-center gap-1 text-xs font-medium text-stone-500">
              <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-700">4.8</span> (1.2K) · 25-35 mins · Pure Veg <DietaryIcon type="veg" className="ml-1" />
            </div>
          </div>
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-100 shadow-sm">
            <FallbackImage name="Hotel Jagdamba" type="veg" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80" />
          </div>
        </section>

        <button onClick={() => setCheckoutOpen(true)} className="mb-6 flex w-full items-center justify-between rounded-2xl bg-[#F5F8F6] p-4 text-left">
          <span className="flex items-center gap-3">
            <span className="rounded-lg bg-white p-2 text-emerald-800 shadow-sm"><UtensilsCrossed size={20} /></span>
            <span>
              <span className="block text-sm font-bold text-stone-900">Table T12</span>
              <span className="block text-xs text-stone-500">Dine-in Ordering</span>
            </span>
          </span>
          <span className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-800 shadow-sm">View Bill</span>
        </button>

        <nav aria-label="Menu categories" className="-mx-5 mb-6 flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {MENU_CATEGORIES.map(category => (
            <button key={category.name} onClick={() => setActiveCategory(category.name)} className="flex min-w-[64px] shrink-0 flex-col items-center gap-2">
              <span className={`h-16 w-16 overflow-hidden rounded-full border-2 ${activeCategory === category.name ? 'border-emerald-700' : 'border-transparent'}`}>
                {category.name === 'All'
                  ? <span className="flex h-full w-full items-center justify-center bg-emerald-800 text-white"><ShoppingBag size={22} /></span>
                  : <FallbackImage name={category.name} type="veg" src={category.img} />}
              </span>
              <span className={`whitespace-nowrap text-xs font-semibold ${activeCategory === category.name ? 'border-b-2 border-emerald-700 pb-1 text-stone-900' : 'text-stone-600'}`}>{category.name}</span>
            </button>
          ))}
        </nav>

        {activeCategory === 'All' && !searchTerm && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900"><ChefHat size={20} className="text-emerald-700" /> Chef’s Specials</h2>
              <button onClick={() => setActiveCategory('All')} className="text-xs font-bold text-emerald-700">See all</button>
            </div>
            <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-3 scrollbar-hide">
              {specials.map(item => (
                <article key={item.id} className="flex w-[210px] shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
                  <div className="relative h-32">
                    <FallbackImage name={item.name} type={item.type} src={item.img} />
                    <DietaryIcon type={item.type} className="absolute left-2 top-2" />
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="mb-1 truncate text-sm font-bold text-stone-900">{item.name}</h3>
                    <p className="mb-3 line-clamp-2 text-[11px] text-stone-500">{item.desc}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900">₹{item.price}</span>
                      <button onClick={() => addToCart(item)} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100">Add +</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-6 pb-8">
          <h2 className="text-lg font-bold text-stone-900">{activeCategory === 'All' ? 'All Dishes' : activeCategory}</h2>
          {filteredItems.length ? filteredItems.map((item, index) => <MenuItemCard key={item.id} item={item} index={index} />) : (
            <p className="rounded-2xl bg-stone-50 p-6 text-center text-sm text-stone-500">No dishes found. Try another search or category.</p>
          )}
        </section>
      </div>

      <StickyCart onOpen={() => setCheckoutOpen(true)} />

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[60] mx-auto flex max-w-md flex-col overflow-hidden bg-[#F2F4F7]">
            <header className="flex shrink-0 items-center gap-3 bg-white px-4 py-4 shadow-sm">
              <button aria-label="Close cart" onClick={() => setCheckoutOpen(false)} className="rounded-full bg-stone-100 p-2 text-stone-600"><ChevronLeft size={20} /></button>
              <h2 className="text-lg font-bold text-stone-900">Your Cart</h2>
              <span className="ml-auto text-sm text-stone-500">{itemCount} items</span>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center text-sm text-stone-500">Your cart is empty. Add a dish to get started.</div>
              ) : (
                <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-stone-500">₹{item.price} × {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-stone-200 p-1">
                        <button aria-label={`Remove one ${item.name}`} onClick={() => removeFromCart(item.id)} className="p-1 text-stone-600"><span className="sr-only">Remove</span>−</button>
                        <span className="text-xs font-bold">{item.qty}</span>
                        <button aria-label={`Add one ${item.name}`} onClick={() => addToCart(item)} className="p-1 text-stone-600"><span className="sr-only">Add</span>+</button>
                      </div>
                      <span className="shrink-0 font-bold text-[#0B4627]">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="shrink-0 border-t border-stone-200 bg-white p-4">
              <div className="mb-3 flex justify-between text-sm text-stone-600"><span>Subtotal</span><span>₹{total}</span></div>
              <button disabled={!cart.length} onClick={placeOrder} className="w-full rounded-xl bg-[#0B4627] py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
                Place Order · ₹{total}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderPlaced && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-6 left-4 right-4 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-emerald-900 p-4 text-white shadow-xl">
            <span className="rounded-full bg-white/15 p-2"><Check size={18} /></span>
            <span><strong className="block text-sm">Order placed</strong><span className="text-xs text-white/75">Your kitchen is preparing your meal.</span></span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CustomerMenu;
