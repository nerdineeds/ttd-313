import CTA from '@/components/cta';
import HomeHero from '@/components/homeHero';
import Image from 'next/image';
import { CiClock2 } from 'react-icons/ci';
import CategoryRow from '@/components/categoryRow';
import {
  getStrapiData,
  homePageQuery,
  productCollectionsQuery,
} from '@/utils/strapi-url';
import RichText, {
  RichTextElement,
} from '@/components/RichText/RichText';
import Deals from '@/components/deals';
import { stringToRichTextElement } from '@/utils/stringToRichText';

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
  interface OrderStep {
    id: number;
    Step: string;
    details: RichTextElement[];
  }

  const {
    generalUpdates,
    adHocInfo,
    dailyDeals,
    specialDeals,
    orderSteps,
    deliveryArea,
    hours,
  } = homeData?.data?.attributes || {};

  // Convert strings to RichTextElement[]
  const generalUpdatesRichText =
    stringToRichTextElement(generalUpdates);
  const adhocInfoRichText = stringToRichTextElement(adHocInfo);

  return (
    <div className="px-4 lg:px-8">
      <HomeHero
        title="TreeTop Direct"
        link={{ label: 'Check Out the Menu', href: '/shop' }}
      />
      {homeData ? (
        <>
          <div className="flex items-stretch gap-y-6 lg:gap-x-6 my-6 flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/2 px-4 py-10 text-center shadow-xl rounded-3xl flex flex-col  text-white overflow-clip justify-center">
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
              <RichText
                content={stringToRichTextElement(deliveryArea)}
                paragraphClassName="text-sm leading-6 mt-2"
              />
              <div className="mt-4">
                <CiClock2 className="w-28 h-8 text-center mx-auto mb-2" />
                <RichText
                  content={stringToRichTextElement(
                    hours.operatingHours
                  )}
                  paragraphClassName="mb-1"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-6 px-6 text-right shadow-xl rounded-3xl bg-gray-100 flex flex-col justify-between">
              <h3 className="text-3xl font-bold uppercase">
                How to Order
              </h3>
              <ul className="w-fit ml-auto my-4">
                {orderSteps.map((step: OrderStep) => (
                  <li key={step.id} className="mb-3">
                    <p className="font-semibold">{`${step.id}. ${step.Step}`}</p>
                    <RichText
                      content={step.details}
                      paragraphClassName="text-sm mb-2"
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="rounded bg-blue-950  px-20 py-3 w-fit ml-auto text-base font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
            generalUpdates={generalUpdatesRichText}
            dailyDeals={dailyDeals}
            specials={specialDeals}
            adhocInfo={adhocInfoRichText}
          />
          ;
        </>
      ) : null}
      <CTA />
    </div>
  );
}
