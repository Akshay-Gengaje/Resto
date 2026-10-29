export const MENU_ITEMS = [
  {
    id: 1,
    name: 'Gavran Chicken Thali',
    price: 350,
    type: 'non-veg',
    category: 'Main Course',
    desc: 'Authentic Maharashtrian spicy chicken thali with bhakri and rassa.',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    rating: 4.8,
    isSpecial: true,
  },
  {
    id: 2,
    name: 'Mutton Alani Rice',
    price: 400,
    type: 'non-veg',
    category: 'Rice & Biryani',
    desc: 'Flavorful mutton stock rice, a signature specialty.',
    img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    rating: 4.9,
    isSpecial: true,
  },
  {
    id: 3,
    name: 'Crispy Lotus Stem',
    price: 290,
    type: 'veg',
    category: 'Starters',
    desc: 'Crispy lotus stem with tangy spices and fresh herbs.',
    img: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&q=80',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Chicken Dum Biryani',
    price: 300,
    type: 'non-veg',
    category: 'Rice & Biryani',
    desc: 'Slow-cooked aromatic chicken biryani with premium basmati.',
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Mutton Dum Biryani',
    price: 420,
    type: 'non-veg',
    category: 'Rice & Biryani',
    desc: 'Tender mutton layered with fragrant rice and whole spices.',
    img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Dal Khichdi Tadka',
    price: 200,
    type: 'veg',
    category: 'Rice & Biryani',
    desc: 'Comforting tempered dal and rice finished with pure ghee.',
    img: 'https://images.unsplash.com/photo-1546833998-31bb74ee157b?w=800&q=80',
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Butter Naan',
    price: 60,
    type: 'veg',
    category: 'Breads',
    desc: 'Soft, tandoor-baked naan brushed with butter.',
    img: 'https://images.unsplash.com/photo-1565557612187-c152702ccb72?w=800&q=80',
    rating: 4.6,
  },
  {
    id: 8,
    name: 'Masala Chaas',
    price: 120,
    type: 'veg',
    category: 'Beverages',
    desc: 'Chilled buttermilk blended with roasted cumin and herbs.',
    img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=800&q=80',
    rating: 4.5,
  },
];

export const MENU_CATEGORIES = [
  { name: 'All', img: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=200&q=80' },
  { name: 'Starters', img: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=200&q=80' },
  { name: 'Main Course', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80' },
  { name: 'Breads', img: 'https://images.unsplash.com/photo-1565557612187-c152702ccb72?w=200&q=80' },
  { name: 'Rice & Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80' },
  { name: 'Beverages', img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=200&q=80' },
];

export const ANALYTICS_DATA = [
  { name: '22 Oct', sales: 12000, orders: 45 },
  { name: '23 Oct', sales: 15000, orders: 52 },
  { name: '24 Oct', sales: 14000, orders: 48 },
  { name: '25 Oct', sales: 18000, orders: 65 },
  { name: '26 Oct', sales: 24000, orders: 82 },
  { name: '27 Oct', sales: 32000, orders: 110 },
  { name: '28 Oct', sales: 28540, orders: 142 },
];

export const ORDER_STATUS_DATA = [
  { name: 'Completed', value: 104, color: '#0B4627' },
  { name: 'Preparing', value: 18, color: '#F59E0B' },
  { name: 'New', value: 8, color: '#EF4444' },
  { name: 'Cancelled', value: 12, color: '#9CA3AF' },
];

export const DINING_TABLES = [
  { id: 1, status: 'occupied', label: 'Table T1', time: '45m', total: '₹1,250', seats: 4 },
  { id: 2, status: 'occupied', label: 'Table T2', time: '1h 20m', total: '₹1,218', seats: 4 },
  { id: 3, status: 'occupied', label: 'Table T3', time: '32m', total: '₹780', seats: 4 },
  { id: 4, status: 'available', label: 'Table T4', time: '-', total: '-', seats: 6 },
  { id: 5, status: 'available', label: 'Table T5', time: '-', total: '-', seats: 2 },
  { id: 6, status: 'reserved', label: 'Table T6', time: '7:30 PM', total: '-', seats: 4 },
  { id: 7, status: 'occupied', label: 'Table T7', time: '45m', total: '₹960', seats: 4 },
  { id: 8, status: 'available', label: 'Table T8', time: '-', total: '-', seats: 4 },
];

export const RECENT_ORDERS = [
  { id: '#1028', time: '11:24 AM', table: 'T4', items: '3 items', amount: '₹760', status: 'New' },
  { id: '#1027', time: '11:18 AM', table: 'T2', items: '5 items', amount: '₹1,240', status: 'Preparing' },
  { id: '#1026', time: '11:15 AM', table: 'T7', items: '4 items', amount: '₹980', status: 'Ready' },
  { id: '#1025', time: '11:10 AM', table: 'T1', items: '2 items', amount: '₹420', status: 'Completed' },
  { id: '#1024', time: '11:05 AM', table: 'T3', items: '6 items', amount: '₹1,560', status: 'Completed' },
];
