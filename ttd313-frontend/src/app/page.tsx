import CTA from '@/components/cta';
import HomeHero from '@/components/homeHero';
import Image from 'next/image';
import Link from 'next/link';
import { CiClock2 } from 'react-icons/ci';
import Category from './category/[category]/page';
import CategoryRow from '@/components/categoryRow';
import { getClient } from '@/config/api';
import { gql } from '@apollo/client';
import qs from 'qs';
import {
  getStrapiData,
  globalSettingsQuery,
  homePageQuery,
  productCollectionsQuery,
} from '@/utils/strapi-url';
import RichText from '@/components/RichText/RichText';

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

async function fetchHomePageData() {
  const data = await getStrapiData('api/homepage', homePageQuery);
  return data;
}

async function fetchProductCollections() {
  const data = await getStrapiData(
    'api/products',
    productCollectionsQuery
  );
  return data;
}

export default async function Home() {
  // Fetch data for the homepage using homePageQuery
  const homeData = await getStrapiData(
    'api/global-setting',
    homePageQuery
  );

  const {
    generalUpdates,
    adHocInfo,
    dailyDeals,
    specialDeals,
    orderSteps,
    deliveryArea,
    hours,
  } = homeData.data.attributes;

  console.log({ hours: hours.operatingHours });
  return (
    <div>
      <HomeHero
        title="TreeTop Direct"
        link={{ label: 'Check Out the Menu', href: '/menu' }}
      />
      <div className="flex items-stretch gap-y-6 lg:gap-x-6 my-6 flex-col lg:flex-row">
        <div className="relative w-full lg:w-1/2 px-4 py-12 text-center shadow-xl sm:rounded-3xl flex flex-col justify-between text-white overflow-clip">
          <Image
            fill
            src="/images/peopl.jpg"
            alt="People"
            style={{ objectFit: 'cover' }}
            className="absolute  rounded-3xl -z-10"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
          <h3 className="text-3xl font-bold uppercase">
            Delivery Areas
          </h3>
          <RichText content={deliveryArea} />
          <div className="my-4">
            <CiClock2 className="w-28 h-8 text-center mx-auto mb-3" />
            <RichText content={hours.operatingHours} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 text-right shadow-xl sm:rounded-3xl bg-blue-400 flex flex-col justify-between">
          <h3 className="text-3xl font-bold uppercase">
            How to Order
          </h3>
          <ul className="list-decimal w-fit ml-auto my-4">
            <li>
              Text <a href="#">(313)-402-4088</a>
            </li>
            <li>Send a photo copy of ID, name, location, more</li>
            <li>Wait for confirmation</li>
            <li>Send us your order</li>
            <li>Enjoy</li>
          </ul>
          <button
            type="button"
            className="rounded bg-indigo-500 px-8 py-2 w-fit ml-auto text-base font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Text to Order
          </button>
        </div>
      </div>
      <CategoryRow />

      <CTA />
    </div>
  );
}
