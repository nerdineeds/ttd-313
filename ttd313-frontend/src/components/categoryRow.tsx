import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const shopCategories = [
  {
    name: 'Flower',
    image:
      'https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Concentrates',
    image:
      'https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Edibles',
    image:
      'https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Live Psilocybin & More',
    image:
      'https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Solventless Hash Rosin',
    image:
      'https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const CategoryRow = () => {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3  gap-4 my-6 w-full px-4 lg:px-0`}
    >
      {shopCategories.map((category, index) => (
        <Link
          href={`/category/${category.name}`}
          className={`relative text-center flex items-center justify-center h-40 rounded-2xl shadow-xl overflow-hidden bg-grey-400  ${
            shopCategories.length % 2 !== 0 &&
            index === shopCategories.length - 1
              ? 'col-span-2'
              : ''
          }`}
          key={category.name}
        >
          {/* Image */}
          <Image
            src={category.image}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 -z-10 h-full w-full"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>

          {/* Text on top */}
          <p className="uppercase font-bold text-xl text-white z-10">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryRow;
