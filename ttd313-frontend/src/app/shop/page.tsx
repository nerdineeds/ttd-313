import React from 'react';
import CategoryCards from '@/components/CategoryCards';
import CTA from '@/components/cta';
import { fetchProductCollections } from '@/utils/fetchFunctions';

export default async function ShopPage() {
  const productCollections = await fetchProductCollections();

  return (
    <div className="px-4 lg:px-8">
      {productCollections.length > 0 ? (
        <CategoryCards categories={productCollections} />
      ) : (
        <p>No categories available</p>
      )}
      <CTA />
    </div>
  );
}
