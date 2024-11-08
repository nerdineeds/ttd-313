'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import Image from 'next/image';

interface Logo {
  alternativeText?: string;
  caption?: string | null;
  url: string;
}

interface Navigation {
  name: string;
  link: string;
}

interface NavigationProps {
  navigation?: Navigation[];
  logo?: Logo;
}

const Navigation: React.FC<NavigationProps> = ({
  navigation,
  logo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(logo.data.attributes?.url);
  const logoUrl = logo?.data?.attributes?.url;
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          {logo ? (
            <Image
              alt={logo?.data?.attributes?.alternativeText || 'Logo'}
              src={logoUrl}
              className="h-16 w-auto"
              width={300}
              height={300}
            />
          ) : (
            <Image
              alt="Placeholder Logo"
              src="https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-8 w-auto"
              width={200}
              height={200}
            />
          )}
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-sm font-semibold text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt={
                  logo?.data?.attributes?.alternativeText || 'Logo'
                }
                src={logoUrl}
                className="h-8 w-auto"
                width={200}
                height={200}
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <HiXMark aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navigation;
