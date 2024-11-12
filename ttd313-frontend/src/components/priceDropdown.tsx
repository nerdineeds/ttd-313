'use client';

import { useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { HiChevronUpDown } from 'react-icons/hi2';

interface Prices {
  [weight: string]: number;
}

interface PriceDropdownProps {
  prices: Prices[];
}

const PriceDropdown: React.FC<PriceDropdownProps> = ({ prices }) => {
  // State to hold the selected option
  const [selected, setSelected] = useState<[string, number] | null>(
    null
  );

  // Extract weight-price pairs from the first item in the prices array, excluding 'id'
  const weightOptions = Object.entries(prices[0]).filter(
    ([key]) => key !== 'id'
  );

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-2">
        {/* Button to display the selected weight and price */}
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-black sm:text-sm">
          <span className="block truncate text-base">
            {selected
              ? `$${selected[1].toFixed(2)} - ${selected[0]}`
              : 'Select weight'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        {/* Dropdown options */}
        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {weightOptions.map(([weight, price]) => (
            <ListboxOption
              key={weight}
              value={[weight, price]}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 ${
                  active ? 'bg-black text-white' : ''
                }`
              }
            >
              <span
                className={`block truncate font-normal ${
                  selected?.[0] === weight ? 'font-semibold' : ''
                }`}
              >
                ${price.toFixed(2)} - {weight}
              </span>
              {selected?.[0] === weight && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black">
                  <FaCheck aria-hidden="true" className="h-5 w-5" />
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default PriceDropdown;
