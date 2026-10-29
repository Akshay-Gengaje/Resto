import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const KitchenDisplay = () => {
  const statuses = ['Pending', 'Preparing', 'Ready'];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3"><ChefHat /> Kitchen Display System</h1>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map(status => (
          <div key={status} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-neutral-400">{status}</h2>
            
            {/* Mock Ticket - Only in Pending for demo */}
            {status === 'Pending' && (
              <motion.article 
                layout 
                className="bg-neutral-800 p-4 rounded-lg border-l-4 border-yellow-500 cursor-pointer hover:bg-neutral-750 transition-colors"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-lg">Table 4</span>
                  <span className="text-neutral-400 text-sm">2m ago</span>
                </div>
                <ul className="space-y-1 mb-4 text-sm text-neutral-300">
                  <li>2x Gavran Chicken Thali</li>
                  <li>1x Dal Khichdi Tadka</li>
                </ul>
                <button className="w-full py-2 bg-yellow-500/20 text-yellow-500 rounded font-medium hover:bg-yellow-500/30 transition-colors">
                  Start Preparing
                </button>
              </motion.article>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default KitchenDisplay;