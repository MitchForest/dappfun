# MVP Scope Documentation
## Solana Token Curated Registry

This document outlines the Minimum Viable Product (MVP) scope for the Token Curated Registry platform, focusing on core functionality, social features, and user incentives.

## Core Functionality

### 1. Token System
- **SPL Token Implementation**: Basic token contract with standard functions
- **Initial Supply**: 1 billion tokens with configured distribution
- **Token Transfers**: Enable transfers between users
- **Rewards Distribution**: Mechanism for distributing incentives

### 2. Registry System
- **Listing Storage**: Store and retrieve project listings
- **Metadata Management**: Handle project details and metadata
- **Query Functionality**: Basic search and filtering capabilities
- **Category Management**: Organization by predefined categories

### 3. Curation System
- **Submission Process**: Allow users to propose new listings with stake
- **Challenge Mechanism**: Enable challenges to proposed listings
- **Voting System**: Allow curators to vote on challenges
- **Stake Management**: Handle token staking and locking
- **Reward Distribution**: Distribute rewards based on curation outcomes

## Social Features

### 1. Upvoting System
- **Basic Upvoting**: Allow users to upvote listings
- **Upvote Tracking**: Track total upvotes per listing
- **User Upvote History**: Track which listings a user has upvoted
- **Upvote-based Sorting**: Sort listings by upvote count

### 2. Commenting System
- **Basic Comments**: Allow users to comment on listings
- **Comment Threading**: Support for threaded conversations
- **Comment Moderation**: Basic flagging functionality
- **Comment Sorting**: Sort by recency or popularity

### 3. Activity Tracking
- **User Activity Feed**: Show recent activity from users
- **Global Activity Feed**: Show platform-wide activity
- **Notification System**: Basic notifications for relevant activities

## User Incentives

### 1. Daily Login Rewards
- **Streak Tracking**: Track consecutive daily logins
- **Token Rewards**: Distribute tokens for maintaining streaks
- **Streak Display**: Show current streak on profile

### 2. Engagement Rewards
- **Upvote Rewards**: Small token rewards for upvoting (with daily limits)
- **Comment Rewards**: Token rewards for quality comments
- **First-time Actions**: Bonus rewards for first-time platform actions

### 3. Curation Rewards
- **Successful Proposals**: Rewards for unchallenged proposals
- **Successful Challenges**: Rewards for winning challenges
- **Voting Rewards**: Rewards for voting on the winning side of challenges

## User Interface

### 1. Core Pages
- **Home Page**: Featured listings and activity feed
- **Category Pages**: Listings organized by category with sorting
- **Listing Detail Page**: Comprehensive project information
- **Submission Form**: Multi-step listing creation process
- **Challenge & Voting Interfaces**: Interfaces for curation activities

### 2. User Profile
- **Profile Dashboard**: Overview of user activity
- **Token Balance**: Display current token holdings
- **Activity History**: Track user's platform interactions
- **Reward History**: Show received rewards

### 3. Discovery
- **Basic Search**: Search functionality for listings
- **Filtering Options**: Filter by category, status, etc.
- **Sorting Options**: Sort by top, trending, or new

## Wallet Integration

### 1. Connection
- **Wallet Connect**: Support for Phantom, Solflare, etc.
- **Account Management**: Handle connection/disconnection flow
- **Network Selection**: Support for devnet/mainnet

### 2. Transactions
- **Transaction Signing**: Handle token transfers and contract interactions
- **Transaction History**: Display recent transactions
- **Transaction Status**: Show pending/confirmed status

## Technical Implementation Focus

### 1. Smart Contracts
- **Token Contract**: Basic SPL token implementation
- **Registry Contract**: Listing storage and retrieval
- **Curation Contract**: Submission, challenge, and voting logic

### 2. Frontend
- **Responsive Design**: Mobile and desktop support
- **Basic UI Components**: Clean, functional interface
- **Wallet Integration**: Seamless wallet connection experience

### 3. Performance
- **Efficient Data Loading**: Optimize for quick page loads
- **Pagination**: Handle large datasets efficiently
- **Caching Strategy**: Minimize redundant blockchain queries

## Out of Scope for MVP

The following features are intentionally deferred until after the MVP:

1. **Governance Contract**: Will be added in Phase 3
2. **Advanced Analytics**: Basic metrics only for MVP
3. **Complex Recommendation Engine**: Simple sorting only for MVP
4. **Advanced Search Capabilities**: Basic search for MVP
5. **Featured Listings Payment System**: Manual featuring for MVP
6. **Comprehensive Admin Tools**: Basic moderation only for MVP

## Success Criteria

The MVP will be considered successful if it achieves:

1. **Functional Curation**: Complete submission-challenge-vote lifecycle works
2. **User Engagement**: Users actively participate in curation and social features
3. **Token Utility**: Token demonstrates utility for staking and rewards
4. **Project Listings**: At least 50 quality projects listed across categories
5. **Platform Stability**: System operates without critical issues

This MVP scope balances minimal development effort with sufficient functionality to demonstrate the core value proposition of a token-curated registry for Solana projects.
