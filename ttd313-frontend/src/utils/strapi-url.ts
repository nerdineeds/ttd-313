import {
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from './types';

export async function getStrapiData<T>(
  path: string,
  query: string = '',
  isCollection: boolean = true
): Promise<StrapiCollectionResponse<T> | StrapiSingleResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!baseUrl) {
    throw new Error('Strapi base URL is not defined.');
  }

  const url = new URL(path, baseUrl);
  if (query) {
    url.search = query;
  }

  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Return data based on whether it's a single item or a collection
    if (isCollection) {
      return data as StrapiCollectionResponse<T>;
    } else {
      return data as StrapiSingleResponse<T>;
    }
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    throw error;
  }
}
