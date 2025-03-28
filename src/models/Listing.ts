export enum ListingType {
  DAPP = 'DAPP',
  TOKEN = 'TOKEN'
}

export enum ListingStatus {
  LISTED = 'LISTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}

export enum RelationType {
  OFFICIAL_TOKEN = 'official_token',   // This token is the official token of the dapp
  OFFICIAL_DAPP = 'official_dapp',     // This dapp is an official dapp of the token/project
  COMMUNITY_DAPP = 'community_dapp',   // Community-built dapp for the token/project
  FORK_OF = 'fork_of',                // Fork of another project
  INTEGRATED_WITH = 'integrated_with', // Generic integration between projects
  PART_OF = 'part_of'                 // Generic "part of same ecosystem" relationship
}

export interface ListingMetrics {
  // Common metrics
  tvl?: number;                // Total value locked
  volume24h?: number;          // 24h trading volume
  transactions24h?: number;    // Daily transactions
  holders?: number;            // Number of holders/users
  
  // Token specific metrics
  marketCap?: number;          // Market capitalization (tokens)
  price?: number;              // Current price (tokens)
  priceChange24h?: number;     // 24h price change percentage (tokens)
  fullyDilutedValue?: number;  // Fully diluted value (tokens)
  circulatingSupply?: number;  // Circulating supply (tokens)
  
  // Dapp specific metrics
  activeUsers24h?: number;     // Daily active users (dapps)
  activeUsers7d?: number;      // Weekly active users (dapps)
  avgTransactionValue?: number; // Average transaction value (dapps)
}

export interface TokenDetails {
  symbol: string;
  marketCap: string;
  price: string;
  volume24h: string;
}

export interface DappDetails {
  platform: string;
  features: string[];
  status: 'live' | 'beta' | 'development';
}

export interface ListingMetadata {
  token?: TokenDetails;
  dapp?: DappDetails;
}

export interface ListingRatings {
  score: number;
  count: number;
  breakdown: {
    [key: string]: number;
  };
}

export interface ListingComments {
  count: number;
  items: any[]; // Replace with proper Comment type when needed
}

export interface ListingMaker {
  name: string;
  role: string;
  links: {
    [key: string]: string;
  };
}

export interface ListingEditHistory {
  timestamp: string;
  editor: string;
  changes: string[];
}

export interface ProjectRelationship {
  listingId: string;           // ID of the related listing
  type: RelationType;          // Type of relationship
  description?: string;        // Optional description of relationship
  isVerified?: boolean;        // Whether both parties verified the relationship
  addedAt: number;            // When the relationship was added
  verifiedAt?: number;        // When the relationship was verified
}

export interface Ecosystem {
  id: string;
  name: string;
  description?: string;
}

export interface Listing {
  id: string;
  type: ListingType;
  category: string;
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
  upvotes?: number;
  ratings?: ListingRatings;
  comments?: ListingComments;
  metadata: ListingMetadata;
  makers?: ListingMaker[];
  editHistory?: ListingEditHistory[];
  ecosystems?: Ecosystem[];
}

export type CreateListingInput = Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'ratings' | 'comments' | 'editHistory'>;

export type UpdateListingInput = Partial<CreateListingInput>;

// Type for listing search/filter parameters
export interface ListingFilters {
  type?: ListingType;
  category?: string;
  tags?: string[];
  status?: ListingStatus;
  maker?: string;
  curator?: string;
  search?: string;
  relatedTo?: string;         // Find listings related to this listing ID
  relationType?: RelationType; // Filter by relationship type
  sortBy?: 'createdAt' | 'updatedAt' | 'upvotes' | 'comments' | 'ratings.overall';
  sortDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
} 