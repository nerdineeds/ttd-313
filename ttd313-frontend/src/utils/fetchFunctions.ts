import { getStrapiData } from '@/utils/strapi-url';
import {
  globalSettingsQuery,
  productCollectionsQuery,
  productsQuery,
} from '@/utils/pageQueries';
import {
  FAQ,
  GlobalSettings,
  Product,
  ProductCollection,
} from './types';

export async function fetchProductCollections(): Promise<
  ProductCollection[]
> {
  const collectionsData = await getStrapiData<ProductCollection>(
    'api/product-collections',
    productCollectionsQuery
  );

  // Transform the response to extract attributes
  if (
    'data' in collectionsData &&
    Array.isArray(collectionsData.data)
  ) {
    return collectionsData.data.map((item) => ({
      ...item.attributes,
      id: item.id,
    }));
  }

  return [];
}

export async function fetchProducts(): Promise<Product[]> {
  const productsData = await getStrapiData<Product>(
    'api/products',
    productsQuery
  );

  // Extract and transform data
  if ('data' in productsData && Array.isArray(productsData.data)) {
    return productsData.data.map((item) => item.attributes);
  }

  return [];
}

export async function fetchGlobalSettings(): Promise<GlobalSettings | null> {
  const globalSettingsData = await getStrapiData<GlobalSettings>(
    'api/global-settings',
    globalSettingsQuery,
    false // Indicate that this is NOT a collection
  );

  // Check if the data exists and return its attributes
  if (Array.isArray(globalSettingsData.data)) {
    return null;
  }
  return globalSettingsData.data?.attributes || null;
}

export async function fetchFAQs(): Promise<FAQ[]> {
  const faqsData = await getStrapiData<FAQ>('api/faqs');

  if ('data' in faqsData && Array.isArray(faqsData.data)) {
    return faqsData.data.map((item) => item.attributes);
  }

  return [];
}
