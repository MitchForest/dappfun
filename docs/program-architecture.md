# Program Architecture Documentation
## Solana Token Curated Registry

This document outlines the architecture of the Solana programs (smart contracts) required for the Token Curated Registry platform, including detailed specifications for each program, account structures, and interaction flows.

## Overview

The TCR platform consists of three primary Solana programs:

1. **Token Program**: Handles the creation and management of the platform's token
2. **Registry Program**: Stores and manages listing data
3. **Curation Program**: Manages the curation process (submissions, challenges, voting)

These programs work together to create a decentralized curation system with token-based incentives.

## 1. Token Program

### Purpose
Manage the native token used for staking, rewards, and governance.

### Implementation Option
For the MVP, we can use the standard SPL Token Program rather than writing a custom token program. This simplifies development while providing all necessary functionality.

### Token Parameters
- **Name**: [Your Token Name]
- **Symbol**: [Your Token Symbol]
- **Decimals**: 9 (standard for SPL tokens)
- **Initial Supply**: 1,000,000,000 (1 billion) tokens
- **Mint Authority**: Initially controlled by a multi-sig, eventually transferred to Governance program

### Key Functions (Using SPL Token Program)
- `spl_token::instruction::initialize_mint`
- `spl_token::instruction::mint_to`
- `spl_token::instruction::transfer`
- `spl_token::instruction::burn`

### Required Accounts
- Mint Account: Stores token information
- Token Accounts: For each user holding tokens
- Associated Token Accounts: Generated for each user

## 2. Registry Program

### Purpose
Store, update, and query listing information on-chain.

### Account Structures

#### Listing Account
```rust
#[account]
pub struct Listing {
    pub authority: Pubkey,           // Creator/manager of the listing
    pub id: [u8; 32],                // Unique identifier
    pub name: String,                // Project name (max 50 chars)
    pub category: String,            // Category (max 20 chars)
    pub url: String,                 // Project URL (max 100 chars)
    pub description: String,         // Short description (max 200 chars)
    pub status: ListingStatus,       // Current status
    pub metadata_uri: String,        // IPFS/Arweave URI for extended data
    pub upvotes: u64,                // Total upvotes
    pub comments_count: u64,         // Total comments
    pub created_at: i64,             // Unix timestamp
    pub updated_at: i64,             // Unix timestamp
    pub makers: Vec<Pubkey>,         // Project team addresses (max 5)
    pub curators: Vec<Pubkey>,       // Contributing curators (max 20)
    pub tags: Vec<String>,           // Tags (max 10, each max 20 chars)
    pub submission_proposal_id: [u8; 32], // ID of proposal that created it
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ListingStatus {
    Active,
    Challenged,
    Removed,
}
```

#### Category Stats Account
```rust
#[account]
pub struct CategoryStats {
    pub category: String,            // Category name
    pub listing_count: u64,          // Number of listings in category
    pub total_upvotes: u64,          // Total upvotes in category
    pub total_comments: u64,         // Total comments in category
}
```

### Key Instructions

#### Initialize Registry
```rust
pub fn initialize_registry(ctx: Context<InitializeRegistry>) -> Result<()> {
    // Initialize registry with default settings
}
```

#### Create Listing
```rust
pub fn create_listing(
    ctx: Context<CreateListing>,
    id: [u8; 32],
    name: String,
    category: String,
    url: String,
    description: String,
    metadata_uri: String,
    makers: Vec<Pubkey>,
    tags: Vec<String>,
    proposal_id: [u8; 32],
) -> Result<()> {
    // Create a new listing from approved proposal
}
```

#### Update Listing
```rust
pub fn update_listing(
    ctx: Context<UpdateListing>,
    name: Option<String>,
    category: Option<String>,
    url: Option<String>,
    description: Option<String>,
    metadata_uri: Option<String>,
    makers: Option<Vec<Pubkey>>,
    tags: Option<Vec<String>>,
) -> Result<()> {
    // Update existing listing from approved edit proposal
}
```

#### Remove Listing
```rust
pub fn remove_listing(
    ctx: Context<RemoveListing>,
) -> Result<()> {
    // Mark listing as removed from approved removal proposal
}
```

#### Upvote Listing
```rust
pub fn upvote_listing(
    ctx: Context<UpvoteListing>,
) -> Result<()> {
    // Add upvote to listing and record user's upvote
}
```

