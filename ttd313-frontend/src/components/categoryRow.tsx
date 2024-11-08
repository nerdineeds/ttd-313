import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatCollectionNameToUrl } from '@/utils/formatCollectionNameToUrl';

const CategoryRow = ({ productCategories }) => {
  const placeholderImg =
    'https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3  gap-4 my-6 w-full lg:px-0`}
    >
      {productCategories?.map((category, index) => {
        const catName = category.attributes.collectionName;
        const catImage = category.attributes.collectionImage;

        const categoryImage = catImage.data
          ? catImage.data
          : placeholderImg;
        return (
          <Link
            href={`/category/${formatCollectionNameToUrl(catName)}`}
            className={`relative text-center flex items-center justify-center h-40 rounded-2xl shadow-xl overflow-hidden bg-grey-400 ${
              productCategories.length % 2 !== 0 &&
              index === productCategories.length - 1
                ? 'col-span-2'
                : ''
            }`}
            key={catName}
          >
            {/* Image */}
            <Image
              src={categoryImage}
              alt={catName}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 -z-10 h-full w-full"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>

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
