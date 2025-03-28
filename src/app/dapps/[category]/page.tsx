import { notFound } from 'next/navigation';
import { categories, mockListings } from '@/data/mock-data';
import ListingCard from '@/components/listings/ListingCard';
import { Listing, ListingType } from '@/models/Listing';

interface DappCategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    sort?: 'trending' | 'new' | 'top';
  };
}

export default function DappCategoryPage({ params, searchParams }: DappCategoryPageProps) {
  const category = categories.find(
    cat => cat.type === 'dapp' && cat.id === params.category
  );

  if (!category) {
    notFound();
  }

  // Filter dapps by category
  let filteredListings = mockListings.filter(
    (listing: Listing) => listing.type === ListingType.DAPP && listing.category === params.category
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.label}</h1>
        {category.description && (
          <p className="text-gray-600 text-lg">{category.description}</p>
        )}
      </div>

      {/* Sort Options */}
      <div className="flex gap-4 mb-6">
        {['trending', 'new', 'top'].map((sortOption) => (
          <a
            key={sortOption}
            href={`/dapps/${params.category}?sort=${sortOption}`}
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

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing: Listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No dapps found in this category.</p>
        </div>
      )}
    </div>
  );
} 