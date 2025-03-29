import { Listing } from '@/models/Listing';

interface ListingActionsProps {
  listing: Listing;
}

export default function ListingActions({ listing }: ListingActionsProps) {
  if (!listing.tcrStatus) return null;

  return (
    <div className="flex items-center gap-2">
      {listing.tcrStatus === 'challengePeriod' && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Open challenge modal
          }}
          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
        >
          🚫 Challenge
          <span className="text-xs text-red-500">
            (Stake: {listing.tcrStake} SOL)
          </span>
        </button>
      )}

      {listing.tcrStatus === 'votingPeriod' && (
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500 mr-2">
            Votes: {listing.tcrVotes?.approve || 0} / {listing.tcrVotes?.reject || 0}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Cast approve vote
            }}
            className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
          >
            ✅ Approve
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Cast reject vote
            }}
            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
          >
            ❌ Reject
          </button>
        </div>
      )}

      {/* Show challenger's reason during voting period */}
      {listing.tcrStatus === 'votingPeriod' && listing.tcrChallenger && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
          <div className="font-medium text-gray-700">Challenge Reason:</div>
          <p className="text-gray-600 mt-1">{listing.tcrChallenger.reason}</p>
        </div>
      )}
    </div>
  );
} 