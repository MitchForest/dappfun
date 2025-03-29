import { Category } from '@/types/category';
import { Listing, ListingType, ListingStatus, TCRListing, User, TCRStatus } from '@/models/Listing';
import { mockMakers, mockCurators } from './mock-users';

// Predefined tags for consistent usage
export const LISTING_TAGS = {
  // DeFi tags
  SPOT_DEX: 'SPOT DEX',
  PERPS_DEX: 'PERPS DEX',
  AMM: 'AMM',
  SWAP: 'SWAP',
  LIQUID_STAKING: 'LIQUID STAKING',
  YIELD: 'YIELD',
  LEVERAGE: 'LEVERAGE',
  ONRAMP: 'ONRAMP',
  
  // NFT tags
  NFT_MARKETPLACE: 'NFT MARKETPLACE',
  NFT_TRADING: 'NFT TRADING',
  NFT_ANALYTICS: 'NFT ANALYTICS',
  LAUNCHPAD: 'LAUNCHPAD',
  
  // Gaming tags
  GAMING: 'GAMING',
  MOVE2EARN: 'MOVE2EARN',
  P2E: 'P2E',
  RPG: 'RPG',
  
  // Social tags
  MESSAGING: 'MESSAGING',
  NOTIFICATIONS: 'NOTIFICATIONS',
  SOCIAL: 'SOCIAL',
  
  // DAO tags
  DAO: 'DAO',
  GOVERNANCE: 'GOVERNANCE',
  VOTING: 'VOTING',
  
  // Token tags
  UTILITY_TOKEN: 'UTILITY TOKEN',
  GOVERNANCE_TOKEN: 'GOVERNANCE TOKEN',
  MEME_TOKEN: 'MEME TOKEN'
};

export const categories: Category[] = [
  // Dapp Categories
  {
    id: 'defi',
    type: 'dapp',
    label: 'DeFi',
    description: 'Decentralized finance applications and protocols',
    icon: 'wallet'
  },
  {
    id: 'nft',
    type: 'dapp',
    label: 'NFT',
    description: 'NFT marketplaces and tools',
    icon: 'image'
  },
  {
    id: 'gaming',
    type: 'dapp',
    label: 'Gaming',
    description: 'Web3 games and gaming infrastructure'
  },
  {
    id: 'social',
    type: 'dapp',
    label: 'Social',
    description: 'Social networks, messaging, and content platforms'
  },
  {
    id: 'dao',
    type: 'dapp',
    label: 'DAOs',
    description: 'Decentralized autonomous organizations and governance tools'
  },

  // Token Categories
  {
    id: 'meme',
    type: 'token',
    label: 'Meme',
    description: 'Community-driven meme tokens',
    icon: 'smile'
  },
  {
    id: 'defi-token',
    type: 'token',
    label: 'DeFi',
    description: 'Tokens powering DeFi protocols',
    icon: 'trending-up'
  },
  {
    id: 'gaming-tokens',
    type: 'token',
    label: 'Gaming Tokens',
    description: 'In-game currencies and gaming platform tokens'
  },
  {
    id: 'infrastructure',
    type: 'token',
    label: 'Infrastructure',
    description: 'Tokens powering blockchain infrastructure and core protocols'
  }
];

// Helper function to generate a random date within the last year
const randomDate = () => {
  const now = Date.now();
  const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
  return new Date(oneYearAgo + Math.random() * (now - oneYearAgo)).toISOString();
};

