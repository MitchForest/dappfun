'use client';

import { Listing, ListingType, TableView } from '@/models/Listing';
import { cn } from '@/lib/utils';
import SearchInput from './SearchInput';
import CategorySelect from './CategorySelect';
import { TableSkeleton } from './TableSkeleton';
import AvatarGroup from '@/components/common/AvatarGroup';
import Link from 'next/link';
import ListingActions from './ListingActions';

// Helper function to format time remaining
function formatTimeLeft(endTime: string): string {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m left`;
  }
  return `${hours}h left`;
}

interface ListingsTableProps {
  type: ListingType;
  listings: Listing[];
  view: TableView;
  onViewChange: (view: TableView) => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  isLoading?: boolean;
}

// Category to emoji mapping
const categoryEmojis: Record<string, string> = {
  'defi': '💰',
  'nft': '🎨',
  'gaming': '🎮',
  'social': '👥',
  'dao': '🏛️',
  'infrastructure': '🏗️',
  'ai': '🤖',
  'productivity': '⚡️',
  'travel': '✈️',
  'maps': '🗺️',
  'no-code': '🛠️',
  'data visualization': '📊',
  'audio': '🎵',
  'task management': '📝',
  'notion': '📓',
  'sales': '💼',
  'marketing': '📢',
  'growth hacking': '📈',
  'hotels': '🏨',
  'artificial intelligence': '🧠',
};

function getEmoji(category: string): string {
  return categoryEmojis[category.toLowerCase()] || '📱';
}

function StatButton({ count, icon }: { count: number; icon: '💬' | '👍' }) {
  return (
    <button className="w-[52px] h-[52px] flex flex-col items-center justify-center rounded-lg bg-[#F8FAFC] hover:bg-gray-100 active:bg-gray-200 transition-colors border border-gray-200">
      <span className="text-gray-400 mb-0.5">{icon}</span>
      <span className="text-[15px] font-medium text-gray-900">{count}</span>
    </button>
  );
}

// Move formatting functions to the top level so they can be reused
const formatCategory = (category: string) => {
  return category.toUpperCase();
};

const formatTag = (tag: string) => {
  // Common abbreviations that should be all caps
  const abbreviations = ['NFT', 'DEX', 'DAO', 'AI', 'DeFi'];
  
  // Check if the tag is a known abbreviation
  if (abbreviations.includes(tag.toUpperCase())) {
    return tag.toUpperCase();
  }

  // For multi-word tags
  return tag
    .split(' ')
    .map(word => {
      // Check if part of the word is a known abbreviation
      const upperWord = word.toUpperCase();
      if (abbreviations.some(abbr => upperWord.includes(abbr))) {
        // Replace the abbreviation part with uppercase
        return abbreviations.reduce((acc, abbr) => {
          return acc.replace(new RegExp(abbr, 'i'), abbr);
        }, word);
      }
      // Otherwise capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

function FilterChip({ label, onRemove, isCategory }: { label: string; onRemove: () => void; isCategory?: boolean }) {
  const formattedLabel = isCategory ? formatCategory(label) : formatTag(label);
  
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
      <span className="font-medium">{formattedLabel}</span>
      <button
        onClick={onRemove}
        className="group p-0.5 rounded-full hover:bg-gray-200 transition-colors"
      >
        <svg
          className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

function ListingCard({ listing, onFilterClick }: { listing: Listing; onFilterClick: (filter: string) => void }) {
  const firstLetter = listing.name.charAt(0).toUpperCase();

  // Get category color based on type and category
  const getCategoryColor = (type: ListingType, category: string) => {
    if (type === ListingType.DAPP) {
      switch (category.toLowerCase()) {
        case 'defi': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'nft': return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'gaming': return 'bg-green-50 text-green-700 border-green-200';
        case 'social': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'dao': return 'bg-orange-50 text-orange-700 border-orange-200';
        default: return 'bg-gray-50 text-gray-700 border-gray-200';
      }
    } else {
      switch (category.toLowerCase()) {
        case 'meme': return 'bg-pink-50 text-pink-700 border-pink-200';
        case 'defi-token': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'gaming-tokens': return 'bg-green-50 text-green-700 border-green-200';
        case 'infrastructure': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        default: return 'bg-gray-50 text-gray-700 border-gray-200';
      }
    }
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (listing.url) {
      window.open(listing.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/${listing.id}`} className="block">
      <div className="flex gap-6 p-3 hover:bg-gray-50 transition-colors items-center cursor-pointer group">
        {/* Column 1: Logo */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {listing.logoUrl ? (
            <img
              src={listing.logoUrl}
              alt={`${listing.name} logo`}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-gray-500">
              {firstLetter}
            </span>
          )}
        </div>

        {/* Column 2: Name, Description & Tags */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Name and External Link */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-500">{listing.rank}.</span>
            <div className="flex items-center min-w-0">
              <h3 className="text-[15px] font-medium leading-5 truncate hover:text-blue-600 transition-colors">
                {listing.name}
              </h3>
              {listing.url && (
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleExternalLinkClick}
                  className="flex-shrink-0 ml-1.5 text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Visit website"
                >
                  🔗
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          {listing.description && (
            <p className="mt-0.5 text-gray-600 text-[13px] leading-4 truncate">
              {listing.description}
            </p>
          )}

          {/* Category & Tags */}
          <div className="mt-2 flex items-center gap-2 text-[13px] overflow-hidden">
            {/* Main Category */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFilterClick(listing.category);
              }}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full border font-medium transition-all hover:opacity-80 hover:scale-[1.02] ${getCategoryColor(listing.type, listing.category)}`}
            >
              {formatCategory(listing.category)}
            </button>

            {/* Tags */}
            {listing.tags && listing.tags.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-hidden">
                {listing.tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onFilterClick(tag);
                    }}
                    className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium truncate hover:bg-gray-200 transition-colors"
                  >
                    {formatTag(tag)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Makers */}
        <div className="flex-shrink-0">
          {listing.makers && listing.makers.length > 0 && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-500">Makers</span>
              <AvatarGroup
                avatars={listing.makers.map(maker => ({
                  name: maker.name,
                  avatarUrl: maker.avatarUrl
                }))}
                limit={3}
              />
            </div>
          )}
        </div>

        {/* Column 4: Stats */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatButton icon="💬" count={listing.comments?.count || 0} />
          <StatButton icon="👍" count={listing.upvotes} />
        </div>
      </div>
    </Link>
  );
}

export default function ListingsTable({ 
  type, 
  listings, 
  view, 
  onViewChange,
  search,
  onSearchChange,
  selectedFilters,
  onFilterChange,
  isLoading = false
}: ListingsTableProps) {
  const typeLabel = type === ListingType.DAPP ? 'Dapps' : 'Tokens';

  const handleFilterClick = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  // Helper function to check if a filter is a category
  const isCategory = (filter: string) => {
    return listings.some(listing => listing.category.toLowerCase() === filter.toLowerCase());
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {view.charAt(0).toUpperCase() + view.slice(1)} {typeLabel} on Solana
        </h2>
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder={`Search ${typeLabel.toLowerCase()}...`}
          />
        </div>

        {/* View Tabs */}
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 ml-auto w-full sm:w-auto justify-center sm:justify-start">
          {(['trending', 'top', 'new'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onViewChange(tab)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                view === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Filters:</span>
          {selectedFilters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              onRemove={() => handleFilterClick(filter)}
              isCategory={isCategory(filter)}
            />
          ))}
          <button
            onClick={() => onFilterChange([])}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Listings */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : listings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No results found
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onFilterClick={handleFilterClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 