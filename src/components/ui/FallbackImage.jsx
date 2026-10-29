import React from 'react';

const FallbackImage = React.memo(({ name, type }) => {
  const isVeg = type === 'veg';
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('');
  
  return (
    <div className={`w-full h-48 flex items-center justify-center rounded-t-xl text-white font-bold text-2xl ${isVeg ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-rose-700'}`}>
      {initials}
    </div>
  );
});

FallbackImage.displayName = 'FallbackImage';
export default FallbackImage;