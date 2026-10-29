import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  view: 'admin',
  setView: (view) => set({ view }),
  
  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id);
    if (existing) {
      return { cart: state.cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { cart: [...state.cart, { ...item, qty: 1 }] };
  }),
  
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0)
  })),
  clearCart: () => set({ cart: [] }),

  // Memoized selectors conceptually provided here
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.qty), 0);
  },
  getCartItemCount: () => {
    return get().cart.reduce((count, item) => count + item.qty, 0);
  }
}));