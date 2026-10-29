import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const StickyCart = () => {
  const { getCartItemCount, getCartTotal } = useAppStore();
  const count = getCartItemCount();
  const total = getCartTotal();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div 
          initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
          className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center z-50"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag />
            <div>
              <p className="font-bold">{count} {count === 1 ? 'Item' : 'Items'}</p>
              <p className="text-sm opacity-90">₹{total}</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-emerald-700 font-bold rounded-xl active:scale-95 transition-transform">
            View Cart
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCart;