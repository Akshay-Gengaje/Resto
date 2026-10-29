import React, { useMemo } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ANALYTICS_DATA } from '../../data/mockData';

const StatCard = React.memo(({ label, value, trend }) => (
  <article className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
    <p className="text-stone-500 text-sm font-medium">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {trend && <p className="text-emerald-500 text-sm mt-2">{trend}</p>}
  </article>
));

StatCard.displayName = 'StatCard';

const AdminDashboard = () => {
  // Memoize data to prevent re-renders on the chart unless data changes
  const chartData = useMemo(() => ANALYTICS_DATA, []);

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-stone-800">
          <LayoutDashboard /> Executive Dashboard
        </h1>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Revenue" value="₹41,000" trend="+12.5% from last week" />
        <StatCard label="Total Orders" value="128" />
        <StatCard label="Avg Order Value" value="₹320" />
      </section>
      
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-96">
        <h3 className="font-bold text-lg mb-6 text-stone-800">Weekly Sales Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#78716c' }} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} tick={{ fill: '#78716c' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
};

export default AdminDashboard;