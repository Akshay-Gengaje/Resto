import React from 'react';
import { MENU_ITEMS } from '../../data/mockData';
import MenuItemCard from './MenuItemCard';
import StickyCart from './StickyCart';

const CustomerMenu = () => {
  return (
    <main className="max-w-md mx-auto bg-stone-100 min-h-screen pb-24 shadow-xl">
      <header className="bg-stone-900 text-stone-50 p-8 rounded-b-[2.5rem] shadow-lg mb-8">
        <h1 className="text-3xl font-serif mb-2">Hotel Jagdamba</h1>
        <p className="text-stone-400">Authentic Maharashtrian Cuisine</p>
      </header>
      
      <section className="px-4 space-y-6">
        {MENU_ITEMS.map((item, index) => (
          <MenuItemCard key={item.id} item={item} index={index} />
        ))}
      </section>
      
      <StickyCart />
    </main>
  );
};

export default CustomerMenu;