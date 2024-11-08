import CategoryRow from '@/components/categoryRow';
import CTA from '@/components/cta';
import HomeHero from '@/components/homeHero';
import Image from 'next/image';
import {
  getStrapiData,
  productCollectionsQuery,
  productsQuery,
} from '@/utils/strapi-url';
import React from 'react';
import { placeholderImg } from '@/utils/placeholderImage';
import { name } from 'assert';

interface Product {
  id: number;
  attributes: {
    name: string;
    description?: string;
    product_collection: {
      data: {
        attributes: {
          collectionName: string;
        };
      };
    };
    photo: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      }[];
    };
    weightPrice?: { [key: string]: number }[];
    qtyPrice?: number;
  };
}
export default async function Shop() {
  const productCategoryData = await getStrapiData(
    'api/product-collections',
    productCollectionsQuery
  );

  const productsData = await getStrapiData(
    'api/products',
    productsQuery
  );

  const productCategories = productCategoryData?.data || [];
  const products: Product[] = productsData?.data || [];

  return (
    <div>
      {/* Category Row */}
      {productCategories.length > 0 && (
        <CategoryRow productCategories={productCategories} />
      )}
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        {products.length > 0 ? (
          products.map((product) => {
            const {
              name,
              product_collection,
              photo,
              weightPrice,
              qtyPrice,
            } = product.attributes;

            const isFlower =
              product_collection.data.attributes.collectionName ===
              'Flower';
            const productImage =
              photo?.data?.[0]?.attributes.url || placeholderImg;
            const productImageAlt =
              photo?.data?.[0]?.attributes.alternativeText ||
              'Product Image';

            return (
              <div
                key={product.id}
                className="rounded-lg flex flex-col items-center shadow-sm bg-gray-50/50"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-[300px] w-full">
                  <Image
                    src={productImage}
                    alt={productImageAlt}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center gap-y-2 mt-4 pb-4 w-full">
                  {/* Product Category */}
                  <p className="text-sm italic text-gray-800">
                    {
                      product_collection.data.attributes
                        .collectionName
                    }
                  </p>

                  {/* Product Name */}
                  <p className="w-11/12 text-2xl font-semibold text-center text-gray-800 leading-7">
                    {name}
                  </p>

                  {/* Product Price */}
                  <p className="text-xl text-green-800">
                    {isFlower
                      ? `$${weightPrice?.[0]?.gram}.00 - $${weightPrice?.[0]?.oz}.00`
                      : `$${qtyPrice}.00`}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No products available
          </p>
        )}
      </div>

      {/* Call to Action */}
      <CTA />
    </div>
  );
}
