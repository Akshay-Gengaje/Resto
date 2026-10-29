import React, { useMemo, useState } from 'react';
import { ChefHat, Maximize2, Volume2, VolumeX } from 'lucide-react';
import DietaryIcon from '../../components/ui/DietaryIcon';

const INITIAL_TICKETS = [
  { id: '#1028', table: 'T4 · Dine In', time: '11:24 AM', timer: '00:00', status: 'new', items: [{ name: 'Paneer Tikka', qty: 2, type: 'veg', note: 'Medium' }, { name: 'Masala Papad', qty: 1, type: 'veg', note: 'No onions' }] },
  { id: '#1029', table: 'T7 · Dine In', time: '11:23 AM', timer: '00:01', status: 'new', items: [{ name: 'Crispy Lotus Stem', qty: 1, type: 'veg', note: 'Extra Spicy' }, { name: 'Hara Bhara Kebab', qty: 2, type: 'veg' }] },
  { id: '#1026', table: 'T2 · Dine In', time: '11:18 AM', timer: '05:30', status: 'preparing', progress: 50, items: [{ name: 'Dal Makhani', qty: 1, type: 'veg', note: 'Normal' }, { name: 'Paneer Lababdar', qty: 2, type: 'veg', note: 'Less Spicy' }] },
  { id: '#1025', table: 'T1 · Dine In', time: '11:16 AM', timer: '07:20', status: 'preparing', progress: 70, items: [{ name: 'Mix Veg', qty: 1, type: 'veg' }, { name: 'Butter Naan', qty: 3, type: 'veg', note: 'Garlic' }] },
  { id: '#1024', table: 'T5 · Dine In', time: '11:10 AM', timer: '12:15', status: 'ready', items: [{ name: 'Aloo Tikki Chaat', qty: 2, type: 'veg' }, { name: 'Masala Chaas', qty: 2, type: 'veg' }] },
  { id: '#1022', table: 'T3 · Dine In', time: '11:05 AM', timer: '17:35', status: 'ready', items: [{ name: 'Paneer Tikka', qty: 1, type: 'veg' }, { name: 'Dal Makhani', qty: 1, type: 'veg' }] },
  { id: '#1021', table: 'T6 · Dine In', time: '10:55 AM', timer: '25m', status: 'completed', items: [{ name: 'Hara Bhara Kebab', qty: 2, type: 'veg' }, { name: 'Garlic Naan', qty: 2, type: 'veg' }] },
  { id: '#1020', table: 'T8 · Dine In', time: '10:42 AM', timer: '42m', status: 'completed', items: [{ name: 'Vegetable Biryani', qty: 2, type: 'veg' }, { name: 'Gulab Jamun', qty: 2, type: 'veg' }] },
];

const COLUMNS = [
  { status: 'new', title: 'New Orders', badge: 'bg-red-500/20 text-red-400' },
  { status: 'preparing', title: 'Preparing', badge: 'bg-amber-500/20 text-amber-400' },
  { status: 'ready', title: 'Ready', badge: 'bg-emerald-500/20 text-emerald-400' },
  { status: 'completed', title: 'Completed', badge: 'bg-stone-700 text-stone-300' },
];

const FILTERS = ['All Orders', 'Veg', 'Non-Veg', 'Starters', 'Main Course', 'Breads', 'Beverages'];

