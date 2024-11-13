'use client';

import PriceDropdown from '@/components/priceDropdown';
import Breadcrumb from '@/components/Breadcrumb';
import { placeholderImg } from '@/utils/placeholderImage';
import { getStrapiData } from '@/utils/strapi-url';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { productQuery } from '@/utils/pageQueries';

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
      const response = await getStrapiData<ProductAttributes>(
        `api/products/${productId}`,
        productQuery
      );

      if ('data' in response && response.data) {
        if (Array.isArray(response.data)) {
          if (response.data[0]?.attributes) {
            setProductDetails(response.data[0].attributes);
          } else {
            setProductDetails(null);
          }
        } else {
          setProductDetails(response.data.attributes || null);
        }
      } else {
        setProductDetails(null);
      }
      setLoading(false);
    }

    fetchProductData();
  }, [productId]);

  if (!productId)
    return (
      <p className="text-center text-red-600">
        Product ID not provided
      </p>
    );
  if (loading) return <p className="text-center">Loading...</p>;
  if (!productDetails)
    return (
      <p className="text-center text-red-600">Product not found</p>
    );

  const productImage =
    productDetails.photo?.data?.[0]?.attributes.url || placeholderImg;
  const productImageAlt =
    productDetails.photo?.data?.[0]?.attributes.alternativeText ||
    'Product Image';
  const isFlower =
    productDetails.product_collection?.data?.attributes
      .collectionName === 'Flower';
  const qtyPrice = productDetails.qtyPrice;
  const weightPrice = productDetails.weightPrice || [];

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0">
      <div className="bg-blue-200/60 text-center rounded-lg mb-4 h-40 lg:h-80 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold my-2 uppercase">
          {productDetails.name}
        </h1>
        <Breadcrumb
          category={
            productDetails.product_collection?.data?.attributes
              .collectionName
          }
          productName={productDetails.name}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-x-4 mt-10 lg:mt-20">
        <div className="w-full lg:w-1/2">
          <Image
            src={productImage}
            alt={productImageAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-y-4 pt-12">
          <h2 className="text-3xl font-bold">
            {productDetails.name}
          </h2>
          {!isFlower ? (
            <p className="text-2xl text-green-800">${qtyPrice}.00</p>
          ) : (
            <PriceDropdown prices={weightPrice} />
          )}
          <p className="text-sm text-gray-700">
            {productDetails.description || 'No description available'}
          </p>
        </div>
      </div>
    </div>
  );
}
