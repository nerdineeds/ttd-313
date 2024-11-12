// src/utils/strapi-url.ts
import qs from 'qs';

// Example queries
export const globalSettingsQuery = qs.stringify({
  populate: {
    logo: { populate: '*' },
    socialMediaHandles: true,
  },
});

// Define Strapi Response Types
interface StrapiData<T> {
  id: number;
  attributes: T;
}

interface StrapiResponse<T> {
  data: StrapiData<T> | null;
}

export async function getStrapiData<T>(
  path: string,
  query: string
): Promise<StrapiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) {
    throw new Error('Strapi base URL is not defined.');
  }

  const url = new URL(path, baseUrl);
  url.search = query;

  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi: ${response.statusText}`
      );
    }
    const data: StrapiResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    throw error;
  }
}
