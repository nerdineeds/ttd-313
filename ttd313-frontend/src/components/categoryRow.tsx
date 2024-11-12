import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatCollectionNameToUrl } from '@/utils/formatCollectionNameToUrl';
import { placeholderImg } from '@/utils/placeholderImage';

interface CollectionImageData {
  data?: {
    attributes?: {
      url: string;
    };
  };
}

interface Category {
  attributes: {
    collectionName: string;
    collectionImage: CollectionImageData;
  };
}

interface CategoryRowProps {
  productCategories?: Category[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  productCategories = [],
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 w-full lg:px-0">
      {productCategories.map((category, index) => {
        const catName = category.attributes.collectionName;
        const catImage = category.attributes.collectionImage;
        const categoryImage =
          catImage?.data?.attributes?.url || placeholderImg;

        return (
          <Link
            href={`/category/${formatCollectionNameToUrl(catName)}`}
            key={catName}
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
              alt={catName}
              fill
              className="absolute inset-0 -z-10 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />

            {/* Text on top */}
            <p className="uppercase font-bold text-xl text-white z-10">
              {catName}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryRow;
