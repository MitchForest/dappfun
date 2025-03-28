'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar/SearchBar';
import WalletButton from '@/components/blockchain/WalletButton';
import { categories } from '@/data/mock-data';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDappsOpen, setIsDappsOpen] = useState(false);
  const [isTokensOpen, setIsTokensOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dappsRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  const dappCategories = categories.filter(cat => cat.type === 'dapp');
  const tokenCategories = categories.filter(cat => cat.type === 'token');

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const getCategoryUrl = (type: string, category: string) => `/${type}s/${category}`;

  return (
    <nav className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[65px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex-shrink-0 z-10 text-gray-800">
          DappFun
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Dapps Dropdown */}
          <div 
            ref={dappsRef}
            className="relative"
            onMouseEnter={() => setIsDappsOpen(true)}
            onMouseLeave={() => setIsDappsOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 py-2 transition-colors text-[15px] ${
                isActiveLink('/dapps')
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Dapps
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDappsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDappsOpen && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200/60 p-2 space-y-1 z-50">
                <Link
                  href="/dapps"
                  className="block px-3 py-2 text-[14px] rounded-md text-gray-600 hover:bg-gray-50"
                >
                  All Dapps
                </Link>
                <div className="h-px bg-gray-100 my-2" />
                {dappCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={getCategoryUrl('dapp', category.id)}
                    className={`block px-3 py-2 text-[14px] rounded-md ${
                      isActiveLink(getCategoryUrl('dapp', category.id))
                        ? 'text-blue-600 bg-blue-50/60'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tokens Dropdown */}
          <div 
            ref={tokensRef}
            className="relative"
            onMouseEnter={() => setIsTokensOpen(true)}
            onMouseLeave={() => setIsTokensOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 py-2 transition-colors text-[15px] ${
                isActiveLink('/tokens')
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tokens
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isTokensOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTokensOpen && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200/60 p-2 space-y-1 z-50">
                <Link
                  href="/tokens"
                  className="block px-3 py-2 text-[14px] rounded-md text-gray-600 hover:bg-gray-50"
                >
                  All Tokens
                </Link>
                <div className="h-px bg-gray-100 my-2" />
                {tokenCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={getCategoryUrl('token', category.id)}
                    className={`block py-2 pl-3 text-[14px] ${
                      isActiveLink(getCategoryUrl('token', category.id))
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600 hover:text-gray-800'
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
            className={`transition-colors text-[15px] ${
              isActiveLink('/submit')
                ? 'text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-800'
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
        className={`fixed top-0 right-0 w-full max-w-sm bg-white h-screen shadow-lg transition-transform duration-200 ease-in-out transform md:hidden z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6 pt-20">
          {/* Dapps Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Dapps</h3>
              <Link href="/dapps" className="text-xs text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            <div className="space-y-1">
              {dappCategories.map((category) => (
                <Link
                  key={category.id}
                  href={getCategoryUrl('dapp', category.id)}
                  className={`block py-2 pl-3 text-sm ${
                    isActiveLink(getCategoryUrl('dapp', category.id))
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tokens Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Tokens</h3>
              <Link href="/tokens" className="text-xs text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            <div className="space-y-1">
              {tokenCategories.map((category) => (
                <Link
                  key={category.id}
                  href={getCategoryUrl('token', category.id)}
                  className={`block py-2 pl-3 text-[14px] ${
                    isActiveLink(getCategoryUrl('token', category.id))
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Submit Link */}
          <div className="pt-4">
            <Link
              href="/submit"
              className={`block py-2 text-[15px] ${
                isActiveLink('/submit')
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Submit
            </Link>
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