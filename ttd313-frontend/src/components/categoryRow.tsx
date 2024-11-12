import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatCollectionNameToUrl } from '@/utils/formatCollectionNameToUrl';
import { placeholderImg } from '@/utils/placeholderImage';

// Define the types for the category image
interface CollectionImageAttributes {
  url: string;
}

interface CollectionImageData {
  data?: {
    attributes?: CollectionImageAttributes;
  };
}

// Define the types for each category
interface Category {
  id: number;
  attributes: {
    collectionName: string;
    collectionImage?: CollectionImageData;
  };
}

// Define the props for CategoryRow
interface CategoryRowProps {
  productCategories: Category[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  productCategories = [],
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 w-full lg:px-0">
      {productCategories.map((category, index) => {
        const { collectionName, collectionImage } =
          category.attributes;
        const categoryImage =
          collectionImage?.data?.attributes?.url || placeholderImg;

        return (
          <Link
            href={`/category/${formatCollectionNameToUrl(
              collectionName
            )}`}
            key={category.id}
            className={`relative text-center flex items-center justify-center h-40 rounded-2xl shadow-xl overflow-hidden bg-gray-400 ${
              productCategories.length % 2 !== 0 &&
              index === productCategories.length - 1
                ? 'col-span-2'
                : ''
            }`}
          >
            {/* Image */}
            <Image
              src={categoryImage}
              alt={collectionName}
              fill
              className="absolute inset-0 -z-10 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />

            {/* Text on top */}
            <p className="uppercase font-bold text-xl text-white z-10">
              {collectionName}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryRow;
