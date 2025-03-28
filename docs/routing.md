# Route Structure Documentation
## Solana Token Curated Registry

This document outlines the complete routing structure for the TCR platform, using Next.js file-based routing patterns with a hybrid category approach.

## Main Navigation Routes

### Home and Discovery
- `/` - Home page with featured listings and activity feed
- `/explore` - General discovery with filtering via query params
  - `/explore?sort=top` - Highest-rated overall
  - `/explore?sort=trending` - Currently gaining popularity
  - `/explore?sort=new` - Recently added projects

### Category Pages
Each category has a dedicated route with the same sorting options:
- `/defi` - DeFi applications
  - `/defi?sort=top|trending|new`
- `/games` - Blockchain games  
  - `/games?sort=top|trending|new`
- `/wallets` - Wallet applications
  - `/wallets?sort=top|trending|new`
- `/socialfi` - Social finance applications
  - `/socialfi?sort=top|trending|new`
- `/nft` - NFT projects and marketplaces
  - `/nft?sort=top|trending|new`
- `/memecoins` - Meme tokens and community coins
  - `/memecoins?sort=top|trending|new`

### Listing Details
- `/listings/[listingId]` - Individual listing detail page
- `/listings/[listingId]/history` - History of changes to a listing
- `/listings/[listingId]/edit` - Edit form (authenticated)

## Curation Routes

### Submission
- `/submit` - Form to submit new listing

### Proposals
- `/proposals` - All proposals with filtering
  - `/proposals?status=new` - New proposals
  - `/proposals?status=active` - Proposals in challenge period
  - `/proposals?status=challenged` - Proposals that have been challenged
- `/proposals/[proposalId]` - Individual proposal details

### Challenges
- `/challenges` - All challenges with filtering
  - `/challenges?status=active` - Challenges in voting period
  - `/challenges?status=resolved` - Past resolved challenges
- `/challenges/[challengeId]` - Individual challenge with voting interface

## User Section

### Personal Profile
- `/profile` - User dashboard with tabs via query params
  - `/profile?tab=listings` - Listings created by user
  - `/profile?tab=proposals` - Proposals created by user
  - `/profile?tab=challenges` - Challenges created by user
  - `/profile?tab=votes` - Voting history
  - `/profile?tab=rewards` - Token rewards history
  - `/profile?tab=settings` - User settings

### Public Profiles
- `/users/[walletAddress]` - Public user profiles
  - `/users/[walletAddress]?tab=listings` - Their listings
  - `/users/[walletAddress]?tab=activity` - Their activity

## Miscellaneous Routes

### Information
- `/about` - About the platform
- `/faq` - Frequently asked questions
- `/docs` - Documentation

### Legal
- `/terms` - Terms of service
- `/privacy` - Privacy policy

## API Routes

### Data Endpoints
- `/api/listings` - Listings data
- `/api/proposals` - Proposals data
- `/api/challenges` - Challenges data
- `/api/users` - User data

### Action Endpoints
- `/api/auth` - Authentication endpoints
- `/api/actions/upvote` - Upvoting functionality
- `/api/actions/comment` - Comment functionality

## Implementation Notes

### Next.js File Structure
The routes map directly to the Next.js file structure:

```
app/
├── page.tsx                    # Home page
├── explore/
│   └── page.tsx                # Explore page
├── defi/
│   └── page.tsx                # DeFi category page
├── games/
│   └── page.tsx                # Games category page
# ... other category pages
├── listings/
│   ├── [listingId]/
│   │   ├── page.tsx            # Listing detail page
│   │   ├── history/
│   │   │   └── page.tsx        # Listing history page
│   │   └── edit/
│   │       └── page.tsx        # Listing edit page
├── submit/
│   └── page.tsx                # Submit new listing page
├── proposals/
│   ├── page.tsx                # Proposals list page
│   └── [proposalId]/
│       └── page.tsx            # Proposal detail page
├── challenges/
│   ├── page.tsx                # Challenges list page
│   └── [challengeId]/
│       └── page.tsx            # Challenge detail page
├── profile/
│   └── page.tsx                # User profile page
├── users/
│   └── [walletAddress]/
│       └── page.tsx            # Public profile page
└── api/
    ├── listings/
    │   └── route.ts            # Listings API
    ├── proposals/
    │   └── route.ts            # Proposals API
    └── ...                     # Other API routes
```

### Query Parameter Handling

For routes that use query parameters (like sorting and filtering), the Next.js page component will handle parameter extraction:

```typescript
// Example: /explore page.tsx
import { useSearchParams } from 'next/navigation';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'trending';
  
  // Fetch and display listings based on sort parameter
  // ...
}
```

### Dynamic Routes

For dynamic routes like `[listingId]` or `[walletAddress]`, the Next.js page component will extract the parameter:

```typescript
// Example: /listings/[listingId]/page.tsx
export default function ListingDetailPage({ params }: { params: { listingId: string } }) {
  const { listingId } = params;
  
  // Fetch and display listing details
  // ...
}
```

This routing structure provides a clear, hierarchical organization that is both SEO-friendly and intuitive for users. The combination of dedicated category pages and flexible query parameters allows for powerful discovery while maintaining clean URLs.
