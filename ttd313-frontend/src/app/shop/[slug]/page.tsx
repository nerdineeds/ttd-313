'use client';

import PriceDropdown from '@/components/priceDropdown';
import Breadcrumb from '@/components/Breadcrumb';
import { placeholderImg } from '@/utils/placeholderImage';
import { getStrapiData, productQuery } from '@/utils/strapi-url';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default async function ProductPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  if (!productId) {
    return <p>Product ID not provided</p>;
  }

  const productData = await getStrapiData(
    `api/products/${productId}`,
    productQuery
  );

  if (!productData?.data) {
    return <p>Product not found</p>;
  }

  const productDetails = productData.data.attributes;
  const productImage =
    productDetails.photo?.data?.[0]?.attributes.url;
  const productImageAlt =
    productDetails.photo?.data?.[0]?.attributes.alternativeText ||
    'Product Image';
  const productDescription = productDetails.description;
  const isFlower =
    productDetails.product_collection?.data?.attributes
      .collectionName === 'Flower';
  const qtyPrice = productDetails.qtyPrice;
  const weightPrice = productDetails.weightPrice;

  // Extracting category and product name for the breadcrumb
  const category =
    productDetails.product_collection?.data?.attributes
      .collectionName;
  const productName = productDetails.name;

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0">
      <div className="bg-blue-200/60 text-center rounded-lg mb-4 h-40 lg:h-80 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold my-2 uppercase">
          {productDetails.name}
        </h1>
        <Breadcrumb category={category} productName={productName} />
      </div>
      <div className="flex justify-between gap-x-4 mt-10 lg:mt-20">
        {/** PRODUCT IMAGE **/}
        <div className="w-1/2">
          <div className="h-[500px] w-full overflow-clip relative rounded-lg">
            {productImage && (
              <Image
                src={productImage ? productImage : placeholderImg}
                alt={productImageAlt || productDetails.name}
                fill
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
        {/** PRODUCT DETAILS **/}
        <div className="w-1/2 flex flex-col gap-y-4 pt-12">
          <h2 className="text-3xl font-bold">
            {productDetails.name}
          </h2>
          {!isFlower ? (
            <p className="text-2xl text-green-800">${qtyPrice}.00</p>
          ) : (
            <PriceDropdown prices={weightPrice} />
          )}
          <p className="text-sm text-gray-700">
            {productDescription || 'No description available'}
          </p>

          {productDetails.thcPercentage ||
          productDetails.cbdPercentage ? (
            <div>
              {productDetails.thcPercentage && (
                <div>THC: {productDetails.thcPercentage}%</div>
              )}
              {productDetails.cbdPercentage && (
                <div>CBD: {productDetails.cbdPercentage}%</div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
