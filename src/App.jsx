import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import { useAppStore } from './store/useAppStore';

const CustomerMenu = lazy(() => import('./features/customer/CustomerMenu'));
const WaiterPOS = lazy(() => import('./features/pos/WaiterPOS'));
const KitchenDisplay = lazy(() => import('./features/kitchen/KitchenDisplay'));
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));

const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center" role="status" aria-label="Loading view">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-stone-900" />
  </div>
);

export default function App() {
  const view = useAppStore(state => state.view);

  return (
    <div className="min-h-screen font-sans">
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          <Suspense fallback={<Loader />}>
            {view === 'customer' && <CustomerMenu />}
            {view === 'pos' && <WaiterPOS />}
            {view === 'kds' && <KitchenDisplay />}
            {view === 'admin' && <AdminDashboard />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
