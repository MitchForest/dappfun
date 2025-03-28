# Data Models Documentation
## Solana Token Curated Registry

This document details the data models used throughout the Token Curated Registry platform, including both on-chain and off-chain data structures.

## Core Data Models

### 1. Listing Model

The primary entity representing a project in the registry.

```typescript
interface Listing {
  id: string;                    // Unique identifier
  name: string;                  // Project name
  description: string;           // Project description
  url: string;                   // Project URL
  logoUrl?: string;              // Logo image URL
  
  // Team and contributors
  makers: string[];              // Wallet addresses of project makers
  curators: string[];            // Wallet addresses of curators who have contributed
  submitter: string;             // Address of initial submitter
  
  category: string;              // Primary category (defi, games, etc.)
  tags: string[];                // Additional tags for filtering
  status: ListingStatus;         // Active, Pending, Challenged, Removed
  upvotes: number;               // Total upvotes received
  comments: number;              // Total comments count
  ratings: {                     // Optional ratings data
    overall: number;             // Average overall rating
    totalRatings: number;        // Number of ratings
  };
  
  // Curation history
  submissionProposalId: string;  // ID of proposal that created it
  editHistory: {                 // History of edits
    proposalId: string;          // ID of proposal that made edit
    editorAddress: string;       // Who made the edit
    timestamp: number;           // When edit was applied
    changes: string[];           // Fields that were changed
  }[];
  
  createdAt: number;             // Timestamp of creation
  updatedAt: number;             // Timestamp of last update
  metadata: {                    // Flexible metadata field
    team?: string[];             // Team members
    github?: string;             // GitHub repository
    twitter?: string;            // Twitter handle
    discord?: string;            // Discord link
    additionalLinks?: string[];  // Other relevant links
    metrics?: {                  // Platform metrics (optional)
      tvl?: number;              // Total value locked
      users?: number;            // User count
      transactions?: number;     // Transaction count
      // Other metrics specific to project type
    }
  }
}

enum ListingStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CHALLENGED = 'challenged',
  REMOVED = 'removed'
}
```

### 2. User Model

Represents platform users and their roles.

```typescript
interface User {
  walletAddress: string;         // Primary identifier
  username?: string;             // Optional username
  bio?: string;                  // Short bio
  avatarUrl?: string;            // Profile picture
  websiteUrl?: string;           // Personal website
  twitterHandle?: string;        // Twitter handle
  discordUsername?: string;      // Discord username
  
  // Role indicators
  roles: UserRole[];             // Array of roles this user has
  
  // Project relationships
  ownedProjects: string[];       // IDs of listings they own/created
  curatedProjects: string[];     // IDs of listings they've curated
  
  // Activity metrics
  submittedListings: number;     // Count of submitted listings
  successfulSubmissions: number; // Listings that remain active
  challengesCreated: number;     // Number of challenges initiated
  challengesWon: number;         // Number of successful challenges
  totalVotes: number;            // Number of votes cast
  
  // Reputation and rewards
  reputation: number;            // Reputation score
  tokenBalance: number;          // Current token balance
  streakDays: number;            // Current streak of daily activity
  lastStreakDate: number;        // Last date of streak activity
  
  joinedAt: number;              // When user first connected wallet
  lastActiveAt: number;          // Last activity timestamp
}

enum UserRole {
  MAKER = 'maker',               // Created at least one project
  CURATOR = 'curator',           // Participated in curation
  ADMIN = 'admin'                // Platform administrator (optional)
}
```

### 3. Proposal Model

Represents a proposal to create, edit, or remove a listing.

```typescript
interface Proposal {
  id: string;                    // Unique identifier
  proposerAddress: string;       // Address of proposer
  listingId?: string;            // For edits/removals (null for new)
  action: ProposalAction;        // Create, Edit, Remove
  data: Partial<Listing>;        // The proposed listing data
  stake: number;                 // Amount of tokens staked
  status: ProposalStatus;        // Status of proposal
  challengePeriodEnd: number;    // When challenge period ends
  createdAt: number;             // Timestamp of creation
  resolvedAt?: number;           // When proposal was resolved
  
  // For tracking
  hasBeenChallenged: boolean;    // If it's been challenged
  challengeId?: string;          // Reference to challenge if exists
}

enum ProposalAction {
  CREATE = 'create',
  EDIT = 'edit',
  REMOVE = 'remove'
}

enum ProposalStatus {
  ACTIVE = 'active',            // In challenge period
  ACCEPTED = 'accepted',        // Accepted and executed
  CHALLENGED = 'challenged',    // Currently being challenged
  REJECTED = 'rejected'         // Rejected after challenge
}
```

