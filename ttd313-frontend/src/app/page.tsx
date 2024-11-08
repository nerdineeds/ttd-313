import CTA from '@/components/cta';
import HomeHero from '@/components/homeHero';
import Image from 'next/image';
import { CiClock2 } from 'react-icons/ci';
import Category from './category/[category]/page';
import CategoryRow from '@/components/categoryRow';
import {
  getStrapiData,
  homePageQuery,
  productCollectionsQuery,
} from '@/utils/strapi-url';
import RichText from '@/components/RichText/RichText';
import Deals from '@/components/deals';
import { spec } from 'node:test/reporters';

export default async function Home() {
  // Fetch data for the homepage using homePageQuery
  const homeData = await getStrapiData(
    'api/global-setting',
    homePageQuery
  );

  const productCategoryData = await getStrapiData(
    'api/product-collections',
    productCollectionsQuery
  );

  const {
    generalUpdates,
    adHocInfo,
    dailyDeals,
    specialDeals,
    orderSteps,
    deliveryArea,
    hours,
  } = homeData?.data?.attributes;

  return (
    <div>
      <HomeHero
        title="TreeTop Direct"
        link={{ label: 'Check Out the Menu', href: '/shop' }}
      />
      {homeData ? (
        <>
          <div className="flex items-stretch gap-y-6 lg:gap-x-6 my-6 flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/2 px-4 py-12 text-center shadow-xl sm:rounded-3xl flex flex-col  text-white overflow-clip justify-center">
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
              <div className="mt-4">
                <CiClock2 className="w-28 h-8 text-center mx-auto mb-3" />
                <RichText content={hours.operatingHours} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-6 px-6 text-right shadow-xl sm:rounded-3xl bg-gray-100 flex flex-col justify-between">
              <h3 className="text-3xl font-bold uppercase">
                How to Order
              </h3>
              <ul className=" w-fit ml-auto my-4">
                {orderSteps.map((step) => (
                  <li key={step.id} className="mb-3">
                    <p className="font-semibold">
                      {`${step.id}. ${step.Step}`}
                    </p>
                    <RichText
                      content={step.details}
                      paragraphClassName="text-sm mb-2"
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="rounded bg-indigo-500 px-20 py-3 w-fit ml-auto text-base font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <a href="tel:123456789">Text to Order</a>
              </button>
            </div>
          </div>
          {productCategoryData && (
            <CategoryRow
              productCategories={productCategoryData.data}
            />
          )}
          <Deals
            generalUpdates={generalUpdates}
            dailyDeals={dailyDeals}
            specials={specialDeals}
            adhocInfo={adHocInfo}
          />
        </>
      ) : null}
      <CTA />
    </div>
  );
}
