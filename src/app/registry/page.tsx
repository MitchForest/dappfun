import Link from 'next/link';
import RegistryTable from '@/components/registry/RegistryTable';
import SubmitListingButton from '@/components/registry/SubmitListingButton';
import ActivityFeed from '@/components/registry/ActivityFeed';
import ListingCard from '@/components/registry/ListingCard';
import { mockTCRListings } from '@/data/mock-data';
import { TCRListing } from '@/models/Listing';

export default function RegistryPage() {
  // Filter listings by status
  const newSubmissions = mockTCRListings.filter(listing => listing.tcrStatus === 'challengePeriod');
  const contestedSubmissions = mockTCRListings.filter(listing => listing.tcrStatus === 'votingPeriod');

  return (
    <>
      {/* Full width/height background that extends edge to edge */}
      <div className="fixed inset-0 bg-gray-50 z-[-1]" style={{ top: '65px' }}></div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - Left Column */}
          <div className="lg:col-span-2">
            {/* Header with explanation - now in left column */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Solana Dapp & Token Registry</h1>
              <p className="text-gray-600 max-w-3xl">
                Welcome to the DappFun Registry! This is where the community curates the best projects on Solana.
                New submissions have a 24-hour challenge period. If no one challenges, they're automatically approved.
                Challenged submissions go to a 24-hour voting period where the community decides.
              </p>
              <div className="mt-6">
                <SubmitListingButton />
              </div>
            </div>

            <div className="space-y-8">
              {/* New Submissions Section */}
              {newSubmissions.length > 0 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    New Submissions ({newSubmissions.length})
                  </h2>
                  <div className="space-y-4">
                    {newSubmissions.map((listing) => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing}
                        status={listing.tcrStatus}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Contested Submissions Section */}
              {contestedSubmissions.length > 0 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Contested Submissions ({contestedSubmissions.length})
                  </h2>
                  <div className="space-y-4">
                    {contestedSubmissions.map((listing) => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing}
                        status={listing.tcrStatus}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Feed - Right Column, extends to top */}
          <div className="lg:col-span-1">
            <div className="sticky top-[65px] bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 