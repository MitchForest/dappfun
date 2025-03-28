'use client';

import { useState } from 'react';
import { mockListings } from '@/data/mock-data';
import { ListingType, TableView } from '@/models/Listing';
import ListingsTable from '@/components/listings/table/ListingsTable';
import { filterListings, sortListings, calculateRanks } from '@/lib/listings';

export default function HomePage() {
  const [dappsView, setDappsView] = useState<TableView>('trending');
  const [tokensView, setTokensView] = useState<TableView>('trending');
  const [dappsSearch, setDappsSearch] = useState('');
  const [tokensSearch, setTokensSearch] = useState('');
  const [dappsFilters, setDappsFilters] = useState<string[]>([]);
  const [tokensFilters, setTokensFilters] = useState<string[]>([]);

  // Get sorted and ranked listings
  const dapps = calculateRanks(
    sortListings(
      filterListings(mockListings, ListingType.DAPP, dappsSearch, dappsFilters),
      dappsView
    )
  );

  const tokens = calculateRanks(
    sortListings(
      filterListings(mockListings, ListingType.TOKEN, tokensSearch, tokensFilters),
      tokensView
    )
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Dapps Table */}
      <section>
        <ListingsTable
          type={ListingType.DAPP}
          listings={dapps}
          view={dappsView}
          onViewChange={setDappsView}
          search={dappsSearch}
          onSearchChange={setDappsSearch}
          selectedFilters={dappsFilters}
          onFilterChange={setDappsFilters}
        />
      </section>

      {/* Tokens Table */}
      <section>
        <ListingsTable
          type={ListingType.TOKEN}
          listings={tokens}
          view={tokensView}
          onViewChange={setTokensView}
          search={tokensSearch}
          onSearchChange={setTokensSearch}
          selectedFilters={tokensFilters}
          onFilterChange={setTokensFilters}
        />
      </section>
    </main>
  );
}