#### Add Comment
```rust
pub fn add_comment(
    ctx: Context<AddComment>,
    content: String,
) -> Result<()> {
    // Add comment to listing and update counts
}
```

## 3. Curation Program

### Purpose
Manage the curation process including submissions, challenges, and voting.

### Account Structures

#### Proposal Account
```rust
#[account]
pub struct Proposal {
    pub id: [u8; 32],                 // Unique identifier
    pub proposer: Pubkey,             // Address of proposer
    pub listing_id: Option<[u8; 32]>, // For edits/removals (null for new)
    pub action: ProposalAction,       // Create, Edit, Remove
    pub data_uri: String,             // IPFS/Arweave URI with listing data
    pub stake: u64,                   // Amount of tokens staked
    pub status: ProposalStatus,       // Status of proposal
    pub challenge_period_end: i64,    // When challenge period ends
    pub created_at: i64,              // Timestamp of creation
    pub resolved_at: Option<i64>,     // When proposal was resolved
    pub has_been_challenged: bool,    // If it's been challenged
    pub challenge_id: Option<[u8; 32]>, // Reference to challenge if exists
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ProposalAction {
    Create,
    Edit,
    Remove,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ProposalStatus {
    Active,
    Accepted,
    Challenged,
    Rejected,
}
```

#### Challenge Account
```rust
#[account]
pub struct Challenge {
    pub id: [u8; 32],                 // Unique identifier
    pub proposal_id: [u8; 32],        // Related proposal
    pub challenger: Pubkey,           // Address of challenger
    pub reason: String,               // Reason for challenge (max 500 chars)
    pub stake: u64,                   // Amount of tokens staked
    pub status: ChallengeStatus,      // Status of challenge
    pub voting_period_end: i64,       // When voting period ends
    pub total_votes: u64,             // Total number of votes
    pub votes_for_challenger: u64,    // Votes supporting challenge
    pub votes_against_challenger: u64, // Votes against challenge
    pub created_at: i64,              // Timestamp of creation
    pub resolved_at: Option<i64>,     // When challenge was resolved
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ChallengeStatus {
    Active,
    Successful,
    Failed,
}
```

#### Vote Account
```rust
#[account]
pub struct Vote {
    pub voter: Pubkey,                // Address of voter
    pub challenge_id: [u8; 32],       // Related challenge
    pub support_challenger: bool,     // True = support challenger
    pub weight: u64,                  // Weight of vote (from stake)
    pub created_at: i64,              // Timestamp of vote
}
```

#### Platform Parameters Account
```rust
#[account]
pub struct PlatformParameters {
    pub min_submission_stake: u64,    // Minimum stake for submission
    pub min_challenge_stake: u64,     // Minimum stake for challenge
    pub min_vote_stake: u64,          // Minimum stake for voting
    pub challenge_period_seconds: u64, // Duration of challenge period
    pub voting_period_seconds: u64,   // Duration of voting period
    pub slash_percentage: u8,         // Percentage to slash (0-100)
    pub winning_voters_reward_percentage: u8, // % to winning voters
    pub winning_proposer_challenger_percentage: u8, // % to winner
    pub treasury_percentage: u8,      // % to treasury
}
```

### Key Instructions

#### Initialize Curation
```rust
pub fn initialize_curation(
    ctx: Context<InitializeCuration>,
    params: PlatformParameters,
) -> Result<()> {
    // Initialize curation program with parameters
}
```

#### Propose New Listing
```rust
pub fn propose_new_listing(
    ctx: Context<ProposeNewListing>,
    id: [u8; 32],
    data_uri: String,
    stake: u64,
) -> Result<()> {
    // Create a new listing proposal with stake
}
```

#### Propose Edit
```rust
pub fn propose_edit(
    ctx: Context<ProposeEdit>,
    listing_id: [u8; 32],
    data_uri: String,
    stake: u64,
) -> Result<()> {
    // Create an edit proposal with stake
}
```

#### Propose Removal
```rust
pub fn propose_removal(
    ctx: Context<ProposeRemoval>,
    listing_id: [u8; 32],
    reason: String,
    stake: u64,
) -> Result<()> {
    // Create a removal proposal with stake
}
```

