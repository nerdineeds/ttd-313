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
  navigation = [],
  logo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoUrl = logo?.url || '';

  const NavigationLink = ({ name, link }: Navigation) => (
    <a
      href={link}
      className="text-sm font-semibold text-gray-900 hover:underline"
    >
      {name}
    </a>
  );

  return (
    <header className="bg-white shadow">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <a href="/" className="flex items-center -m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          {logoUrl ? (
            <Image
              alt={logo.alternativeText || 'Logo'}
              src={logoUrl}
              className="h-16 w-auto"
              width={300}
              height={300}
            />
          ) : (
            <Image
              alt="Placeholder Logo"
              src="https://images.unsplash.com/photo-1518469669531-9b8c528f909d?q=80&w=1548&auto=format&fit=crop"
              className="h-8 w-auto"
              width={200}
              height={200}
            />
          )}
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {navigation.map((item) => (
            <NavigationLink key={item.name} {...item} />
          ))}
          <a
            href="tel:1234567890"
            className="text-sm font-semibold text-gray-900 border-2 px-6 py-2 hover:bg-gray-100"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          aria-label="Open main menu"
        >
          <HiBars3 className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black/20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {logoUrl && (
                <Image
                  alt={logo.alternativeText || 'Logo'}
                  src={logoUrl}
                  className="h-8 w-auto"
                  width={200}
                  height={200}
                />
              )}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              aria-label="Close menu"
            >
              <HiXMark className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6">
            <div className="space-y-4">
              {navigation.map((item) => (
                <NavigationLink key={item.name} {...item} />
              ))}
              <a
                href="tel:1234567890"
                className="text-sm font-semibold text-gray-900 border-2 px-4 py-2 block w-full text-center hover:bg-gray-100"
              >
                Order Now
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navigation;
