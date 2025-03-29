import { Category } from '@/types/category';
import { Listing, ListingType, ListingStatus, TCRListing, User, TCRStatus } from '@/models/Listing';

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

// Helper function to generate consistent avatar URL
const getAvatarUrl = (name: string) => {
  const seed = name.replace('.sol', '').toLowerCase();
  return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;
};

// Mock makers with consistent avatar generation
export const mockMakers: User[] = [
  {
    name: 'maker1.sol',
    avatar: getAvatarUrl('maker1.sol'),
    profileUrl: '/profile/maker1'
  },
  {
    name: 'maker2.sol',
    avatar: getAvatarUrl('maker2.sol'),
    profileUrl: '/profile/maker2'
  },
  {
    name: 'maker3.sol',
    avatar: getAvatarUrl('maker3.sol'),
    profileUrl: '/profile/maker3'
  },
  {
    name: 'maker4.sol',
    avatar: getAvatarUrl('maker4.sol'),
    profileUrl: '/profile/maker4'
  },
  {
    name: 'maker5.sol',
    avatar: getAvatarUrl('maker5.sol'),
    profileUrl: '/profile/maker5'
  }
];

// Mock curators with consistent avatar generation
export const mockCurators: User[] = [
  {
    name: 'alice.sol',
    avatar: getAvatarUrl('alice.sol'),
    profileUrl: '/profile/alice'
  },
  {
    name: 'bob.sol',
    avatar: getAvatarUrl('bob.sol'),
    profileUrl: '/profile/bob'
  },
  {
    name: 'carol.sol',
    avatar: getAvatarUrl('carol.sol'),
    profileUrl: '/profile/carol'
  },
  {
    name: 'dave.sol',
    avatar: getAvatarUrl('dave.sol'),
    profileUrl: '/profile/dave'
  },
  {
    name: 'eve.sol',
    avatar: getAvatarUrl('eve.sol'),
    profileUrl: '/profile/eve'
  },
  {
    name: 'frank.sol',
    avatar: getAvatarUrl('frank.sol'),
    profileUrl: '/profile/frank'
  },
  {
    name: 'grace.sol',
    avatar: getAvatarUrl('grace.sol'),
    profileUrl: '/profile/grace'
  },
  {
    name: 'henry.sol',
    avatar: getAvatarUrl('henry.sol'),
    profileUrl: '/profile/henry'
  },
  {
    name: 'ian.sol',
    avatar: getAvatarUrl('ian.sol'),
    profileUrl: '/profile/ian'
  },
  {
    name: 'julia.sol',
    avatar: getAvatarUrl('julia.sol'),
    profileUrl: '/profile/julia'
  }
];