// Helper function to get random makers
const getRandomMakers = (count: number) => {
  const shuffled = [...mockMakers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get random curators
const getRandomCurators = (count: number) => {
  const shuffled = [...mockCurators].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock Listings
export const mockListings: Listing[] = [
  // DeFi Dapps
  {
    id: 'jupiter',
    type: ListingType.DAPP,
    category: 'defi',
    name: 'Jupiter',
    description: 'The best swap aggregator on Solana',
    url: 'https://jup.ag',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=jupiter',
    tags: [LISTING_TAGS.SPOT_DEX, LISTING_TAGS.PERPS_DEX, LISTING_TAGS.ONRAMP],
    status: ListingStatus.LISTED,
    submittedAt: '2023-01-15T00:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
    lastApprovedAt: '2024-03-15T00:00:00Z',
    upvotes: 25000,
    comments: { count: 1800 },
    makers: getRandomMakers(3),
    submitter: mockCurators[0],
    curators: getRandomCurators(4),
    activity: {
      upvotes30d: 800,
      comments30d: 45
    }
  },
  {
    id: 'marinade',
    type: ListingType.DAPP,
    category: 'defi',
    name: 'Marinade',
    description: 'Liquid staking protocol for Solana',
    url: 'https://marinade.finance',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=marinade',
    tags: [LISTING_TAGS.LIQUID_STAKING, LISTING_TAGS.YIELD],
    status: ListingStatus.LISTED,
    submittedAt: '2023-03-20T00:00:00Z',
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
    lastApprovedAt: '2024-03-10T00:00:00Z',
    upvotes: 18000,
    comments: { count: 1200 },
    makers: getRandomMakers(2),
    submitter: mockCurators[1],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 2500,
      comments30d: 180
    }
  },
  {
    id: 'drift',
    type: ListingType.DAPP,
    category: 'defi',
    name: 'Drift Protocol',
    description: 'Decentralized perpetual exchange',
    url: 'https://drift.trade',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=drift',
    tags: [LISTING_TAGS.PERPS_DEX, LISTING_TAGS.LEVERAGE],
    status: ListingStatus.LISTED,
    submittedAt: '2024-02-01T00:00:00Z',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-18T00:00:00Z',
    lastApprovedAt: '2024-03-18T00:00:00Z',
    upvotes: 2000,
    comments: { count: 150 },
    makers: getRandomMakers(4),
    submitter: mockCurators[2],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 1800,
      comments30d: 140
    }
  },
  
  // NFT Dapps
  {
    id: 'tensor',
    type: ListingType.DAPP,
    category: 'nft',
    name: 'Tensor',
    description: 'Advanced NFT trading platform',
    url: 'https://tensor.trade',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=tensor',
    tags: [LISTING_TAGS.NFT_TRADING, LISTING_TAGS.NFT_ANALYTICS],
    status: ListingStatus.LISTED,
    submittedAt: '2024-03-01T00:00:00Z',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
    lastApprovedAt: '2024-03-20T00:00:00Z',
    upvotes: 1500,
    comments: { count: 120 },
    makers: getRandomMakers(3),
    submitter: mockCurators[3],
    curators: getRandomCurators(4),
    activity: {
      upvotes30d: 1500,
      comments30d: 120
    }
  },
  {
    id: 'magic-eden',
    type: ListingType.DAPP,
    category: 'nft',
    name: 'Magic Eden',
    description: 'Leading NFT marketplace',
    url: 'https://magiceden.io',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=magiceden',
    tags: [LISTING_TAGS.NFT_MARKETPLACE, LISTING_TAGS.LAUNCHPAD],
    status: ListingStatus.LISTED,
    submittedAt: '2023-06-15T00:00:00Z',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
    lastApprovedAt: '2024-03-12T00:00:00Z',
    upvotes: 30000,
    comments: { count: 2500 },
    makers: getRandomMakers(3),
    submitter: mockCurators[4],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 300,
      comments30d: 25
    }
  },

  // Gaming Dapps
  {
    id: 'genopets',
    type: ListingType.DAPP,
    category: 'gaming',
    name: 'Genopets',
    description: 'Move-to-earn gaming platform',
    url: 'https://genopets.me',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=genopets',
    tags: [LISTING_TAGS.MOVE2EARN, LISTING_TAGS.RPG],
    status: ListingStatus.LISTED,
    submittedAt: randomDate(),
    createdAt: randomDate(),
    updatedAt: randomDate(),
    upvotes: 700,
    comments: { count: 38 },
    makers: getRandomMakers(4),
    submitter: mockCurators[5],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 150,
      comments30d: 14
    }
  },

  // Social Dapps
  {
    id: 'dialect',
    type: ListingType.DAPP,
    category: 'social',
    name: 'Dialect',
    description: 'Web3 messaging protocol',
    url: 'https://dialect.to',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=dialect',
    tags: [LISTING_TAGS.MESSAGING, LISTING_TAGS.NOTIFICATIONS],
    status: ListingStatus.LISTED,
    submittedAt: randomDate(),
    createdAt: randomDate(),
    updatedAt: randomDate(),
    upvotes: 600,
    comments: { count: 30 },
    makers: getRandomMakers(3),
    submitter: mockCurators[6],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 130,
      comments30d: 10
    }
  },

  // Tokens
  {
    id: 'bonk',
    type: ListingType.TOKEN,
    category: 'meme',
    name: 'BONK',
    description: 'Solana\'s first viral meme token',
    url: 'https://bonkcoin.com',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=bonk',
    tags: [LISTING_TAGS.MEME_TOKEN],
    status: ListingStatus.LISTED,
    submittedAt: '2023-12-25T00:00:00Z',
    createdAt: '2023-12-25T00:00:00Z',
    updatedAt: '2024-03-19T00:00:00Z',
    lastApprovedAt: '2024-03-19T00:00:00Z',
    upvotes: 15000,
    comments: { count: 1200 },
    makers: getRandomMakers(2),
    submitter: mockCurators[7],
    curators: getRandomCurators(4),
    activity: {
      upvotes30d: 3500,
      comments30d: 280
    }
  },
  {
    id: 'jito',
    type: ListingType.TOKEN,
    category: 'infrastructure',
    name: 'Jito',
    description: 'MEV infrastructure token',
    url: 'https://jito.network',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=jito',
    tags: [LISTING_TAGS.UTILITY_TOKEN],
    status: ListingStatus.LISTED,
    submittedAt: '2024-01-10T00:00:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-03-17T00:00:00Z',
    lastApprovedAt: '2024-03-17T00:00:00Z',
    upvotes: 8000,
    comments: { count: 600 },
    makers: getRandomMakers(3),
    submitter: mockCurators[8],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 2800,
      comments30d: 220
    }
  },
  {
    id: 'pyth',
    type: ListingType.TOKEN,
    category: 'infrastructure',
    name: 'Pyth',
    description: 'Oracle network token',
    url: 'https://pyth.network',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=pyth',
    tags: [LISTING_TAGS.UTILITY_TOKEN],
    status: ListingStatus.LISTED,
    submittedAt: '2023-08-15T00:00:00Z',
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2024-03-14T00:00:00Z',
    lastApprovedAt: '2024-03-14T00:00:00Z',
    upvotes: 20000,
    comments: { count: 1500 },
    makers: getRandomMakers(3),
    submitter: mockCurators[9],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 400,
      comments30d: 35
    }
  },
  {
    id: 'orca',
    type: ListingType.TOKEN,
    category: 'defi-token',
    name: 'Orca',
    description: 'DEX governance token',
    url: 'https://orca.so',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=orca',
    tags: [LISTING_TAGS.GOVERNANCE_TOKEN],
    status: ListingStatus.LISTED,
    submittedAt: '2023-05-20T00:00:00Z',
    createdAt: '2023-05-20T00:00:00Z',
    updatedAt: '2024-03-16T00:00:00Z',
    lastApprovedAt: '2024-03-16T00:00:00Z',
    upvotes: 25000,
    comments: { count: 1800 },
    makers: getRandomMakers(3),
    submitter: mockCurators[10],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 300,
      comments30d: 25
    }
  },
  {
    id: 'render',
    type: ListingType.TOKEN,
    category: 'infrastructure',
    name: 'Render',
    description: 'Decentralized GPU rendering network',
    url: 'https://rendernetwork.com',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=render',
    tags: [LISTING_TAGS.UTILITY_TOKEN],
    status: ListingStatus.LISTED,
    submittedAt: '2024-03-10T00:00:00Z',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-21T00:00:00Z',
    lastApprovedAt: '2024-03-21T00:00:00Z',
    upvotes: 2000,
    comments: { count: 180 },
    makers: getRandomMakers(3),
    submitter: mockCurators[11],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 2000,
      comments30d: 180
    }
  }
];

