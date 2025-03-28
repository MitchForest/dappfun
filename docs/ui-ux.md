# UI/UX Design Documentation
## Solana Token Curated Registry

This document outlines the user interface, user experience, key components, and user journeys for the Token Curated Registry platform.

## Design Principles

1. **Clean & Intuitive**: Simple, uncluttered layouts that prioritize content
2. **Accessible**: Design for users of all abilities
3. **Educational**: Guide users through complex curation concepts
4. **Responsive**: Fully functional on all device sizes
5. **On-Brand**: Incorporate Solana ecosystem design language

## Color Palette

- **Primary**: Solana Purple (#9945FF)
- **Secondary**: Solana Green (#14F195)
- **Neutral**: Slate variants for text and backgrounds
- **Accent**: Complementary colors for categories
- **Functional**: Success/Warning/Error states
- **Dark/Light Mode**: Support for both themes

## Typography

- **Headings**: Inter (Bold/Semi-bold)
- **Body**: Inter (Regular/Medium)
- **Monospace**: JetBrains Mono for code or addresses
- **Scale**: Modular scale with 1.2 ratio

## Key Pages

### 1. Home Page

**Purpose**: Introduction to platform and showcase top content

**Key Elements**:
- Hero section with platform value proposition
- Featured listings carousel
- Category navigation cards
- Recent activity feed
- Top/Trending/New section tabs

**Layout**:
- Full-width hero at top
- 3-column grid for featured listings
- Horizontal scroll for categories
- Activity feed in sidebar or bottom section

### 2. Category Pages

**Purpose**: Browse listings within a specific category

**Key Elements**:
- Category header with description and metrics
- Filtering controls (Top/Trending/New)
- Listings grid with consistent cards
- Pagination controls

**Layout**:
- Header with category info
- Filter bar below header
- 3-column grid on desktop, single column on mobile
- Infinite scroll or pagination at bottom

### 3. Listing Detail Page

**Purpose**: Showcase comprehensive information about a project

**Key Elements**:
- Project header with logo, name, category, tags
- Key metrics (upvotes, comments, ratings)
- Description and detailed information
- Team/maker information section
- Curator acknowledgments
- Social proof (comments, upvotes)
- Related projects section
- Call-to-action buttons

**Layout**:
- Hero header with project branding
- Two-column layout for details and metrics
- Social section below main content
- Related projects at bottom

### 4. Submission Flow

**Purpose**: Guide users through listing creation process

**Key Elements**:
- Multi-step form with progress indicator
- Field validation and helpful tips
- Token staking information and confirmation
- Preview mode before submission

**Layout**:
- Centered card layout with clear steps
- Focus on one section at a time
- Sticky progress indicator
- Clear next/back controls

### 5. Challenge & Voting Interface

**Purpose**: Enable participation in curation

**Key Elements**:
- Challenge form with reasoning field
- Token staking controls
- Voting interface with opposing options
- Countdown timers for periods
- Stake distribution visualization

**Layout**:
- Clear presentation of proposal details
- Prominent voting controls
- Visual indicator of current voting status
- Timeline of challenge/voting process

### 6. User Profile

**Purpose**: Personal dashboard and activity center

**Key Elements**:
- Profile header with stats
- Token balance and rewards
- Activity tabs (listings, proposals, challenges, votes)
- Streak information and incentives

**Layout**:
- Profile header at top
- Tab navigation for different sections
- Card grid for activities
- Prominent token information

## Core Components

### 1. Wallet Connection

**Purpose**: Connect user's Solana wallet

**Features**:
- Connect wallet button
- Support for multiple wallet providers
- Account information display
- Network selector (mainnet/devnet)
- Connection status indicator

### 2. Listing Card

**Purpose**: Consistent display of listing information

**Features**:
- Project logo and name
- Category and tags
- Key metrics (upvotes, comments)
- Status indicator
- Quick action buttons (upvote)
- Visual distinction for featured listings

### 3. Navigation

**Purpose**: Platform-wide navigation

**Features**:
- Main navigation links
- Category selector
- User menu (profile, settings, logout)
- Search bar
- Mobile-responsive menu

### 4. Token Interface

**Purpose**: Display and manage token interactions

**Features**:
- Token balance display
- Staking controls
- Reward claiming interface
- Transaction confirmation dialogs
- Token history view

### 5. Comment System

**Purpose**: Social engagement

**Features**:
- Comment input with markdown support
- Threaded replies
- Upvoting for comments
- Report functionality
- Sort and filter options

### 6. Upvoting Module

**Purpose**: Simple engagement mechanism

**Features**:
- Upvote button with animation
- Count display
- Undo capability
- User upvote history

### 7. Search & Filter

**Purpose**: Content discovery

**Features**:
- Search bar with auto-suggestions
- Category filters
- Status filters
- Sort options (Top/Trending/New)
- Advanced filter drawer

### 8. Notification System

**Purpose**: User alerts and updates

**Features**:
- In-app notification center
- Toast notifications for actions
- Email notification preferences
- Challenge and voting reminders

## User Journeys

### 1. Maker Journey: Listing a Project

1. **Connect Wallet**
   - User lands on home page
   - Clicks "Connect Wallet" button
   - Selects wallet provider
   - Approves connection

2. **Navigate to Submit**
   - User clicks "Submit Project" in navigation
   - System checks token balance for stake requirement
   - If sufficient, proceeds to form

3. **Complete Listing Form**
   - User fills multi-step form:
     - Basic Info (name, description, URL)
     - Category and Tags
     - Team Information
     - Media Assets
     - Additional Links

4. **Review and Stake**
   - User reviews submission preview
   - Confirms token stake amount
   - Signs transaction to stake tokens

5. **Monitor Challenge Period**
   - User is directed to proposal page
   - Challenge period countdown is displayed
   - User can share link to gain support

6. **Listing Activation**
   - After challenge period, if unchallenged:
     - Listing becomes active
     - Tokens are returned to proposer
     - Notification is sent to user
   - If challenged:
     - User participates in voting process

### 2. Curator Journey: Challenging a Listing

1. **Browse Proposals**
   - User navigates to Proposals page
   - Filters for active proposals
   - Reviews proposals in challenge period

2. **Evaluate Proposal**
   - User clicks on proposal to review details
   - Examines project information
   - Checks external links for verification

3. **Initiate Challenge**
   - If issues found, user clicks "Challenge"
   - Provides detailed reasoning
   - Confirms token stake amount
   - Signs transaction

4. **Voting Period**
   - Challenge enters voting period
   - User can promote challenge to other curators
   - Monitors voting progress

5. **Resolution**
   - After voting period ends:
     - If challenge wins: Proposal rejected, challenger rewarded
     - If challenge loses: Proposal accepted, challenger tokens slashed
   - User receives notification of outcome

### 3. User Journey: Discovering Projects

1. **Landing on Platform**
   - User arrives at home page
   - Views featured projects
   - Explores category navigation

2. **Category Browsing**
   - User selects interesting category
   - Views projects in that category
   - Uses filters to refine results

3. **Project Exploration**
   - User clicks on interesting project
   - Reviews project details and metrics
   - Connects wallet if not connected

4. **Engagement**
   - User upvotes project if they like it
   - Leaves comment or rating
   - Earns token rewards for participation

5. **Further Discovery**
   - User checks related projects section
   - Explores more projects in same category
   - Uses search to find specific projects

### 4. Daily Engagement Journey

1. **Return Visit**
   - User returns to platform
   - Connects wallet
   - Sees streak status on dashboard

2. **Daily Activities**
   - Upvotes at least one project
   - Comments on active discussions
   - Checks proposals in challenge period

3. **Reward Claiming**
   - Completes daily activities
   - Claims streak reward tokens
   - Sees updated streak counter

4. **Engagement Cycle**
   - Returns next day to maintain streak
   - Cycle continues with increased rewards

## Responsive Design Strategy

### Desktop (1200px+)
- Full 3-column grid for listings
- Side-by-side layouts for details
- Expanded navigation
- Full feature visibility

### Tablet (768px - 1199px)
- 2-column grid for listings
- Slightly condensed layouts
- Full navigation with some toggles
- All features available

### Mobile (320px - 767px)
- Single column layouts
- Stacked content sections
- Hamburger menu navigation
- Focus on core functionality
- Simplified cards and interfaces

## Animation and Interaction

- **Micro-interactions**: Subtle feedback for user actions
- **Transaction States**: Visual progress for blockchain transactions
- **Transitions**: Smooth page and component transitions
- **Loading States**: Skeleton loaders for content
- **Empty States**: Engaging illustrations for empty sections

## Accessibility Considerations

- **Color Contrast**: WCAG AA compliance minimum
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Focus States**: Clear visual indicators
- **Font Sizing**: Adjustable text sizing
- **Reduced Motion**: Option for users with motion sensitivity

## Implementation Notes

1. **Component Library**: Build a consistent component system first
2. **Design System**: Document all UI patterns in Storybook
3. **Responsive Priority**: Start with mobile layouts, then expand
4. **Progressive Enhancement**: Core functionality without JavaScript
5. **Performance Budget**: Target sub-2s load times on all pages

This UI/UX documentation provides a comprehensive guide for designing and implementing the user interface of the Token Curated Registry platform. It ensures consistency, usability, and a focused experience that aligns with the project's objectives.