// Helper function to get random makers
const getRandomMakers = (count: number): User[] => {
  const shuffled = [...mockMakers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get random curators
const getRandomCurators = (count: number): User[] => {
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
    id: 'solana-rpg',
    name: 'Solana RPG',
    description: 'Epic blockchain RPG with NFT characters and play-to-earn mechanics',
    type: ListingType.DAPP,
    category: 'gaming',
    url: 'https://solanarps.io',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=solanarps',
    tags: [LISTING_TAGS.GAMING, LISTING_TAGS.P2E, LISTING_TAGS.RPG],
    submissionType: SubmissionType.NEW,
    submittedAt: '2024-03-20T10:00:00Z',
    submitter: mockCurators[0],
    makers: getRandomMakers(3),
    tcrStatus: 'votingPeriod',
    tcrChallenger: mockCurators[1],
    challengedAt: '2024-03-21T15:00:00Z',
    challengeReason: 'Game mechanics are underdeveloped and lack proper documentation',
    votes: {
      for: 65,
      against: 35
    },
    proposedChanges: defaultProposedChanges,
    stakeAmount: 50,
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-21T15:00:00Z',
    status: ListingStatus.PENDING,
    comments: { count: 5 },
    activity: {
      upvotes30d: 45,
      comments30d: 3
    },
    upvotes: 45
  },
  {
    id: 'solana-messenger-edit',
    name: 'Solana Messenger',
    description: 'Decentralized messaging app with end-to-end encryption',
    type: ListingType.DAPP,
    category: 'social',
    url: 'https://solanamessenger.com',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=solanamessenger',
    tags: [LISTING_TAGS.MESSAGING, LISTING_TAGS.SOCIAL],
    submissionType: SubmissionType.EDIT,
    submittedAt: '2024-03-22T09:00:00Z',
    submitter: mockCurators[2],
    makers: getRandomMakers(4),
    tcrStatus: 'rejected',
    tcrChallenger: mockCurators[3],
    challengedAt: '2024-03-22T14:00:00Z',
    challengeReason: 'Proposed encryption changes have security vulnerabilities',
    votes: {
      for: 20,
      against: 80
    },
    proposedChanges: {
      name: false,
      description: true,
      category: false,
      logo: false
    },
    stakeAmount: 50,
    createdAt: '2024-03-22T09:00:00Z',
    updatedAt: '2024-03-22T14:00:00Z',
    status: ListingStatus.PENDING,
    comments: { count: 8 },
    activity: {
      upvotes30d: 25,
      comments30d: 6
    },
    upvotes: 25
  },
  {
    id: 'bonk-dao',
    name: 'BONK DAO',
    description: 'Community-driven DAO for BONK token governance',
    type: ListingType.DAPP,
    category: 'dao',
    url: 'https://bonkdao.io',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=bonkdao',
    tags: [LISTING_TAGS.DAO, LISTING_TAGS.GOVERNANCE, LISTING_TAGS.VOTING],
    submissionType: SubmissionType.NEW,
    submittedAt: '2024-03-23T08:00:00Z',
    submitter: mockCurators[4],
    makers: getRandomMakers(5),
    tcrStatus: 'challengePeriod',
    proposedChanges: defaultProposedChanges,
    stakeAmount: 50,
    createdAt: '2024-03-23T08:00:00Z',
    updatedAt: '2024-03-23T08:00:00Z',
    status: ListingStatus.PENDING,
    comments: { count: 2 },
    activity: {
      upvotes30d: 15,
      comments30d: 2
    },
    upvotes: 15
  },
  {
    id: 'jupiter-update',
    name: 'Jupiter',
    description: 'Adding margin trading features to the leading Solana DEX aggregator',
    type: ListingType.DAPP,
    category: 'defi',
    url: 'https://jup.ag',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=jupiter',
    tags: [LISTING_TAGS.SPOT_DEX, LISTING_TAGS.PERPS_DEX, LISTING_TAGS.LEVERAGE],
    submissionType: SubmissionType.EDIT,
    submittedAt: '2024-03-21T16:00:00Z',
    submitter: mockCurators[5],
    makers: getRandomMakers(3),
    tcrStatus: 'votingPeriod',
    tcrChallenger: mockCurators[6],
    challengedAt: '2024-03-22T10:00:00Z',
    challengeReason: 'Margin trading feature is not yet launched and tested',
    votes: {
      for: 80,
      against: 20
    },
    proposedChanges: {
      name: false,
      description: true,
      category: false,
      logo: false
    },
    stakeAmount: 50,
    createdAt: '2024-03-21T16:00:00Z',
    updatedAt: '2024-03-22T10:00:00Z',
    status: ListingStatus.PENDING,
    comments: { count: 12 },
    activity: {
      upvotes30d: 65,
      comments30d: 8
    },
    upvotes: 65
  },
  {
    id: 'solana-nft-marketplace',
    name: 'NFT Plaza',
    description: 'Commission-free NFT marketplace with instant settlements',
    type: ListingType.DAPP,
    category: 'nft',
    url: 'https://nftplaza.sol',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=nftplaza',
    tags: [LISTING_TAGS.NFT_MARKETPLACE, LISTING_TAGS.NFT_TRADING],
    submissionType: SubmissionType.DELETE,
    submittedAt: '2024-03-24T11:00:00Z',
    submitter: mockCurators[7],
    makers: getRandomMakers(2),
    tcrStatus: 'rejected',
    tcrChallenger: mockCurators[8],
    challengedAt: '2024-03-24T15:00:00Z',
    challengeReason: 'Platform is still active with significant daily volume',
    votes: {
      for: 10,
      against: 90
    },
    proposedChanges: defaultProposedChanges,
    stakeAmount: 50,
    createdAt: '2024-03-24T11:00:00Z',
    updatedAt: '2024-03-24T15:00:00Z',
    status: ListingStatus.PENDING,
    comments: { count: 4 },
    activity: {
      upvotes30d: 8,
      comments30d: 4
    },
    upvotes: 8
  }
]; 