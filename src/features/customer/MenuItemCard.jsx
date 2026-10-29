import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import FallbackImage from '../../components/ui/FallbackImage';
import { useAppStore } from '../../store/useAppStore';

const MenuItemCard = React.memo(({ item, index }) => {
  const { cart, addToCart, removeFromCart } = useAppStore();
  const cartItem = cart.find(c => c.id === item.id);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <FallbackImage name={item.name} type={item.type} />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <span className="font-semibold text-stone-600">₹{item.price}</span>
        </div>
        <p className="text-sm text-stone-500 mb-4">{item.desc}</p>
        
        {cartItem ? (
          <div className="flex items-center justify-between bg-stone-100 rounded-full p-1 w-32">
            <button onClick={() => removeFromCart(item.id)} className="p-2 bg-white rounded-full shadow-sm hover:bg-stone-50 transition-colors"><Minus size={16} /></button>
            <span className="font-semibold">{cartItem.qty}</span>
            <button onClick={() => addToCart(item)} className="p-2 bg-stone-900 text-white rounded-full shadow-sm hover:bg-stone-800 transition-colors"><Plus size={16} /></button>
          </div>
        ) : (
          <button 
            onClick={() => addToCart(item)} 
            className="w-full py-2 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors active:scale-[0.98]"
          >
            Add to Order
          </button>
        )}
      </div>
    </motion.article>
  );
});

MenuItemCard.displayName = 'MenuItemCard';
export default MenuItemCard;