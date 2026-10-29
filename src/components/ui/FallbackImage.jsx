import React, { useState } from 'react';

const FallbackImage = React.memo(({ name, type, src, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const isVeg = type === 'veg';
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('');

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`flex h-full w-full items-center justify-center text-white font-bold text-2xl ${isVeg ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 'bg-gradient-to-br from-red-600 to-rose-800'} ${className}`}>
      {initials}
    </div>
  );
});

FallbackImage.displayName = 'FallbackImage';
export default FallbackImage;