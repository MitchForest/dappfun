'use client';

import { useState, useEffect } from 'react';
import { mockListings, categories } from '@/data/mock-data';
import { ListingType, TableView } from '@/models/Listing';
import ListingsTable from '@/components/listings/table/ListingsTable';
import { filterListings, sortListings, calculateRanks } from '@/lib/listings';
import Breadcrumbs, { BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import { notFound } from 'next/navigation';

// This page will render at /dapps/:category
export default function DappCategoryPage({ params }: { params: { category: string } }) {
  console.log("DappCategoryPage render with params:", params);
  
  const [view, setView] = useState<TableView>('trending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<{ id: string; label: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("DappCategoryPage useEffect running with category:", params.category);
    
    // Find the category
    const category = categories.find(
      (cat) => cat.type === 'dapp' && cat.id === params.category
    );
    
    console.log("Found category:", category);
    
    if (category) {
      setCategoryInfo({
        id: category.id,
        label: category.label,
        description: category.description || '',
      });
      
      // Add the category as a filter
      setFilters([category.id]);
    }
    
    setLoading(false);
  }, [params.category]);

  // If category doesn't exist, show 404
  // Only call notFound() after we've confirmed category doesn't exist
  if (!loading && !categoryInfo) {
    console.log("Returning 404 - category not found");
    notFound();
    return null;
  }

  // Early return while loading
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="h-[400px] bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  // Get sorted and ranked listings
  const dapps = calculateRanks(
    sortListings(
      filterListings(mockListings, ListingType.DAPP, search, filters),
      view
    )
  );

  console.log("Filtered dapps:", dapps.length);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Dapps',
      href: '/dapps',
      current: false,
    },
    {
      label: categoryInfo?.label || params.category,
      href: `/dapps/${params.category}`,
      current: true,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mt-4 mb-2">
          {categoryInfo?.label} Dapps
        </h1>
        <p className="text-gray-600">
          {categoryInfo?.description}
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