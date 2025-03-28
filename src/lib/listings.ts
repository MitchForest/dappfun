import { Listing, ListingType, TableView } from '@/models/Listing';

export function filterListings(
  listings: Listing[],
  type: ListingType,
  search: string,
  filters?: string[]
): Listing[] {
  return listings
    .filter((listing) => {
      // Filter by type
      if (listing.type !== type) return false;

      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        const nameMatch = listing.name.toLowerCase().includes(searchLower);
        const descriptionMatch = listing.description?.toLowerCase().includes(searchLower);
        const categoryMatch = listing.category.toLowerCase().includes(searchLower);
        const tagsMatch = listing.tags?.some(tag => 
          tag.toLowerCase().includes(searchLower)
        );
        const makerMatch = listing.makers?.some(maker => 
          maker.name.toLowerCase().includes(searchLower)
        );

        if (!nameMatch && !descriptionMatch && !categoryMatch && !tagsMatch && !makerMatch) {
          return false;
        }
      }

      // Filter by filters (categories and tags)
      if (filters && filters.length > 0) {
        const hasMatchingCategoryOrTag = filters.some(filter => {
          const filterLower = filter.toLowerCase();
          return (
            listing.category.toLowerCase() === filterLower ||
            listing.tags?.some(tag => tag.toLowerCase() === filterLower)
          );
        });
        
        if (!hasMatchingCategoryOrTag) {
          return false;
        }
      }

      return true;
    });
}

export const sortListings = (listings: Listing[], view: TableView): Listing[] => {
  switch (view) {
    case 'trending':
      return [...listings].sort((a, b) => {
        // Only consider last 30 days activity for trending
        const trendingScoreA = (a.activity?.upvotes30d || 0) + (a.activity?.comments30d || 0) * 2;
        const trendingScoreB = (b.activity?.upvotes30d || 0) + (b.activity?.comments30d || 0) * 2;
        return trendingScoreB - trendingScoreA;
      });
    
    case 'top':
      return [...listings].sort((a, b) => {
        // Consider all-time stats for top
        const allTimeScoreA = (a.upvotes || 0) + (a.comments?.count || 0) * 2;
        const allTimeScoreB = (b.upvotes || 0) + (b.comments?.count || 0) * 2;
        return allTimeScoreB - allTimeScoreA;
      });
    
    case 'new':
      return [...listings].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
};

export const calculateRanks = (listings: Listing[]): Listing[] => {
  return listings.map((listing, index) => ({
    ...listing,
    rank: index + 1
  }));
}; 