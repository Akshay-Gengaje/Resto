import React, { useState } from 'react';
import {
  ArrowUpRight, BarChart3, Bell, Calendar, ChevronDown, ClipboardList, CreditCard,
  DollarSign, Layers, LayoutDashboard, LogOut, Menu, MonitorSmartphone, Settings,
  Tag, UtensilsCrossed, Users,
} from 'lucide-react';
import {
  CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import FallbackImage from '../../components/ui/FallbackImage';
import { ANALYTICS_DATA, DINING_TABLES, MENU_ITEMS, ORDER_STATUS_DATA, RECENT_ORDERS } from '../../data/mockData';

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ClipboardList, count: 12 },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
  { id: 'tables', label: 'Tables', icon: MonitorSmartphone },
  { id: 'reservations', label: 'Reservations', icon: Calendar },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'inventory', label: 'Inventory', icon: Layers },
  { id: 'offers', label: 'Offers & Coupons', icon: Tag },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const STATUS_STYLES = {
  New: 'bg-red-100 text-red-700',
  Preparing: 'bg-amber-100 text-amber-800',
  Ready: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-stone-100 text-stone-700',
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const activeLabel = NAV_ITEMS.find(item => item.id === activeTab)?.label || 'Dashboard';
  const dateLabel = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());

  const selectTab = id => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <main className="flex min-h-[calc(100vh-48px)] overflow-x-hidden bg-[#F8F9FA]">
      <aside className={`fixed inset-y-0 left-0 z-[60] flex w-64 shrink-0 flex-col justify-between bg-[#121417] p-5 text-stone-300 transition-transform duration-300 lg:sticky lg:top-0 lg:h-[calc(100vh-48px)] lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="overflow-y-auto">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 font-serif text-xl font-bold text-white shadow-md">HJ</div>
            <div>
              <h2 className="text-sm font-bold text-white">Hotel Jagdamba</h2>
              <p className="text-[10px] text-stone-400">Restaurant Admin</p>
            </div>
          </div>
          <nav aria-label="Admin navigation" className="space-y-1.5 text-sm">
            {NAV_ITEMS.map(({ id, label, icon: Icon, count }) => (
              <button key={id} onClick={() => selectTab(id)} className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-medium transition-colors ${activeTab === id ? 'bg-emerald-700 text-white shadow-lg' : 'text-stone-400 hover:bg-stone-800'}`}>
                <span className="flex items-center gap-3"><Icon size={18} />{label}</span>
                {count && <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">{count}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-stone-800 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs font-bold text-emerald-100">RS</div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">Rahul Sharma</p>
              <p className="truncate text-[10px] text-stone-400">Owner</p>
            </div>
          </div>
          <button aria-label="Sign out" className="text-stone-400 transition-colors hover:text-red-400"><LogOut size={18} /></button>
        </div>
      </aside>

      {sidebarOpen && <button aria-label="Close admin menu" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-50 bg-stone-900/40 lg:hidden" />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button aria-label="Open admin menu" onClick={() => setSidebarOpen(true)} className="shrink-0 rounded-lg p-2 text-stone-600 hover:bg-stone-100 lg:hidden"><Menu size={22} /></button>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-stone-900 lg:text-2xl">{activeTab === 'overview' ? 'Welcome Back 👋' : activeLabel}</h1>
              <p className="truncate text-xs text-stone-500">Here’s what’s happening at Hotel Jagdamba today.</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-700 sm:flex"><Calendar size={14} className="text-stone-500" />{dateLabel}</div>
            <button aria-label="Notifications" className="relative rounded-xl border border-stone-200 bg-stone-100 p-2 text-stone-700 hover:bg-stone-200">
              <Bell size={18} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-600" />
            </button>
            <button aria-label="Account options" className="hidden rounded-xl p-2 text-stone-500 hover:bg-stone-100 sm:block"><ChevronDown size={16} /></button>
          </div>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto p-4 sm:p-6 lg:p-10">
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'orders' && <OrdersView />}
          {activeTab === 'menu' && <MenuView />}
          {activeTab === 'tables' && <TablesView />}
          {!['overview', 'orders', 'menu', 'tables'].includes(activeTab) && (
            <section className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Settings size={22} /></div>
              <h2 className="text-lg font-bold text-stone-900">{activeLabel}</h2>
              <p className="mt-2 text-sm text-stone-500">This workspace is ready for your {activeLabel.toLowerCase()} data.</p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

const DashboardOverview = () => (
  <>
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Sales" value="₹28,540" trend="+12%" icon={DollarSign} iconStyle="bg-emerald-50 text-emerald-700" />
      <StatCard label="Total Orders" value="142" trend="+8%" icon={ClipboardList} iconStyle="bg-blue-50 text-blue-700" />
      <StatCard label="Avg Order Value" value="₹342" trend="+4.2%" icon={CreditCard} iconStyle="bg-amber-50 text-amber-700" />
      <StatCard label="Active Tables" value="18 / 24" trend="75% occupancy" icon={MonitorSmartphone} iconStyle="bg-purple-50 text-purple-700" />
    </section>

    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
        <div className="mb-5 flex items-center justify-between">
          <div><h2 className="text-lg font-bold text-stone-900">Sales Overview</h2><p className="text-xs text-stone-500">Revenue over the last 7 days</p></div>
          <button className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600">This week <ChevronDown size={13} className="ml-1 inline" /></button>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ANALYTICS_DATA} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#78716C', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${value / 1000}K`} tick={{ fill: '#78716C', fontSize: 12 }} width={48} />
              <Tooltip formatter={value => [`₹${Number(value).toLocaleString('en-IN')}`, 'Sales']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="sales" stroke="#0B4627" strokeWidth={3} dot={{ r: 4, fill: '#0B4627' }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div><h2 className="text-lg font-bold text-stone-900">Order Status</h2><p className="mb-4 text-xs text-stone-500">Distribution of current orders</p></div>
        <div className="relative flex h-56 w-full items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={ORDER_STATUS_DATA} cx="50%" cy="50%" innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value">
                {ORDER_STATUS_DATA.map(entry => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-stone-900">142</span><span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">Total</span>
          </div>
        </div>
        <div className="space-y-2 pt-2">
          {ORDER_STATUS_DATA.map(item => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium text-stone-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
              <span className="font-bold text-stone-900">{item.value} ({Math.round(item.value / 142 * 100)}%)</span>
            </div>
          ))}
        </div>
      </article>
    </section>

    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <TopDishes />
      <RecentOrders className="lg:col-span-2" />
    </section>
  </>
);

const StatCard = ({ label, value, trend, icon: Icon, iconStyle }) => (
  <article className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">{label}</span>
      <span className={`rounded-xl p-2 ${iconStyle}`}><Icon size={18} /></span>
    </div>
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-stone-900">{value}</h2>
      <p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600"><ArrowUpRight size={14} />{trend}</p>
    </div>
  </article>
);

const TopDishes = () => {
  const topItems = [MENU_ITEMS[0], MENU_ITEMS[1], MENU_ITEMS[3], MENU_ITEMS[5], MENU_ITEMS[2]];
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6"><h2 className="text-lg font-bold text-stone-900">Top Selling Dishes</h2><p className="text-xs text-stone-500">Based on order quantity</p></div>
      <div className="space-y-4">
        {topItems.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="w-4 text-sm font-bold text-stone-400">{index + 1}</span>
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl"><FallbackImage name={item.name} type={item.type} src={item.img} /></div>
              <div className="min-w-0"><p className="truncate text-sm font-bold text-stone-900">{item.name}</p><p className="text-[11px] text-stone-500">{48 - index * 4} orders</p></div>
            </div>
            <span className="shrink-0 text-sm font-bold text-stone-900">₹{item.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

const RecentOrders = ({ className = '' }) => (
  <article className={`overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
    <div className="mb-6"><h2 className="text-lg font-bold text-stone-900">Recent Orders</h2><p className="text-xs text-stone-500">Live order status and fulfillment</p></div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead><tr className="border-b border-stone-100 text-xs font-bold uppercase text-stone-400">
          <th className="pb-3">Order</th><th className="pb-3">Time</th><th className="pb-3">Table</th><th className="pb-3">Items</th><th className="pb-3">Amount</th><th className="pb-3">Status</th>
        </tr></thead>
        <tbody className="divide-y divide-stone-100 text-sm">
          {RECENT_ORDERS.map(order => (
            <tr key={order.id} className="transition-colors hover:bg-stone-50/50">
              <td className="py-4 font-bold text-stone-900">{order.id}</td><td className="py-4 text-xs text-stone-500">{order.time}</td>
              <td className="py-4 font-medium text-stone-800">{order.table}</td><td className="py-4 text-xs text-stone-600">{order.items}</td>
              <td className="py-4 font-bold text-stone-900">{order.amount}</td>
              <td className="py-4"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[order.status]}`}>{order.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </article>
);

const OrdersView = () => <RecentOrders />;

const MenuView = () => (
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {MENU_ITEMS.map(item => (
      <article key={item.id} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"><FallbackImage name={item.name} type={item.type} src={item.img} /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-emerald-700">{item.category}</p><h2 className="truncate font-bold text-stone-900">{item.name}</h2>
          <p className="mt-1 line-clamp-2 text-xs text-stone-500">{item.desc}</p><p className="mt-2 font-bold text-stone-900">₹{item.price}</p>
        </div>
      </article>
    ))}
  </section>
);

const TablesView = () => (
  <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
    {DINING_TABLES.map(table => (
      <article key={table.id} className="flex h-32 flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2"><h2 className="font-bold text-stone-900">{table.label}</h2><span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${table.status === 'occupied' ? 'bg-red-100 text-red-700' : table.status === 'reserved' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}`}>{table.status}</span></div>
        <div className="flex items-end justify-between"><span className="text-xs text-stone-500">{table.seats} seats</span><span className="text-right text-xs font-bold text-stone-800">{table.total}<span className="block font-normal text-stone-400">{table.time}</span></span></div>
      </article>
    ))}
  </section>
);

export default AdminDashboard;
