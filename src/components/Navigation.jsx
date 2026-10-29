import React from 'react';
import { ChefHat, LayoutDashboard, UtensilsCrossed } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const Navigation = () => {
  const { view, setView } = useAppStore();

  const navItems = [
    { id: 'customer', icon: UtensilsCrossed, label: 'Customer' },
    { id: 'kds', icon: ChefHat, label: 'Kitchen' },
    { id: 'admin', icon: LayoutDashboard, label: 'Admin' }
  ];

  return (
    <nav className="bg-stone-900 text-stone-400 p-2 flex justify-center gap-4 text-sm sticky top-0 z-50 shadow-md">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button 
          key={id}
          onClick={() => setView(id)} 
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${view === id ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800 hover:text-stone-200'}`}
        >
          <Icon size={16}/> {label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;