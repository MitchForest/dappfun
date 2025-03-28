'use client';

import Navigation from './Navigation/Navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      <Navigation />
    </header>
  );
} 