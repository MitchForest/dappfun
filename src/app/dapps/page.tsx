import { categories, mockListings } from '@/data/mock-data';
import ListingCard from '@/components/listings/ListingCard';
import { Listing, ListingType } from '@/models/Listing';
import Link from 'next/link';

interface DappsPageProps {
  searchParams: {
    sort?: 'trending' | 'new' | 'top';
  };
}

export default function DappsPage({ searchParams }: DappsPageProps) {
  // Filter dapps
  let filteredListings = mockListings.filter(
    (listing: Listing) => listing.type === ListingType.DAPP
  );

  // Sort dapps based on query parameter
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case 'trending':
        filteredListings = [...filteredListings].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
        break;
      case 'new':
        filteredListings = [...filteredListings].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'top':
        filteredListings = [...filteredListings].sort((a, b) => 
          (b.ratings?.score || 0) - (a.ratings?.score || 0)
        );
        break;
    }
  }

  // Group dapps by category
  const dappsByCategory = categories
    .filter(cat => cat.type === 'dapp')
    .map(category => ({
      ...category,
      dapps: filteredListings.filter(dapp => dapp.category === category.id)
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dapps</h1>
        <p className="text-gray-600 text-lg">
          Explore the latest and most popular dapps on Solana
        </p>
      </div>

      {/* Sort Options */}
      <div className="flex gap-4 mb-6">
        {['trending', 'new', 'top'].map((sortOption) => (
          <a
            key={sortOption}
            href={`/dapps?sort=${sortOption}`}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              searchParams.sort === sortOption
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {sortOption}
          </a>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {dappsByCategory.map((category) => (
          <section key={category.id}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{category.label}</h2>
              <Link
                href={`/dapps/${category.id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All {category.label} Dapps →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.dapps.map((dapp) => (
                <ListingCard key={dapp.id} listing={dapp} />
              ))}
              {category.dapps.length === 0 && (
                <p className="text-gray-500 col-span-full">
                  No dapps found in this category.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 