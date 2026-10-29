import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import { useAppStore } from './store/useAppStore';

// Code Splitting (Lazy Loading) for better initial performance
const CustomerMenu = lazy(() => import('./features/customer/CustomerMenu'));
const KitchenDisplay = lazy(() => import('./features/kitchen/KitchenDisplay'));
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));

// Reusable Fallback Loader
const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-stone-900"></div>
  </div>
);

export default function App() {
  const { view } = useAppStore();

  return (
    <div className="min-h-screen font-sans">
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Suspense fallback={<Loader />}>
            {view === 'customer' && <CustomerMenu />}
            {view === 'kds' && <KitchenDisplay />}
            {view === 'admin' && <AdminDashboard />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}