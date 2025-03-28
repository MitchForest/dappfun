import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockListings } from '@/data/mock-data';
import { Listing, ListingType } from '@/models/Listing';

interface ListingPageProps {
  params: {
    id: string;
  };
}

export default function ListingPage({ params }: ListingPageProps) {
  // Find listing in mockListings
  const listing = mockListings.find(l => l.id === params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {listing.logoUrl ? (
                <Image
                  src={listing.logoUrl}
                  alt={`${listing.name} logo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
                  {listing.type}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                  {listing.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{listing.name}</h1>
              {listing.description && (
                <p className="text-gray-600">{listing.description}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Rating</div>
              <div className="text-2xl font-semibold">
                ⭐ {listing.ratings?.score || 'N/A'}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Upvotes</div>
              <div className="text-2xl font-semibold">
                👍 {listing.upvotes || 0}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Comments</div>
              <div className="text-2xl font-semibold">
                💬 {listing.comments?.count || 0}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div className="text-2xl font-semibold capitalize">
                {listing.status}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="prose max-w-none">
            <h2>About</h2>
            <p>{listing.description}</p>

            {/* Token-specific details */}
            {listing.type === ListingType.TOKEN && listing.metadata?.token && (
              <>
                <h2>Token Details</h2>
                <ul>
                  <li>Symbol: {listing.metadata.token.symbol}</li>
                  <li>Market Cap: {listing.metadata.token.marketCap}</li>
                  <li>Price: {listing.metadata.token.price}</li>
                  <li>24h Volume: {listing.metadata.token.volume24h}</li>
                </ul>
              </>
            )}

            {/* Dapp-specific details */}
            {listing.type === ListingType.DAPP && listing.metadata?.dapp && (
              <>
                <h2>Dapp Details</h2>
                <ul>
                  <li>Platform: {listing.metadata.dapp.platform}</li>
                  <li>Status: {listing.metadata.dapp.status}</li>
                  <li>Features: {listing.metadata.dapp.features.join(', ')}</li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              {listing.url && (
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 px-4 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                </a>
              )}
              <button className="block w-full py-2 px-4 text-center rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
                Add to Watchlist
              </button>
            </div>
          </div>

          {/* Makers */}
          {listing.makers && listing.makers.length > 0 && (
            <div className="p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Makers</h3>
              <div className="space-y-3">
                {listing.makers.map((maker, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <div className="font-medium">{maker.name}</div>
                      <div className="text-sm text-gray-500">{maker.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 