const defaultProposedChanges = {
  name: false,
  description: false,
  category: false,
  logo: false
};

export enum SubmissionType {
  NEW = 'NEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

// Add slashing rules comment
/**
 * TCR Slashing Rules:
 * For both submitters and challengers, tokens are slashed based on vote margins:
 * - 50-60% against: No slashing, tokens returned
 * - 60-70% against: 25% tokens slashed
 * - 70-80% against: 50% tokens slashed
 * - 80-90% against: 75% tokens slashed
 * - >90% against: 100% tokens slashed
 * 
 * These rules apply to:
 * - Submitters when their submission is rejected
 * - Challengers when their challenge fails (listing is approved)
 */

// Mock TCR Listings
export const mockTCRListings: TCRListing[] = [
  {
    id: '1',
    name: 'SolanaSwap',
    description: 'A decentralized exchange on Solana',
    type: ListingType.DAPP,
    category: 'DeFi',
    tags: ['DEX', 'AMM', 'Swap'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=SolanaSwap',
    url: 'https://solanaswap.io',
    status: ListingStatus.PENDING,
    makers: [
      {
        name: 'alice.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alice',
        profileUrl: '/profile/alice'
      }
    ],
    submitter: {
      name: 'alice.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alice',
      profileUrl: '/profile/alice'
    },
    submittedAt: '2024-03-15T10:00:00Z',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    upvotes: 120,
    comments: { count: 5 },
    activity: {
      upvotes30d: 50,
      comments30d: 3
    },
    tcrStatus: 'challengePeriod' as TCRStatus,
    tcrEndTime: '2024-03-22T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: defaultProposedChanges,
    submissionType: SubmissionType.NEW
  },
  {
    id: '2',
    name: 'NFT Marketplace',
    description: 'The premier NFT marketplace on Solana',
    type: ListingType.DAPP,
    category: 'NFTs',
    tags: ['NFT', 'Marketplace'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=NFTMarketplace',
    url: 'https://nftmarket.io',
    status: ListingStatus.PENDING,
    makers: [
      {
        name: 'bob.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=bob',
        profileUrl: '/profile/bob'
      }
    ],
    submitter: {
      name: 'bob.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=bob',
      profileUrl: '/profile/bob'
    },
    submittedAt: '2024-03-14T10:00:00Z',
    createdAt: '2024-03-14T10:00:00Z',
    updatedAt: '2024-03-14T10:00:00Z',
    upvotes: 80,
    comments: { count: 3 },
    activity: {
      upvotes30d: 30,
      comments30d: 2
    },
    tcrStatus: 'votingPeriod' as TCRStatus,
    tcrEndTime: '2024-03-21T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: {
      name: false,
      description: true,
      category: false,
      logo: true
    },
    submissionType: SubmissionType.EDIT,
    votes: {
      for: 300,
      against: 700
    },
    challenger: {
      name: 'dave.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=dave',
      profileUrl: '/profile/dave'
    },
    challengeReason: 'Inaccurate project description and misleading logo'
  },
  {
    id: '3',
    name: 'Solana Yield',
    description: 'Yield aggregator for Solana DeFi',
    type: ListingType.DAPP,
    category: 'DeFi',
    tags: ['Yield', 'Farming'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=SolanaYield',
    url: 'https://solanayield.io',
    status: ListingStatus.LISTED,
    makers: [
      {
        name: 'carol.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=carol',
        profileUrl: '/profile/carol'
      }
    ],
    submitter: {
      name: 'carol.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=carol',
      profileUrl: '/profile/carol'
    },
    submittedAt: '2024-03-13T10:00:00Z',
    createdAt: '2024-03-13T10:00:00Z',
    updatedAt: '2024-03-13T10:00:00Z',
    upvotes: 150,
    comments: { count: 8 },
    activity: {
      upvotes30d: 70,
      comments30d: 5
    },
    tcrStatus: 'approved' as TCRStatus,
    tcrEndTime: '2024-03-20T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: defaultProposedChanges,
    submissionType: SubmissionType.NEW,
    votes: {
      for: 900,
      against: 100
    }
  },
  {
    id: '4',
    name: 'SolanaDAO',
    description: 'Governance platform for Solana projects',
    type: ListingType.DAPP,
    category: 'DAOs',
    tags: ['Governance', 'DAO'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=SolanaDAO',
    url: 'https://solanadao.io',
    status: ListingStatus.PENDING,
    makers: [
      {
        name: 'eve.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=eve',
        profileUrl: '/profile/eve'
      }
    ],
    submitter: {
      name: 'eve.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=eve',
      profileUrl: '/profile/eve'
    },
    submittedAt: '2024-03-16T10:00:00Z',
    createdAt: '2024-03-16T10:00:00Z',
    updatedAt: '2024-03-16T10:00:00Z',
    upvotes: 45,
    comments: { count: 2 },
    activity: {
      upvotes30d: 45,
      comments30d: 2
    },
    tcrStatus: 'challengePeriod' as TCRStatus,
    tcrEndTime: '2024-03-23T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: defaultProposedChanges,
    submissionType: SubmissionType.NEW
  },
  {
    id: '5',
    name: 'Solana RPG',
    description: 'On-chain role-playing game with NFT characters',
    type: ListingType.DAPP,
    category: 'Gaming',
    tags: ['Gaming', 'NFT', 'RPG'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=SolanaRPG',
    url: 'https://solanargg.io',
    status: ListingStatus.PENDING,
    makers: [
      {
        name: 'frank.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=frank',
        profileUrl: '/profile/frank'
      }
    ],
    submitter: {
      name: 'frank.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=frank',
      profileUrl: '/profile/frank'
    },
    submittedAt: '2024-03-12T10:00:00Z',
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-12T10:00:00Z',
    upvotes: 75,
    comments: { count: 6 },
    activity: {
      upvotes30d: 75,
      comments30d: 6
    },
    tcrStatus: 'votingPeriod' as TCRStatus,
    tcrEndTime: '2024-03-19T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: defaultProposedChanges,
    submissionType: SubmissionType.NEW,
    votes: {
      for: 650,
      against: 350
    },
    challenger: {
      name: 'grace.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=grace',
      profileUrl: '/profile/grace'
    },
    challengeReason: 'Game mechanics not fully developed, early to list'
  },
  {
    id: '6',
    name: 'Jupiter',
    description: 'Leading Solana DEX aggregator - Now with margin trading',
    type: ListingType.DAPP,
    category: 'DeFi',
    tags: ['DEX', 'Trading'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Jupiter',
    url: 'https://jupiter.io',
    status: ListingStatus.PENDING,
    makers: [
      {
        name: 'henry.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=henry',
        profileUrl: '/profile/henry'
      }
    ],
    submitter: {
      name: 'henry.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=henry',
      profileUrl: '/profile/henry'
    },
    submittedAt: '2024-03-11T10:00:00Z',
    createdAt: '2024-03-11T10:00:00Z',
    updatedAt: '2024-03-11T10:00:00Z',
    upvotes: 250,
    comments: { count: 12 },
    activity: {
      upvotes30d: 250,
      comments30d: 12
    },
    tcrStatus: 'votingPeriod' as TCRStatus,
    tcrEndTime: '2024-03-18T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: {
      name: false,
      description: true,
      category: false,
      logo: false
    },
    submissionType: SubmissionType.EDIT,
    votes: {
      for: 800,
      against: 200
    },
    challenger: {
      name: 'ian.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=ian',
      profileUrl: '/profile/ian'
    },
    challengeReason: 'Margin trading feature not yet launched'
  },
  {
    id: '7',
    name: 'Solana Messenger',
    description: 'Decentralized messaging with wallet-to-wallet encryption',
    type: ListingType.DAPP,
    category: 'Social',
    tags: ['Messaging', 'Social'],
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=SolanaMessenger',
    url: 'https://solanamessenger.io',
    status: ListingStatus.PENDING,
    makers: [
      {
        name: 'julia.sol',
        avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=julia',
        profileUrl: '/profile/julia'
      }
    ],
    submitter: {
      name: 'julia.sol',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=julia',
      profileUrl: '/profile/julia'
    },
    submittedAt: '2024-03-17T10:00:00Z',
    createdAt: '2024-03-17T10:00:00Z',
    updatedAt: '2024-03-17T10:00:00Z',
    upvotes: 30,
    comments: { count: 1 },
    activity: {
      upvotes30d: 30,
      comments30d: 1
    },
    tcrStatus: 'challengePeriod' as TCRStatus,
    tcrEndTime: '2024-03-24T10:00:00Z',
    stakeAmount: 50,
    proposedChanges: defaultProposedChanges,
    submissionType: SubmissionType.NEW
  }
]; 