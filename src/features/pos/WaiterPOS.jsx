import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3, Calendar, ChefHat, ClipboardList, Minus, MonitorSmartphone,
  Plus, Search, Settings, ShoppingBag, Users, UtensilsCrossed, X,
} from 'lucide-react';
import DietaryIcon from '../../components/ui/DietaryIcon';
import FallbackImage from '../../components/ui/FallbackImage';
import { DINING_TABLES, MENU_CATEGORIES, MENU_ITEMS } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';

const WaiterPOS = () => {
  const [selectedTable, setSelectedTable] = useState(DINING_TABLES[1]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const cart = useAppStore(state => state.cart);
  const addToCart = useAppStore(state => state.addToCart);
  const removeFromCart = useAppStore(state => state.removeFromCart);
  const clearCart = useAppStore(state => state.clearCart);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = Math.round(subtotal * 1.05);
  const dishes = useMemo(() => MENU_ITEMS.filter(item => {
    const categoryMatches = activeCategory === 'All' || item.category === activeCategory;
    return categoryMatches && item.name.toLowerCase().includes(search.toLowerCase());
  }), [activeCategory, search]);

  const sendToKitchen = () => {
    if (!cart.length) return;
    clearCart();
    setMobileOrderOpen(false);
    setNotice(`Order sent to kitchen for ${selectedTable.label}`);
    window.setTimeout(() => setNotice(''), 3500);
  };

  return (
    <main className="flex min-h-[calc(100vh-48px)] flex-col overflow-hidden bg-[#F4F6F8] md:flex-row">
      <aside className="hidden w-20 shrink-0 flex-col items-center justify-between border-r border-stone-200 bg-white py-6 md:flex">
        <div className="flex flex-col items-center gap-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 font-serif text-xl font-bold text-white shadow-md">HJ</div>
          <nav aria-label="Waiter tools" className="flex flex-col gap-5 text-stone-400">
            {[MonitorSmartphone, Users, ClipboardList, Calendar, UtensilsCrossed, BarChart3, Settings].map((Icon, index) => (
              <button key={index} aria-label={`Waiter tool ${index + 1}`} className={`rounded-2xl p-3 transition-colors ${index === 0 ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-stone-100 hover:text-stone-700'}`}><Icon size={21} /></button>
            ))}
          </nav>
        </div>
        <div className="h-10 w-10 rounded-full bg-stone-200 text-center text-sm font-bold leading-10 text-stone-700">RS</div>
      </aside>

      <section className="flex min-h-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-stone-900 sm:text-xl">Hotel Jagdamba</h1>
              <p className="hidden truncate text-xs text-stone-500 sm:block">Contemporary Indian Cuisine · Waiter POS</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <label className="relative w-36 sm:w-56 lg:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search dishes..." className="w-full rounded-xl bg-stone-100 py-2 pl-9 pr-3 text-xs text-stone-700 outline-none focus:ring-2 focus:ring-emerald-700/20 sm:text-sm" />
            </label>
            <button onClick={() => setMobileOrderOpen(true)} className="relative rounded-xl bg-emerald-700 p-2.5 text-white shadow-md md:hidden" aria-label="Open current order">
              <ShoppingBag size={18} />
              {itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold">{itemCount}</span>}
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="min-w-0 flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div>
              <h2 className="text-xl font-bold text-stone-900 md:text-2xl">Dining Area</h2>
              <p className="text-xs text-stone-500 sm:text-sm">Select a table to manage orders or view active bills</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {DINING_TABLES.map(table => (
                <button key={table.id} onClick={() => setSelectedTable(table)} className={`flex h-32 flex-col justify-between rounded-2xl border-2 bg-white p-4 text-left shadow-sm transition-all ${selectedTable?.id === table.id ? 'border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-600/20' : 'border-stone-200 hover:border-stone-300'}`}>
                  <span className="flex w-full items-start justify-between gap-1">
                    <span className="truncate font-bold text-stone-900">{table.label}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${table.status === 'available' ? 'bg-stone-100 text-stone-600' : table.status === 'occupied' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>{table.status}</span>
                  </span>
                  <span className="flex items-end justify-between gap-1">
                    <span className="text-[11px] text-stone-500">{table.seats} seats</span>
                    {table.status === 'occupied' && <span className="text-right"><span className="block text-xs font-bold text-stone-950">{table.total}</span><span className="block text-[10px] text-stone-400">{table.time}</span></span>}
                  </span>
                </button>
              ))}
            </div>

            <section className="pt-2">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['All', ...MENU_CATEGORIES.slice(1).map(category => category.name)].map(category => (
                  <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${activeCategory === category ? 'bg-stone-900 text-white shadow-md' : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'}`}>{category}</button>
                ))}
              </div>
              {dishes.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {dishes.map(item => (
                    <article key={item.id} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                      <div className="relative mb-3 h-24 overflow-hidden rounded-xl sm:h-28">
                        <FallbackImage name={item.name} type={item.type} src={item.img} />
                        <DietaryIcon type={item.type} className="absolute left-2 top-2" />
                      </div>
                      <h3 className="truncate text-xs font-bold text-stone-900 sm:text-sm">{item.name}</h3>
                      <div className="mt-2 flex items-center justify-between gap-1">
                        <span className="truncate text-xs font-bold text-stone-800 sm:text-sm">₹{item.price}</span>
                        <button aria-label={`Add ${item.name} to order`} onClick={() => addToCart(item)} className="shrink-0 rounded-xl bg-emerald-50 p-2 text-emerald-700 transition-colors hover:bg-emerald-100"><Plus size={16} /></button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : <p className="rounded-2xl bg-white p-8 text-center text-sm text-stone-500">No dishes match your search.</p>}
            </section>
          </div>

          <aside className="hidden w-[360px] shrink-0 flex-col border-l border-stone-200 bg-white lg:flex xl:w-[420px]">
            <OrderPanel table={selectedTable} cart={cart} total={total} removeFromCart={removeFromCart} addToCart={addToCart} sendToKitchen={sendToKitchen} />
          </aside>
        </div>
      </section>

      <AnimatePresence>
        {mobileOrderOpen && (
          <>
            <motion.button aria-label="Close order drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOrderOpen(false)} className="fixed inset-0 z-40 bg-stone-900/40 lg:hidden" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-stone-200 bg-white sm:w-[420px] lg:hidden">
              <OrderPanel table={selectedTable} cart={cart} total={total} removeFromCart={removeFromCart} addToCart={addToCart} sendToKitchen={sendToKitchen} onClose={() => setMobileOrderOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notice && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-5 left-4 right-4 z-[60] mx-auto max-w-md rounded-xl bg-emerald-900 p-4 text-center text-sm font-semibold text-white shadow-xl">{notice}</motion.div>}
      </AnimatePresence>
    </main>
  );
};

const OrderPanel = ({ table, cart, total, removeFromCart, addToCart, sendToKitchen, onClose }) => (
  <>
    <header className="flex shrink-0 items-center justify-between border-b border-stone-200 bg-stone-50 p-4 sm:p-6 lg:bg-white">
      <div className="min-w-0">
        <h2 className="truncate text-lg font-bold text-stone-900 sm:text-xl">{table?.label || 'Select Table'}</h2>
        <p className="text-xs font-medium text-stone-500">{table?.seats || 0} seats · Dine In</p>
      </div>
      {onClose && <button aria-label="Close order drawer" onClick={onClose} className="rounded-full p-2 text-stone-500 hover:bg-stone-200"><X size={20} /></button>}
    </header>
    <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center text-stone-400">
          <ShoppingBag size={48} className="mb-2 opacity-30" />
          <p className="text-sm font-medium">No items added to order yet.</p>
        </div>
      ) : cart.map(item => (
        <article key={item.id} className="flex items-center justify-between gap-2 rounded-xl border border-stone-100 bg-stone-50 p-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-stone-900">{item.name}</h3>
            <p className="text-xs text-stone-500">Regular · ₹{item.price}</p>
            <p className="mt-1 text-sm font-bold text-emerald-700">₹{item.price * item.qty}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-stone-200 bg-white p-1 shadow-sm">
            <button aria-label={`Remove one ${item.name}`} onClick={() => removeFromCart(item.id)} className="p-1 text-stone-600"><Minus size={14} /></button>
            <span className="px-1 text-xs font-bold">{item.qty}</span>
            <button aria-label={`Add one ${item.name}`} onClick={() => addToCart(item)} className="p-1 text-stone-600"><Plus size={14} /></button>
          </div>
        </article>
      ))}
    </div>
    <footer className="shrink-0 space-y-4 border-t border-stone-200 bg-stone-50 p-4 sm:p-6">
      <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-bold text-stone-900"><span>Grand Total <span className="text-xs font-normal text-stone-500">(incl. 5% tax)</span></span><span>₹{total}</span></div>
      <button disabled={!cart.length} onClick={sendToKitchen} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B4627] py-3.5 font-bold text-white shadow-lg hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50">
        Send to Kitchen <ChefHat size={17} />
      </button>
    </footer>
  </>
);

export default WaiterPOS;
