export type CategoryType = 'dapp' | 'token';

export interface Category {
  id: string;           // URL-friendly identifier (e.g., 'defi', 'memecoins')
  type: CategoryType;   // Whether this is a dapp or token category
  label: string;        // Display name (e.g., 'DeFi', 'Memecoins')
  description: string;  // Short description of the category
  icon?: string;        // Optional icon identifier
}

export interface CategoryWithStats extends Category {
  totalListings: number;      // Total number of listings in this category
  activeListings: number;     // Number of active (non-pending/removed) listings
  trending?: boolean;         // Whether this category is currently trending
  weeklyGrowth?: number;      // Percentage growth in listings over the last week
} 