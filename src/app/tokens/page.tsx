import { categories, mockListings } from '@/data/mock-data';
import ListingCard from '@/components/listings/ListingCard';
import { Listing, ListingType } from '@/models/Listing';
import Link from 'next/link';

interface TokensPageProps {
  searchParams: {
    sort?: 'trending' | 'new' | 'top' | 'marketcap';
  };
}

export default function TokensPage({ searchParams }: TokensPageProps) {
  // Filter tokens
  let filteredListings = mockListings.filter(
    (listing: Listing) => listing.type === ListingType.TOKEN
  );

  // Sort tokens based on query parameter
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
      case 'marketcap':
        filteredListings = [...filteredListings].sort((a, b) => {
          const aMarketCap = Number(a.metadata.token?.marketCap || '0');
          const bMarketCap = Number(b.metadata.token?.marketCap || '0');
          return bMarketCap - aMarketCap;
        });
        break;
    }
  }

  // Group tokens by category
  const tokensByCategory = categories
    .filter(cat => cat.type === 'token')
    .map(category => ({
      ...category,
      tokens: filteredListings.filter(token => token.category === category.id)
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tokens</h1>
        <p className="text-gray-600 text-lg">
          Discover and track the latest tokens on Solana
        </p>
      </div>

      {/* Sort Options */}
      <div className="flex gap-4 mb-6">
        {['trending', 'new', 'top', 'marketcap'].map((sortOption) => (
          <a
            key={sortOption}
            href={`/tokens?sort=${sortOption}`}
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
        {tokensByCategory.map((category) => (
          <section key={category.id}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{category.label}</h2>
              <Link
                href={`/tokens/${category.id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All {category.label} Tokens →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tokens.map((token) => (
                <ListingCard key={token.id} listing={token} />
              ))}
              {category.tokens.length === 0 && (
                <p className="text-gray-500 col-span-full">
                  No tokens found in this category.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 