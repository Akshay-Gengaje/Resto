import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const StickyCart = ({ onOpen }) => {
  const count = useAppStore(state => state.getCartItemCount());
  const total = useAppStore(state => state.getCartTotal());

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          type="button"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          onClick={onOpen}
          className="fixed bottom-5 left-4 right-4 z-40 mx-auto flex max-w-md items-center justify-between rounded-full bg-[#0B4627] px-4 py-3 text-left text-white shadow-2xl"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#0B4627]">{count}</span>
            <span className="truncate text-sm font-medium">View Cart <span className="mx-2 text-white/50">|</span> ₹{total}</span>
          </span>
          <ChevronRight size={20} className="shrink-0" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default StickyCart;
