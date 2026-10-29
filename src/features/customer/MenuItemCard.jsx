import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Star } from 'lucide-react';
import DietaryIcon from '../../components/ui/DietaryIcon';
import FallbackImage from '../../components/ui/FallbackImage';
import { useAppStore } from '../../store/useAppStore';

const MenuItemCard = React.memo(({ item, index = 0 }) => {
  const cartItem = useAppStore(state => state.cart.find(entry => entry.id === item.id));
  const addToCart = useAppStore(state => state.addToCart);
  const removeFromCart = useAppStore(state => state.removeFromCart);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.035, 0.2) }}
      className="flex items-start gap-4"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-stone-100 shadow-sm sm:h-28 sm:w-28">
        <FallbackImage name={item.name} type={item.type} src={item.img} />
        <DietaryIcon type={item.type} className="absolute bottom-2 left-2" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col self-stretch py-1">
        <h3 className="mb-1 truncate text-[15px] font-bold leading-tight text-stone-900 sm:text-base">{item.name}</h3>
        <p className="mb-2 line-clamp-2 text-xs text-stone-500">{item.desc}</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="block text-sm font-bold text-stone-800">₹{item.price}</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs font-bold text-stone-700">
              <Star size={12} className="fill-amber-400 text-amber-400" /> {item.rating}
            </span>
          </div>
          {cartItem ? (
            <div className="flex w-[84px] shrink-0 items-center justify-between rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1.5">
              <button aria-label={`Remove one ${item.name}`} onClick={() => removeFromCart(item.id)} className="text-emerald-700 active:scale-95">
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-emerald-800">{cartItem.qty}</span>
              <button aria-label={`Add one ${item.name}`} onClick={() => addToCart(item)} className="text-emerald-700 active:scale-95">
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="flex min-w-[84px] shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100 active:scale-95"
            >
              Add <Plus size={13} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
});

MenuItemCard.displayName = 'MenuItemCard';
export default MenuItemCard;
