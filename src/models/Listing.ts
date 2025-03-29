export enum ListingType {
  DAPP = 'dapp',
  TOKEN = 'token'
}

export type TableView = 'trending' | 'top' | 'new';
export type TCRStatus = 'challengePeriod' | 'votingPeriod' | 'approved' | 'rejected';

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

export interface User {
  name: string;
  avatar: string;
  profileUrl: string;
}

export interface EditedField {
  old: string;
  new: string;
}

export interface EditedFields {
  name?: EditedField;
  description?: EditedField;
  category?: EditedField;
  tags?: {
    removed: string[];
    added: string[];
  };
  logo?: EditedField;
  makers?: {
    removed: User[];
    added: User[];
  };
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  type: ListingType;
  category: string;
  tags: string[];
  logo: string;
  makers: User[];
  submitter: User;
  submittedAt: string;
  url: string;
  status?: ListingStatus;
  
  // Activity and engagement fields
  createdAt: string;
  updatedAt: string;
  lastApprovedAt?: string;
  upvotes: number;
  comments: { count: number };
  activity: {
    upvotes30d: number;
    comments30d: number;
  };
  curators?: User[];
  
  // TCR-specific fields
  tcrStatus?: TCRStatus;
  tcrEndTime?: string;
  tcrChallenger?: User;
  tcrVotes?: {
    approve: number;
    reject: number;
  };
  
  // For edited listings
  isEdit?: boolean;
  editedFields?: EditedFields;
  originalListing?: Omit<Listing, 'isEdit' | 'editedFields' | 'originalListing'>;
}

export interface TableFilters {
  search: string;
  category?: string;
  view: TableView;
  sortBy: keyof Listing;
  sortDirection: 'asc' | 'desc';
  page: number;
  perPage: number;
}

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

export type CreateListingInput = Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'upvotes' | 'ratings' | 'comments' | 'editHistory'>;
export type UpdateListingInput = Partial<CreateListingInput>;

export interface TCRListing extends Listing {
  tcrStatus: TCRStatus;
  challengePeriodEnds?: string;
  votingPeriodEnds?: string;
  challenger?: User;
  challengedAt?: string;
  challengeReason?: string;
  proposedChanges: {
    name: boolean;
    description: boolean;
    category: boolean;
    logo: boolean;
  };
  stakeAmount: number;
  votes?: {
    for: number;
    against: number;
  };
  submissionType: SubmissionType;
}

export enum SubmissionType {
  NEW = 'NEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
} 