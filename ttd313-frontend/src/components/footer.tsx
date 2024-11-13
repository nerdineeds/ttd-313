'use client';

import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaDribbble,
  FaGithub,
  FaTiktok,
  FaYoutube,
  FaSpotify,
  FaLinkedin,
} from 'react-icons/fa6';
import Image from 'next/image';
import { HiHeart } from 'react-icons/hi2';

interface Logo {
  alternativeText?: string;
  caption?: string | null;
  url: string;
}
interface NavigationItem {
  name: string;
  href: string;
}
interface SocialItem {
  name: string;
  url: string;
}

interface FooterProps {
  navigation?: NavigationItem[];
  logo?: {
    data?: {
      attributes?: Logo;
    };
  };
  socials?: SocialItem[];
}

const getSocialIcon = (platform?: string): React.ReactNode => {
  if (!platform) return null; // Return null if platform is undefined
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <FaFacebook aria-hidden="true" className="h-6 w-6" />;
    case 'instagram':
      return <FaInstagram aria-hidden="true" className="h-6 w-6" />;
    case 'dribbble':
      return <FaDribbble aria-hidden="true" className="h-6 w-6" />;
    case 'github':
      return <FaGithub aria-hidden="true" className="h-6 w-6" />;
    case 'tiktok':
      return <FaTiktok aria-hidden="true" className="h-6 w-6" />;
    case 'youtube':
      return <FaYoutube aria-hidden="true" className="h-6 w-6" />;
    case 'spotify':
      return <FaSpotify aria-hidden="true" className="h-6 w-6" />;
    case 'linkedin':
      return <FaLinkedin aria-hidden="true" className="h-6 w-6" />;
    default:
      return null;
  }
};

const Footer: React.FC<FooterProps> = ({
  navigation = [],
  logo,
  socials = [],
}) => {
  const logoUrl = logo?.data?.attributes?.url || '';

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-9 sm:py-10 lg:px-8">
        {/* Logo */}
        {logoUrl && (
          <Image
            alt={logo?.data?.attributes?.alternativeText || 'Logo'}
            src={logoUrl}
            className="h-16 w-auto mx-auto mb-8"
            width={300}
            height={300}
          />
        )}

        {/* Navigation Links */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm/6 mb-0"
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center gap-x-10">
          {socials &&
            socials.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="sr-only">{item.name}</span>
                {getSocialIcon(item.name)}
              </Link>
            ))}
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-center text-sm/6 text-gray-600">
          &copy; 2024 TreeTop Direct, Inc. All rights reserved.
        </p>
        <p className="text-center text-sm/6 text-gray-600 flex items-center justify-center md:my-2">
          Built with <HiHeart className="mx-1 text-red-500" /> by{' '}
          <a
            href="https://jagaesthetic.com"
            className="hover:underline"
          >
            JAG Aesthetic
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
