'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';

interface Logo {
  alternativeText?: string;
  caption?: string | null;
  url: string;
}
interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationProps {
  navigation: NavigationItem[];
  logo: Logo;
}

const Navigation: React.FC<NavigationProps> = ({
  navigation,
  logo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          {logo?.url && (
            <Image
              alt={logo.alternativeText || 'Logo'}
              src={logo.url}
              className="h-16 w-auto"
              width={300}
              height={300}
            />
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="tel:1234567890"
            className="text-sm font-semibold text-gray-900 border-2 px-10 py-2"
          >
            Order Now
          </Link>
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
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {logo?.url && (
                <Image
                  alt={logo.alternativeText || 'Logo'}
                  src={logo.url}
                  className="h-8 w-auto"
                  width={200}
                  height={200}
                />
              )}
            </Link>
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
              <div className="space-y-3 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="tel:1234567890"
                  className="text-sm font-semibold text-gray-900 border-2 px-1 py-2 block w-fit"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navigation;
