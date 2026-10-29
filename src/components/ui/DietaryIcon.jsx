import React from 'react';

const DietaryIcon = ({ type, className = '' }) => {
  const isVeg = type === 'veg';

  return (
    <span
      role="img"
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
      className={`inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px] border bg-white ${isVeg ? 'border-emerald-600' : 'border-red-600'} ${className}`}
    >
      <span className={`h-[6px] w-[6px] rounded-full ${isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
    </span>
  );
};

export default DietaryIcon;
