'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar/SearchBar';
import WalletButton from '@/components/blockchain/WalletButton';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  const categories = [
    { href: '/category/defi', label: 'DeFi' },
    { href: '/category/nft', label: 'NFTs' },
    { href: '/category/gaming', label: 'Gaming' },
    { href: '/category/social', label: 'Social' },
    { href: '/category/dao', label: 'DAOs' },
  ];

  const navLinks = [
    { href: '/explore', label: 'Discover' },
    { href: '/submit', label: 'Submit' },
  ];

  const isActiveLink = (href: string) => pathname === href;

  return (
    <nav className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex-shrink-0 z-10">
          DappFun
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/explore"
            className={`transition-colors ${
              isActiveLink('/explore')
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Discover
          </Link>

          {/* Categories Dropdown */}
          <div 
            ref={categoriesRef}
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Categories
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCategoriesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className={`block px-4 py-2 text-sm ${
                      isActiveLink(category.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/submit"
            className={`transition-colors ${
              isActiveLink('/submit')
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Submit
          </Link>
          <WalletButton />
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Toggle search"
          >
            <Search className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-x-0 top-0 bg-white p-4 shadow-lg md:hidden z-50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <SearchBar />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden z-40 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`absolute top-0 right-0 w-full max-w-sm bg-white h-screen shadow-lg transition-transform duration-200 ease-in-out transform md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6 pt-20">
          {/* Categories Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`block py-2 ${
                    isActiveLink(category.href)
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase">Navigation</h3>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 ${
                    isActiveLink(link.href)
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Button */}
          <div className="pt-4">
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
} 