import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatCollectionNameToUrl } from '@/utils/formatCollectionNameToUrl';
import { placeholderImg } from '@/utils/placeholderImage';
import { ProductCollection } from '@/utils/types';

export type CategoryCardsProps = {
  categories: ProductCollection[];
};

export default function CategoryRow({
  categories,
}: CategoryCardsProps) {
  console.log(categories);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 w-full lg:px-0">
      {categories.map((category, index) => {
        // Safely access attributes with optional chaining
        const collectionName = category.collectionName || 'Unknown';
        const categoryImage =
          category.collectionImage?.data?.attributes.url ||
          placeholderImg;

        return (
          <Link
            href={`/category/${formatCollectionNameToUrl(
              collectionName
            )}`}
            key={category.collectionName}
            className={`relative text-center flex items-center justify-center h-40 rounded-2xl shadow-xl overflow-hidden bg-gray-400 ${
              categories.length % 2 !== 0 &&
              index === categories.length - 1
                ? 'col-span-2'
                : ''
            }`}
          >
            <Image
              src={categoryImage}
              alt={collectionName}
              fill
              className="object-cover object-center size-full"
            />
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />
            <p className="uppercase font-bold text-xl text-white z-10">
              {collectionName}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
