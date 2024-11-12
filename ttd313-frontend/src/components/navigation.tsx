'use client';

import Link from 'next/link';
import PriceDropdown from '@/components/priceDropdown';
import Breadcrumb from '@/components/Breadcrumb';
import { placeholderImg } from '@/utils/placeholderImage';
import { getStrapiData, productQuery } from '@/utils/strapi-url';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ProductAttributes {
  name: string;
  description?: string;
  photo?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    }[];
  };
  product_collection?: {
    data?: {
      attributes: {
        collectionName: string;
      };
    };
  };
  qtyPrice?: number;
  weightPrice?: { [key: string]: number }[];
  thcPercentage?: number;
  cbdPercentage?: number;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [productDetails, setProductDetails] =
    useState<ProductAttributes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    async function fetchProductData() {
      setLoading(true);
      const productData = await getStrapiData<{
        data?: { attributes: ProductAttributes };
      }>(`api/products/${productId}`, productQuery);
      setProductDetails(productData?.data?.attributes || null);
      setLoading(false);
    }

    fetchProductData();
  }, [productId]);

  if (!productId) {
    return (
      <p className="text-center text-red-600">
        Product ID not provided
      </p>
    );
  }

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!productDetails) {
    return (
      <p className="text-center text-red-600">Product not found</p>
    );
  }

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
  const weightPrice = productDetails.weightPrice || [];

  const category =
    productDetails.product_collection?.data?.attributes
      .collectionName;
  const productName = productDetails.name;

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0">
      {/* Product Header */}
      <div className="bg-blue-200/60 text-center rounded-lg mb-4 h-40 lg:h-80 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold my-2 uppercase">
          {productName}
        </h1>
        <Breadcrumb category={category} productName={productName} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-x-4 mt-10 lg:mt-20">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="h-[500px] w-full overflow-hidden relative rounded-lg">
            {productImage ? (
              <Image
                src={productImage}
                alt={productImageAlt}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src={placeholderImg}
                alt="Placeholder Image"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-y-4 pt-12">
          <h2 className="text-3xl font-bold">{productName}</h2>
          {!isFlower ? (
            qtyPrice ? (
              <p className="text-2xl text-green-800">
                ${qtyPrice}.00
              </p>
            ) : (
              <p className="text-lg text-red-600">
                Price not available
              </p>
            )
          ) : (
            <PriceDropdown prices={weightPrice} />
          )}
          <p className="text-sm text-gray-700">
            {productDescription || 'No description available'}
          </p>

          {(productDetails.thcPercentage ||
            productDetails.cbdPercentage) && (
            <div className="mt-4">
              {productDetails.thcPercentage && (
                <div>THC: {productDetails.thcPercentage}%</div>
              )}
              {productDetails.cbdPercentage && (
                <div>CBD: {productDetails.cbdPercentage}%</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-10 text-center">
        <Link href="/">
          <a className="text-blue-600 hover:underline">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