const KitchenDisplay = () => {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeFilter, setActiveFilter] = useState('All Orders');
  const [soundOn, setSoundOn] = useState(true);
  const [notice, setNotice] = useState('');
  const visibleTickets = useMemo(() => tickets.filter(ticket => {
    if (activeFilter === 'All Orders') return true;
    if (activeFilter === 'Veg') return ticket.items.some(item => item.type === 'veg');
    if (activeFilter === 'Non-Veg') return ticket.items.some(item => item.type === 'non-veg');
    return ticket.items.some(item => {
      if (activeFilter === 'Starters') return /tikka|papad|kebab|chaat|lotus/i.test(item.name);
      if (activeFilter === 'Main Course') return /thali|dal|paneer|mix veg/i.test(item.name);
      if (activeFilter === 'Breads') return /naan|bhakri|roti/i.test(item.name);
      return /chaas|beverage/i.test(item.name);
    });
  }), [activeFilter, tickets]);

  const moveTicket = (id, status) => {
    setTickets(current => current.map(ticket => ticket.id === id ? { ...ticket, status, progress: status === 'preparing' ? 50 : undefined } : ticket));
  };

  const rejectTicket = id => {
    setTickets(current => current.filter(ticket => ticket.id !== id));
    setNotice(`${id} was removed from the kitchen queue.`);
    window.setTimeout(() => setNotice(''), 3000);
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setNotice('Fullscreen is not available in this browser.');
      window.setTimeout(() => setNotice(''), 3000);
    }
  };

  return (
    <main className="min-h-[calc(100vh-48px)] overflow-x-hidden bg-[#121417] p-4 font-sans text-stone-100 sm:p-6 lg:p-8">
      <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-stone-800 bg-[#1A1D24] p-4 shadow-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-600/20 text-emerald-400"><ChefHat size={22} /></span>
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 truncate text-lg font-bold text-stone-100 sm:text-xl">
              Hotel Jagdamba <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">Live KDS</span>
            </h1>
            <p className="truncate text-xs text-stone-400">Kitchen Display System</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${activeFilter === filter ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#262A33] text-stone-300 hover:bg-[#323743]'}`}>
              {filter}{filter === 'All Orders' ? ` ${tickets.filter(ticket => ticket.status !== 'completed').length}` : ''}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <div className="rounded-xl border border-stone-700 bg-[#262A33] px-3 py-1.5 text-xs font-semibold text-stone-300">
            {new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', weekday: 'short', day: 'numeric', month: 'short' }).format(new Date())}
          </div>
          <button aria-label={soundOn ? 'Mute sound' : 'Enable sound'} aria-pressed={soundOn} onClick={() => setSoundOn(value => !value)} className="rounded-xl border border-stone-700 bg-[#262A33] p-2 text-stone-300 hover:bg-[#323743]">
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button aria-label="Toggle fullscreen" onClick={toggleFullscreen} className="rounded-xl border border-stone-700 bg-[#262A33] p-2 text-stone-300 hover:bg-[#323743]"><Maximize2 size={16} /></button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map(column => {
          const columnTickets = visibleTickets.filter(ticket => ticket.status === column.status);
          return (
            <section key={column.status} className="flex flex-col gap-4 rounded-2xl border border-stone-800 bg-[#181B22] p-4 shadow-lg">
              <header className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h2 className="flex items-center gap-2 truncate text-base font-bold text-stone-200">{column.title}<span className={`rounded-full px-2 py-0.5 text-xs font-bold ${column.badge}`}>{columnTickets.length}</span></h2>
              </header>
              {columnTickets.length ? columnTickets.map(ticket => (
                <article key={ticket.id} className={`rounded-xl border bg-[#20242D] p-4 shadow-md ${ticket.status === 'new' ? 'border-red-500/50 shadow-red-500/5' : ticket.status === 'ready' ? 'border-emerald-500/50 shadow-emerald-500/5' : 'border-stone-700/60'}`}>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="shrink-0 text-lg font-bold text-white">{ticket.id}</span>
                      <span className="truncate text-xs font-medium text-stone-400">{ticket.table}</span>
                    </div>
                    <span className={`shrink-0 rounded-md px-2.5 py-0.5 font-mono text-sm font-bold ${ticket.status === 'new' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{ticket.timer}</span>
                  </div>
                  <div className="mb-4 space-y-3 border-y border-stone-800 py-3">
                    {ticket.items.map((item, index) => (
                      <div key={`${ticket.id}-${item.name}-${index}`} className="flex items-start justify-between gap-2 text-sm">
                        <div className="flex min-w-0 flex-1 items-start gap-2">
                          <span className="shrink-0 font-bold text-amber-400">×{item.qty}</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium leading-tight text-stone-200">{item.name}</p>
                            {item.note && <p className="mt-0.5 truncate text-[11px] italic text-amber-300/80">🔥 {item.note}</p>}
                          </div>
                        </div>
                        <DietaryIcon type={item.type} className="mt-0.5" />
                      </div>
                    ))}
                  </div>
                  {ticket.status === 'preparing' && (
                    <div className="mb-4">
                      <div className="mb-1 flex justify-between text-[10px] font-semibold text-stone-400"><span>Preparation</span><span>{ticket.progress}%</span></div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800"><div className="h-full rounded-full bg-amber-500" style={{ width: `${ticket.progress}%` }} /></div>
                    </div>
                  )}
                  {ticket.status === 'new' && <div className="flex gap-2">
                    <button onClick={() => rejectTicket(ticket.id)} className="flex-1 rounded-lg bg-stone-800 py-2 text-xs font-bold text-stone-300 transition-colors hover:bg-stone-700">Reject</button>
                    <button onClick={() => moveTicket(ticket.id, 'preparing')} className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-red-700">Accept</button>
                  </div>}
                  {ticket.status === 'preparing' && <button onClick={() => moveTicket(ticket.id, 'ready')} className="w-full rounded-lg bg-amber-500 py-2.5 text-xs font-bold text-stone-950 shadow-md transition-colors hover:bg-amber-600">Mark as Ready</button>}
                  {ticket.status === 'ready' && <button onClick={() => moveTicket(ticket.id, 'completed')} className="w-full rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-emerald-700">Mark as Served</button>}
                  {ticket.status === 'completed' && <p className="text-center text-xs font-semibold text-emerald-400">Order completed</p>}
                </article>
              )) : <p className="rounded-xl border border-dashed border-stone-700 p-6 text-center text-sm text-stone-500">No orders in this column.</p>}
            </section>
          );
        })}
      </section>
      {notice && <div role="status" className="fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-md rounded-xl bg-stone-800 px-4 py-3 text-center text-sm text-white shadow-xl">{notice}</div>}
    </main>
  );
};

export default KitchenDisplay;
