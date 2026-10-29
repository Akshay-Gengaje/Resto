import React from 'react';
import { ChefHat, LayoutDashboard, MonitorSmartphone, UtensilsCrossed } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const NAV_ITEMS = [
  { id: 'customer', icon: UtensilsCrossed, label: 'Customer' },
  { id: 'pos', icon: MonitorSmartphone, label: 'POS' },
  { id: 'kds', icon: ChefHat, label: 'Kitchen' },
  { id: 'admin', icon: LayoutDashboard, label: 'Admin' },
];

const Navigation = () => {
  const view = useAppStore(state => state.view);
  const setView = useAppStore(state => state.setView);

  return (
    <nav aria-label="Restaurant views" className="sticky top-0 z-50 flex justify-center gap-2 overflow-x-auto bg-stone-900 p-2 text-sm text-stone-400 shadow-md sm:gap-4">
      {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          aria-current={view === id ? 'page' : undefined}
          className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 transition-colors ${view === id ? 'bg-stone-800 font-bold text-white' : 'hover:bg-stone-800 hover:text-stone-200'}`}
        >
          <Icon size={16} />{label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