### 4. Challenge Model

Represents a challenge to a proposal.

```typescript
interface Challenge {
  id: string;                    // Unique identifier
  proposalId: string;            // Related proposal
  challengerAddress: string;     // Address of challenger
  reason: string;                // Reason for challenge
  stake: number;                 // Amount of tokens staked
  status: ChallengeStatus;       // Status of challenge
  votingPeriodEnd: number;       // When voting period ends
  
  // Voting stats
  totalVotes: number;            // Total number of votes
  votesForChallenger: number;    // Votes supporting challenge
  votesAgainstChallenger: number; // Votes against challenge
  
  createdAt: number;             // Timestamp of creation
  resolvedAt?: number;           // When challenge was resolved
}

enum ChallengeStatus {
  ACTIVE = 'active',             // Voting in progress
  SUCCESSFUL = 'successful',     // Challenge won
  FAILED = 'failed'              // Challenge lost
}
```

### 5. Vote Model

Represents a vote on a challenge.

```typescript
interface Vote {
  id: string;                    // Unique identifier
  challengeId: string;           // Related challenge
  voterAddress: string;          // Address of voter
  supportChallenger: boolean;    // True = support challenger
  weight: number;                // Weight of vote (from stake)
  createdAt: number;             // Timestamp of vote
}
```

### 6. Comment Model

Represents a comment on a listing.

```typescript
interface Comment {
  id: string;                    // Unique identifier
  listingId: string;             // Related listing
  authorAddress: string;         // Author's wallet address
  content: string;               // Comment text
  upvotes: number;               // Upvotes on comment
  parentId?: string;             // For nested comments
  createdAt: number;             // Timestamp of creation
  updatedAt?: number;            // If edited
}
```

### 7. Upvote Model

Represents a user's upvote on a listing.

```typescript
interface Upvote {
  id: string;                    // Unique identifier
  listingId: string;             // Related listing
  userAddress: string;           // User who upvoted
  createdAt: number;             // Timestamp of upvote
}
```

### 8. Reward Model

Represents tokens awarded to users.

```typescript
interface Reward {
  id: string;                    // Unique identifier
  userAddress: string;           // Recipient address
  amount: number;                // Amount of tokens
  reason: RewardReason;          // Reason for reward
  referenceId?: string;          // Related entity ID (challenge, etc)
  createdAt: number;             // Timestamp of reward
}

enum RewardReason {
  DAILY_STREAK = 'daily_streak',
  UPVOTE = 'upvote',
  COMMENT = 'comment',
  WINNING_VOTE = 'winning_vote',
  SUCCESSFUL_CHALLENGE = 'successful_challenge',
  SUCCESSFUL_PROPOSAL = 'successful_proposal',
  TOP_PROJECT = 'top_project',
  FIRST_TIME_ACTION = 'first_time_action'
}
```

### 9. Activity Model

Represents user activity for feeds and history.

```typescript
interface Activity {
  id: string;                    // Unique identifier
  type: ActivityType;            // Type of activity
  userAddress: string;           // User who performed action
  targetId: string;              // Related entity ID (listing, etc)
  data: any;                     // Activity-specific data
  createdAt: number;             // Timestamp of activity
}

enum ActivityType {
  LISTING_CREATED = 'listing_created',
  LISTING_UPDATED = 'listing_updated',
  LISTING_REMOVED = 'listing_removed',
  CHALLENGE_CREATED = 'challenge_created',
  CHALLENGE_RESOLVED = 'challenge_resolved',
  VOTE_CAST = 'vote_cast',
  COMMENT_ADDED = 'comment_added',
  UPVOTE_ADDED = 'upvote_added',
  RATING_SUBMITTED = 'rating_submitted'
}
```

### 10. Curation Contribution Model

Tracks specific contributions to curation.

