'use client';

import Link from 'next/link';
import WalletButton from '../blockchain/WalletButton';

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex-shrink-0">
          DappFun
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl">
          <input
            type="search"
            placeholder="Search projects..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">
            Discover
          </Link>
          <Link href="/submit" className="text-gray-600 hover:text-gray-900">
            Submit
          </Link>
          <WalletButton />
        </div>
      </nav>
    </header>
  );
} 