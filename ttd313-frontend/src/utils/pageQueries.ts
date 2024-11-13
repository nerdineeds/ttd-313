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
    Nav: true,
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

export const productQuery = qs.stringify({
  populate: '*', // Populate all fields for products
});

export const productCollectionsQuery = qs.stringify({
  populate: '*', // Populate all fields for products
});

export const productsQuery = qs.stringify({
  populate: '*', // Populate all fields for products
});
