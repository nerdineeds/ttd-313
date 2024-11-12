import React from 'react';
import RichText from './RichText/RichText';
import Image from 'next/image';
import { placeholderImg } from '@/utils/placeholderImage';

// Define TypeScript interfaces for props
interface RichTextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  type: 'text';
}

interface RichTextElement {
  type: 'paragraph' | 'heading' | 'list' | 'link';
  level?: number;
  children: RichTextChild[];
}

interface DailyDeal {
  id: string;
  dailyName: string;
}

interface SpecialDeal {
  id: string;
  dealTitle: string;
}

interface DealsProps {
  generalUpdates: RichTextElement[];
  dailyDeals?: DailyDeal[];
  specials?: SpecialDeal[];
  adhocInfo: RichTextElement[];
}

const Deals: React.FC<DealsProps> = ({
  generalUpdates,
  dailyDeals = [],
  specials = [],
  adhocInfo,
}) => {
  return (
    <div className="flex items-stretch gap-y-6 lg:gap-x-6 my-6 flex-col lg:flex-row">
      <div className="relative w-full lg:w-1/2 px-12 backdrop: py-12 shadow-xl rounded-3xl flex flex-col  text-white overflow-clip justify-center">
        <Image
          fill
          src={placeholderImg}
          alt="People"
          style={{ objectFit: 'cover' }}
          className="absolute  rounded-3xl -z-10"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
        <h2 className="text-3xl font-bold uppercase text-center">
          Deals
        </h2>

        <RichText
          content={generalUpdates}
          paragraphClassName="text-center mb-6"
        />

        <div className="my-12">
          <h3 className="text-2xl uppercase font-semibold text-center underline mb-4">
            Daily Deals
          </h3>
          {dailyDeals.map((deal) => {
            return (
              <div key={deal.id} className="text-center">
                <p className="mb-1">- {deal.dailyName}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-6 px-6 text-right shadow-xl rounded-3xl bg-gray-100 flex flex-col">
        <h3 className="text-2xl uppercase font-semibold text-center underline mb-4">
          SPECIALS
        </h3>
        {specials.map((deal) => {
          return (
            <div key={deal.id} className="text-center">
              <p className="mb-1 text-black">{deal.dealTitle}</p>
            </div>
          );
        })}

        <div>
          <RichText
            content={adhocInfo}
            headingClassName="text-center mt-6 text-2xl uppercase"
            paragraphClassName="text-center mb-3 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Deals;