```typescript
interface CurationContribution {
  id: string;                    // Unique identifier
  listingId: string;             // Related listing
  curatorAddress: string;        // Address of curator
  contributionType: ContributionType; // Type of contribution
  proposalId?: string;           // Related proposal if applicable
  challengeId?: string;          // Related challenge if applicable
  voteId?: string;               // Related vote if applicable
  timestamp: number;             // When contribution occurred
  impact: number;                // Measure of contribution impact (for rewards)
}

enum ContributionType {
  SUBMISSION = 'submission',     // Initial submission
  EDIT = 'edit',                 // Edit to listing
  CHALLENGE = 'challenge',       // Challenge to proposal
  VOTE = 'vote',                 // Vote on challenge
  COMMENT = 'comment',           // Valuable comment
  RATING = 'rating'              // Rating with review
}
```

## Data Storage Strategy

### On-Chain Data

The following data is stored directly on-chain in Solana program accounts:

1. **Core Listing Data**:
   - ID, name, category, URL
   - Status and critical timestamps
   - References to off-chain metadata

2. **Curation Process Data**:
   - Proposals with core information
   - Challenges and their status
   - Votes and their weights
   - Stake amounts and distributions

3. **Token-Related Data**:
   - Token balances
   - Stake records
   - Reward distributions

### Off-Chain Data (IPFS/Arweave)

The following data is stored off-chain with references stored on-chain:

1. **Extended Listing Data**:
   - Detailed descriptions
   - Images and media
   - Team information
   - Additional links and resources
   - Project metrics

2. **User Profile Data**:
   - Profile images
   - Detailed bios
   - Extended social links

3. **Content Data**:
   - Comment content
   - Challenge and proposal reasoning
   - Rating reviews

### Hybrid Approach

For optimal performance and cost efficiency, the platform uses a hybrid approach:

1. **Critical Data on Chain**:
   - Data needed for protocol security
   - Core information for basic functionality
   - Stake-related information

2. **Reference Data on IPFS/Arweave**:
   - Content too large for efficient on-chain storage
   - Media and rich content
   - Historical data

3. **Indexed Data in Database**:
   - For rapid querying and filtering
   - Activity feeds
   - Search functionality
   - Analytics and trending calculations

## Data Relationships

The following diagram illustrates the key relationships between data models:

```
User
 ├── creates many → Proposals
 ├── creates many → Challenges
 ├── casts many → Votes
 ├── leaves many → Comments
 ├── creates many → Upvotes
 ├── receives many → Rewards
 └── has many → CurationContributions

Listing
 ├── created by one → Proposal
 ├── updated by many → Proposals
 ├── has many → Comments
 ├── has many → Upvotes
 └── has many → CurationContributions

Proposal
 ├── can create/update/remove one → Listing
 └── can have one → Challenge

Challenge
 ├── belongs to one → Proposal
 └── has many → Votes

Comment
 └── belongs to one → Listing

Upvote
 └── belongs to one → Listing

Activity
 └── references any entity by targetId
```

## Data Validation Rules

### Listing Validation
- Name: Required, 3-50 characters
- Description: Required, 10-500 characters
- URL: Required, valid URL format
- Category: Required, must be from predefined list
- Tags: Optional, max 10 tags, each 2-20 characters

### Proposal Validation
- Action: Required, must be valid ProposalAction
- Stake: Required, must meet minimum stake requirement
- Data: Required for Create/Edit, validated against Listing rules

### Challenge Validation
- Reason: Required, 10-500 characters
- Stake: Required, must meet minimum stake requirement

### Vote Validation
- Weight: Required, must meet minimum stake requirement

### Comment Validation
- Content: Required, 1-1000 characters

## Data Migration Strategy

For future upgrades, the following migration strategy is planned:

1. **Program Upgrades**:
   - Use upgradeable programs with proper governance
   - Maintain backward compatibility where possible
   - Provide migration instructions for incompatible changes

2. **Data Schema Evolution**:
   - Version data schemas explicitly
   - Support multiple versions during transition periods
   - Provide migration utilities for off-chain data

3. **Backward Compatibility**:
   - Maintain support for historical data formats
   - Implement adapters for legacy clients
   - Document breaking changes clearly

This data model documentation provides a comprehensive overview of the structured data used throughout the Token Curated Registry platform, ensuring consistency, efficiency, and scalability as the platform evolves.
