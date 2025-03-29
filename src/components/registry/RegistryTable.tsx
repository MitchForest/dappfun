'use client';

import { TCRStatus } from '@/models/Listing';
import { mockTCRListings } from '@/data/mock-data';
import ListingCard from './ListingCard';

interface RegistryTableProps {
  status: TCRStatus;
}

export default function RegistryTable({ status }: RegistryTableProps) {
  // Filter listings based on status
  const listings = mockTCRListings.filter(listing => listing.tcrStatus === status);

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-500">No submissions at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          status={status}
        />
      ))}
    </div>
  );
} 