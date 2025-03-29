'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { TCRListing, TCRStatus } from '@/models/Listing';
import { formatDistanceToNow, differenceInDays, differenceInHours } from 'date-fns';

type CardState = 'minimized' | 'normal' | 'expanded';
type UserAction = 'looks_good' | 'upvote' | 'downvote' | null;

interface ListingCardProps {
  listing: TCRListing;
  status: TCRStatus;
}

// Format time remaining
const formatTimeRemaining = (endDate: Date): string => {
  const now = new Date();
  const daysLeft = differenceInDays(endDate, now);
  const hoursLeft = differenceInHours(endDate, now);

  if (daysLeft > 0) {
    return `${daysLeft}d left`;
  }
  return `${hoursLeft}h left`;
};

// Add category color mapping
const getCategoryColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    'defi': 'bg-blue-50 text-blue-700 border-blue-200',
    'nft': 'bg-purple-50 text-purple-700 border-purple-200',
    'gaming': 'bg-green-50 text-green-700 border-green-200',
    'social': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'dao': 'bg-orange-50 text-orange-700 border-orange-200',
    'infrastructure': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'meme': 'bg-pink-50 text-pink-700 border-pink-200',
    'tools': 'bg-cyan-50 text-cyan-700 border-cyan-200'
  };
  return categoryColors[category.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
};

// Add tag formatting
const formatTag = (tag: string) => {
  const abbreviations = ['NFT', 'DEX', 'DAO', 'AI', 'DeFi'];
  if (abbreviations.includes(tag.toUpperCase())) {
    return tag.toUpperCase();
  }
  return tag
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

function UserAvatar({ user }: { user: { name: string; avatar: string; profileUrl: string } }) {
  return (
    <Link href={user.profileUrl} className="group">
      <div className="relative">
        <Image
          src={user.avatar}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full transition-transform group-hover:scale-105"
          unoptimized
        />
      </div>
      <span className="sr-only">{user.name}</span>
    </Link>
  );
}

export default function ListingCard({ listing, status }: ListingCardProps) {
  const [cardState, setCardState] = useState<CardState>('normal');
  const [userAction, setUserAction] = useState<UserAction>(null);

  // Determine available actions based on status
  const isNewSubmission = status === 'challengePeriod';
  const isContested = status === 'votingPeriod';

  // Handle card click for expansion/collapse
  const handleCardClick = () => {
    setCardState(cardState === 'normal' ? 'expanded' : 'normal');
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
            <span className="text-gray-500 hover:scale-110 transition-transform" title="Undo action">🔄</span>
          </div>
        </div>
      </div>
    );
  }

  // Normal card view
  const normalCard = (
    <div className="p-6 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors duration-150">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
          <Image
            src={listing.logo}
            alt={listing.name}
            width={48}
            height={48}
            className="rounded-lg object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <h3 className="font-medium text-gray-900">{listing.name}</h3>
                {listing.makers && listing.makers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">by</span>
                    <div className="flex -space-x-2">
                      {listing.makers.slice(0, 4).map(maker => (
                        <UserAvatar key={maker.name} user={maker} />
                      ))}
                    </div>
                    {listing.makers.length > 4 && (
                      <span className="text-xs text-gray-500">+{listing.makers.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{listing.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${getCategoryColor(listing.category)}`}>
                  {listing.category.toUpperCase()}
                </span>
                {listing.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    {formatTag(tag)}
                  </span>
                ))}
                {listing.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{listing.tags.length - 3} more</span>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-shrink-0 gap-2 items-center">
              {isNewSubmission && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLooksGood();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap w-full justify-center"
                  >
                    <span>👍</span>
                    <span>Looks Good</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChallenge();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap w-full justify-center"
                  >
                    <span>👎</span>
                    <span>Challenge</span>
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
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap w-full justify-center"
                  >
                    <span>👍</span>
                    <span>Upvote</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownvote();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap w-full justify-center"
                  >
                    <span>👎</span>
                    <span>Downvote</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-gray-500 border-t pt-4">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span>Submitted by</span>
            <Link href={listing.submitter.profileUrl} className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
              <Image
                src={listing.submitter.avatar}
                alt={listing.submitter.name}
                width={20}
                height={20}
                className="rounded-full"
                unoptimized
              />
              <span>{listing.submitter.name}</span>
            </Link>
          </div>
          {isContested && listing.challenger && (
            <>
              <span className="flex-shrink-0">•</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span>Challenged by</span>
                <Link href={listing.challenger.profileUrl} className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
                  <Image
                    src={listing.challenger.avatar}
                    alt={listing.challenger.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                    unoptimized
                  />
                  <span>{listing.challenger.name}</span>
                </Link>
              </div>
            </>
          )}
          <span className="flex-shrink-0">•</span>
          <span className="flex-shrink-0">{formatTimeRemaining(new Date(listing.submittedAt))}</span>
        </div>
        {cardState === 'expanded' ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  // Expanded card view
  if (cardState === 'expanded') {
    return (
      <div className="relative">
        <div onClick={handleCardClick}>
          {normalCard}
        </div>
        {/* This overlay is positioned absolutely and doesn't affect layout */}
        <div 
          className="absolute left-0 right-0 bg-white rounded-b-xl border-x border-b border-gray-200 shadow-md z-20 transition-shadow duration-150"
          onClick={handleCardClick}
        >
          <div className="p-6 space-y-6">
            {/* Full Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Full Description</h4>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            {/* Project Details */}
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

            {/* Proposed Changes */}
            {listing.proposedChanges && Object.values(listing.proposedChanges).some(Boolean) && (
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

            {/* Challenge Details */}
            {isContested && listing.tcrChallenger && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Challenge Details</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Challenged by</span>
                  <Link href={listing.tcrChallenger.profileUrl} className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
                    <Image
                      src={listing.tcrChallenger.avatar}
                      alt={listing.tcrChallenger.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                      unoptimized
                    />
                    <span>{listing.tcrChallenger.name}</span>
                  </Link>
                </div>
                {listing.challengeReason && (
                  <p className="mt-2 text-sm text-gray-600">{listing.challengeReason}</p>
                )}
              </div>
            )}

            {/* Voting Status */}
            {isContested && listing.votes && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Voting Status</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(listing.votes.for / (listing.votes.for + listing.votes.against)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-green-600">{listing.votes.for} For</span>
                      <span className="text-red-600">{listing.votes.against} Against</span>
                    </div>
                  </div>
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