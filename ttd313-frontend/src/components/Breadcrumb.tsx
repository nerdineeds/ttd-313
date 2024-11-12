'use client';

import Link from 'next/link';
import React from 'react';

interface BreadcrumbProps {
  category?: string;
  productName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  category,
  productName,
}) => {
  return (
    <nav
      className="text-sm text-gray-600 mb-4"
      aria-label="Breadcrumb"
    >
      <ul className="flex items-center">
        {/* Home Link */}
        <li>
          <Link href="/">Home</Link>
          <span className="px-2">|</span>
        </li>

        {/* Shop Link */}
        <li>
          <Link href="/shop">Shop</Link>
          {category || productName ? (
            <span className="px-2">|</span>
          ) : null}
        </li>

        {/* Category Link (if available) */}
        {category && (
          <>
            <li>
              <Link
                href={`/shop?category=${encodeURIComponent(
                  category
                )}`}
              >
                {category}
              </Link>
              <span className="px-2">|</span>
            </li>
          </>
        )}

        {/* Product Name */}
        <li className="text-gray-800 font-semibold">{productName}</li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
