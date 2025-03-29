'use client';

import { useState } from 'react';
import { mockListings } from '@/data/mock-data';
import { ListingType, TableView } from '@/models/Listing';
import ListingsTable from '@/components/listings/table/ListingsTable';
import { filterListings, sortListings, calculateRanks } from '@/lib/listings';
import Breadcrumbs, { BreadcrumbItem } from '@/components/ui/Breadcrumbs';

export default function DappsPage() {
  const [view, setView] = useState<TableView>('trending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);

  // Get sorted and ranked listings
  const dapps = calculateRanks(
    sortListings(
      filterListings(mockListings, ListingType.DAPP, search, filters),
      view
    )
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Dapps',
      href: '/dapps',
      current: true,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mt-4 mb-2">Dapps</h1>
        <p className="text-gray-600">
          Discover the best decentralized applications built on the Solana blockchain
        </p>
      </div>

      <section>
        <ListingsTable
          type={ListingType.DAPP}
          listings={dapps}
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