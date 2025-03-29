'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Listing, User, EditedFields } from '@/models/Listing';

interface ListingRowProps {
  listing: Listing;
}

const formatTimeLeft = (endTime: string | undefined): string => {
  if (!endTime) return 'N/A';
  const now = new Date();
  const end = new Date(endTime);
  const timeLeft = end.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursLeft > 0) {
    return `${hoursLeft}h ${minutesLeft}m`;
  }
  return `${minutesLeft}m`;
};

function UserAvatar({ user }: { user: User }) {
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

function EditedContent({ editedFields }: { editedFields: EditedFields }) {
  return (
    <div className="space-y-4 border-t border-gray-100 pt-4 mt-4">
      <h4 className="font-medium">Changes Made:</h4>
      <div className="space-y-2">
        {editedFields.name && (
          <div>
            <span className="font-medium">Name:</span>
            <div className="ml-4">
              <span className="line-through text-red-600">{editedFields.name.old}</span>
              <span className="mx-2">→</span>
              <span className="text-green-600">{editedFields.name.new}</span>
            </div>
          </div>
        )}
        {editedFields.description && (
          <div>
            <span className="font-medium">Description:</span>
            <div className="ml-4">
              <span className="line-through text-red-600">{editedFields.description.old}</span>
              <span className="mx-2">→</span>
              <span className="text-green-600">{editedFields.description.new}</span>
            </div>
          </div>
        )}
        {editedFields.category && (
          <div>
            <span className="font-medium">Category:</span>
            <div className="ml-4">
              <span className="line-through text-red-600">{editedFields.category.old}</span>
              <span className="mx-2">→</span>
              <span className="text-green-600">{editedFields.category.new}</span>
            </div>
          </div>
        )}
        {editedFields.tags && (
          <div>
            <span className="font-medium">Tags:</span>
            {editedFields.tags.removed.length > 0 && (
              <div className="ml-4">
                <span className="font-medium text-red-600">Removed:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {editedFields.tags.removed.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {editedFields.tags.added.length > 0 && (
              <div className="ml-4 mt-1">
                <span className="font-medium text-green-600">Added:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {editedFields.tags.added.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {editedFields.makers && (
          <div>
            <span className="font-medium">Makers:</span>
            {editedFields.makers.removed.length > 0 && (
              <div className="ml-4">
                <span className="font-medium text-red-600">Removed:</span>
                <div className="flex -space-x-2 mt-1">
                  {editedFields.makers.removed.map(maker => (
                    <UserAvatar key={maker.name} user={maker} />
                  ))}
                </div>
              </div>
            )}
            {editedFields.makers.added.length > 0 && (
              <div className="ml-4 mt-1">
                <span className="font-medium text-green-600">Added:</span>
                <div className="flex -space-x-2 mt-1">
                  {editedFields.makers.added.map(maker => (
                    <UserAvatar key={maker.name} user={maker} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Add category color mapping
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'defi': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'nft': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'gaming': return 'bg-green-50 text-green-700 border-green-200';
    case 'social': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'dao': return 'bg-orange-50 text-orange-700 border-orange-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
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

export default function ListingRow({ listing }: ListingRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const firstLetter = listing.name.charAt(0).toUpperCase();

  return (
    <div className="group">
      <div 
        className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Main Content */}
        <div className="flex gap-6 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {listing.logo ? (
              <Image
                src={listing.logo}
                alt={`${listing.name} logo`}
                width={40}
                height={40}
                className="rounded-lg object-cover"
                unoptimized
              />
            ) : (
              <span className="text-xl font-semibold text-gray-500">
                {firstLetter}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-[15px] font-medium leading-5 truncate group-hover:text-blue-600 transition-colors">
                  {listing.name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getCategoryColor(listing.category)}`}>
                    {listing.category.toUpperCase()}
                  </span>
                  {listing.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                      {formatTag(tag)}
                    </span>
                  ))}
                  {listing.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{listing.tags.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Time Left</p>
                  <p className="text-sm text-gray-500">{formatTimeLeft(listing.tcrEndTime)}</p>
                </div>
                {isExpanded ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">{listing.description}</p>

            {/* Makers */}
            <div className="mt-2 flex items-center gap-3">
              <div className="flex -space-x-2">
                {listing.makers.slice(0, 4).map(maker => (
                  <UserAvatar key={maker.name} user={maker} />
                ))}
              </div>
              {listing.makers.length > 4 && (
                <span className="text-xs text-gray-500">+{listing.makers.length - 4} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Submission Info */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
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
              {listing.submitter.name}
            </Link>
          </div>
          {listing.tcrChallenger && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>Contested by</span>
                <Link href={listing.tcrChallenger.profileUrl} className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
                  <Image
                    src={listing.tcrChallenger.avatar}
                    alt={listing.tcrChallenger.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                    unoptimized
                  />
                  {listing.tcrChallenger.name}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="space-y-4">
            {/* Full Description */}
            <div>
              <h4 className="font-medium">Description</h4>
              <p className="mt-2 text-sm text-gray-600">{listing.description}</p>
            </div>
            
            {/* All Tags */}
            {listing.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {listing.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-sm font-medium rounded-full bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Edited Content */}
            {listing.isEdit && listing.editedFields && (
              <EditedContent editedFields={listing.editedFields} />
            )}
            
            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {listing.tcrStatus === 'challengePeriod' ? (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle challenge action
                  }}
                >
                  Challenge (50 $DAPP)
                </button>
              ) : listing.tcrStatus === 'votingPeriod' ? (
                <>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle approve vote
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle reject vote
                    }}
                  >
                    Reject
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 