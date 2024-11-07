'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const Category = () => {
  const pathname = usePathname();
  const category = pathname.split('/').pop(); // Get the last part of the path

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize">{category}</h1>
      {/* Additional content based on the category */}
    </div>
  );
};

export default Category;
