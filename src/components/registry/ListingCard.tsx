'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TCRListing, TCRStatus } from '@/models/Listing';
import { formatDistanceToNow } from 'date-fns';

type CardState = 'minimized' | 'normal' | 'expanded';
type UserAction = 'looks_good' | 'upvote' | 'downvote' | null;

interface ListingCardProps {
  listing: TCRListing;
  status: TCRStatus;
}

export default function ListingCard({ listing, status }: ListingCardProps) {
  const [cardState, setCardState] = useState<CardState>('normal');
  const [userAction, setUserAction] = useState<UserAction>(null);

  // Determine available actions based on status
  const isNewSubmission = status === 'challengePeriod';
  const isContested = status === 'votingPeriod';

  // Handle card click for expansion
  const handleCardClick = () => {
    if (cardState === 'normal') {
      setCardState('expanded');
    }
  };

  // Handle action buttons
  const handleLooksGood = () => {
    setUserAction('looks_good');
    setCardState('minimized');
  };

  const handleUpvote = () => {
    setUserAction('upvote');
    setCardState('minimized');
  };

  const handleDownvote = () => {
    setUserAction('downvote');
    setCardState('minimized');
  };

  const handleChallenge = () => {
    // TODO: Open challenge modal
    console.log('Challenge clicked');
  };

  // Handle undo action
  const handleUndo = () => {
    setUserAction(null);
    setCardState('normal');
  };

  // Minimized card view
  if (cardState === 'minimized') {
    const bgColor = userAction === 'downvote' ? 'bg-red-50' : 'bg-green-50';
    const textColor = userAction === 'downvote' ? 'text-red-700' : 'text-green-700';
    const actionText = {
      looks_good: 'Looks Good',
      upvote: 'Upvoted',
      downvote: 'Downvoted'
    }[userAction!];

    return (
      <div 
        onClick={handleUndo}
        className={`p-4 rounded-xl border ${bgColor} cursor-pointer transition-all hover:opacity-90`}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">{listing.name}</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${textColor}`}>{actionText}</span>
            <span className="text-sm text-gray-500">(click to undo)</span>
          </div>
        </div>
      </div>
    );
  }

  // Normal card view
  const normalCard = (
    <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-4 cursor-pointer hover:border-gray-300 transition-all">
      <div className="flex items-start gap-4">
        <Image
          src={listing.logo}
          alt={listing.name}
          width={48}
          height={48}
          className="rounded-xl"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-gray-900">{listing.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{listing.description}</p>
            </div>
            <div className="flex gap-2">
              {isNewSubmission && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLooksGood();
                    }}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Looks Good
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChallenge();
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Challenge
                  </button>
                </>
              )}
              {isContested && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpvote();
                    }}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Upvote
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownvote();
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Downvote
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span>Submitted {formatDistanceToNow(new Date(listing.submittedAt), { addSuffix: true })}</span>
            <span>Stake: 50 $DAPP</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Expanded card view
  if (cardState === 'expanded') {
    return (
      <div className="space-y-4">
        {normalCard}
        <div className="p-6 bg-white rounded-xl border border-gray-200">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Full Description</h4>
              <p className="text-gray-600">{listing.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Project Details</h4>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd className="text-gray-900">{listing.category}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Type</dt>
                  <dd className="text-gray-900">{listing.type}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Website</dt>
                  <dd className="text-gray-900">
                    <a href={listing.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      {listing.url}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            {listing.proposedChanges && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Proposed Changes</h4>
                <div className="space-y-2">
                  {Object.entries(listing.proposedChanges).map(([field, changed]) => (
                    changed && (
                      <div key={field} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-gray-600 capitalize">{field}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default to normal view with click handler
  return (
    <div onClick={handleCardClick}>
      {normalCard}
    </div>
  );
} 