#### Challenge Proposal
```rust
pub fn challenge_proposal(
    ctx: Context<ChallengeProposal>,
    proposal_id: [u8; 32],
    reason: String,
    stake: u64,
) -> Result<()> {
    // Challenge an existing proposal with stake
}
```

#### Cast Vote
```rust
pub fn cast_vote(
    ctx: Context<CastVote>,
    challenge_id: [u8; 32],
    support_challenger: bool,
    stake: u64,
) -> Result<()> {
    // Cast a vote on a challenge with stake
}
```

#### Finalize Unchallenged Proposal
```rust
pub fn finalize_unchallenged_proposal(
    ctx: Context<FinalizeUnchallengedProposal>,
    proposal_id: [u8; 32],
) -> Result<()> {
    // After challenge period, finalize an unchallenged proposal
    // Return stake to proposer
    // Update registry with new/edited/removed listing
}
```

#### Finalize Challenge
```rust
pub fn finalize_challenge(
    ctx: Context<FinalizeChallenge>,
    challenge_id: [u8; 32],
) -> Result<()> {
    // After voting period, finalize challenge
    // Calculate vote outcome
    // Distribute rewards based on outcome
    // Update related proposal and listing
}
```

#### Claim Rewards
```rust
pub fn claim_rewards(
    ctx: Context<ClaimRewards>,
    challenge_id: [u8; 32],
) -> Result<()> {
    // Claim rewards for successful voting
}
```

## 4. Program Interactions

### Listing Creation Flow
1. User calls `propose_new_listing` on Curation Program
2. User stakes tokens via SPL Token Program
3. After challenge period (if unchallenged):
   - `finalize_unchallenged_proposal` is called
   - Curation Program calls Registry Program's `create_listing`
   - Stake is returned to proposer

### Challenge Flow
1. User calls `challenge_proposal` on Curation Program
2. User stakes tokens via SPL Token Program
3. Other users call `cast_vote` during voting period
4. After voting period:
   - `finalize_challenge` is called
   - If challenge succeeds:
     - Proposal is rejected
     - Proposer's stake is slashed
     - Rewards distributed to challenger and voters
   - If challenge fails:
     - Proposal is accepted
     - Challenger's stake is slashed
     - Rewards distributed to proposer and voters
     - For new listings, Registry Program's `create_listing` is called
     - For edits, Registry Program's `update_listing` is called
     - For removals, Registry Program's `remove_listing` is called

### Social Engagement Flow
1. User calls Registry Program's `upvote_listing`
2. User calls Registry Program's `add_comment`
3. Registry Program updates listing statistics

## 5. Initial Parameter Values

The Curation Program will be initialized with these values:

```rust
PlatformParameters {
    min_submission_stake: 1_000_000_000, // 1,000 tokens (with 9 decimals)
    min_challenge_stake: 500_000_000,    // 500 tokens
    min_vote_stake: 100_000_000,         // 100 tokens
    challenge_period_seconds: 259_200,   // 72 hours (3 days)
    voting_period_seconds: 172_800,      // 48 hours (2 days)
    slash_percentage: 70,                // 70% slashed
    winning_voters_reward_percentage: 70, // 70% to voters
    winning_proposer_challenger_percentage: 20, // 20% to proposer/challenger
    treasury_percentage: 10,             // 10% to treasury
}
```

## 6. Security Considerations

### Access Control
- Only authorized addresses can update listings
- Only token holders with sufficient stake can participate in curation
- Time-based locks prevent premature finalization

### Stake Management
- Token transfers use SPL token program for security
- Escrow accounts hold staked tokens during challenges
- Slashing and reward distribution follow strict formulas

### Data Integrity
- Input validation on all public methods
- Size limits on strings to prevent abuse
- Timestamps validated against realistic ranges

## 7. Testing Strategy

### Unit Tests
- Test each instruction in isolation
- Validate state transitions
- Verify token transfers and stake management

### Integration Tests
- Test complete curation flows
- Simulate various challenge scenarios
- Verify reward distribution correctness

### Stress Tests
- Test with maximum-sized inputs
- Simulate edge cases in voting
- Test concurrent operations

This architecture provides a comprehensive foundation for building the Solana programs required for your Token Curated Registry. The design separates concerns into logical programs while maintaining clear interaction patterns between components.
