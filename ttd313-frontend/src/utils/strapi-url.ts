// src/utils/strapi-url.ts
import qs from 'qs';

// Example queries
export const homePageQuery = qs.stringify({
  populate: {
    generalUpdates: true,
    adHocInfo: true,
    dailyDeals: true,
    specialDeals: true,
    orderSteps: true,
    deliveryArea: true,
    hours: true,
  },
});

export const globalSettingsQuery = qs.stringify({
  populate: {
    logo: {
      populate: '*',
    },
    socialMediaHandles: true,
  },
});

export const productCollectionsQuery = qs.stringify({
  populate: '*', // Populate all fields for products
});

// Reusable function to fetch data from Strapi with a specified path and query
export async function getStrapiData(path: string, query: string) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = new URL(path, baseUrl);
  url.search = query;

  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    throw error;
  }
}
