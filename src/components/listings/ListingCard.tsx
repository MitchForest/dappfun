import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/models/Listing';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const listingUrl = `/${listing.id}`;

  return (
    <Link 
      href={listingUrl}
      className="block group"
    >
      <div className="rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
        <div className="aspect-video relative bg-gray-100">
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
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
            {listing.name}
          </h3>
          
          {listing.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {listing.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>{listing.ratings?.score || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👍</span>
              <span>{listing.upvotes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💬</span>
              <span>{listing.comments?.count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}