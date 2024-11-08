'use client';

import Link from 'next/link';

export default function Breadcrumb({ category, productName }) {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex">
        <li>
          <Link href="/">Home</Link>
          <span className="px-2">|</span>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
          <span className="px-2">|</span>
        </li>
        {category && (
          <>
            <li>
              <Link href={`/shop?category=${category}`}>
                {category}
              </Link>
              <span className="px-2">|</span>
            </li>
          </>
        )}
        <li className="text-gray-800 font-semibold">{productName}</li>
      </ul>
    </nav>
  );
}
