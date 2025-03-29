'use client';

import { useState } from 'react';
import { mockListings } from '@/data/mock-data';
import { ListingType, TableView } from '@/models/Listing';
import ListingsTable from '@/components/listings/table/ListingsTable';
import { filterListings, sortListings, calculateRanks } from '@/lib/listings';
import Breadcrumbs, { BreadcrumbItem } from '@/components/ui/Breadcrumbs';

export default function TokensPage() {
  const [view, setView] = useState<TableView>('trending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);

  // Get sorted and ranked listings
  const tokens = calculateRanks(
    sortListings(
      filterListings(mockListings, ListingType.TOKEN, search, filters),
      view
    )
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Tokens',
      href: '/tokens',
      current: true,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mt-4 mb-2">Tokens</h1>
        <p className="text-gray-600">
          Explore popular tokens on the Solana blockchain, from DeFi utilities to meme coins
        </p>
      </div>

      <section>
        <ListingsTable
          type={ListingType.TOKEN}
          listings={tokens}
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
          selectedFilters={filters}
          onFilterChange={setFilters}
        />
      </section>
    </main>
  );
} 