import { Category } from '@/types/category';
import { Listing, ListingType, ListingStatus } from '@/models/Listing';
import { mockMakers, mockCurators } from './mock-users';

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
    tags: ['SPOT DEX', 'PERPS DEX', 'ONRAMP'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    updatedAt: randomDate(),
    lastApprovedAt: randomDate(),
    upvotes: 1000,
    comments: { count: 50 },
    makers: getRandomMakers(3),
    submitter: mockCurators[0],
    curators: getRandomCurators(4),
    activity: {
      upvotes30d: 250,
      comments30d: 15
    }
  },
  {
    id: 'marinade',
    type: ListingType.DAPP,
    category: 'defi',
    name: 'Marinade',
    description: 'Liquid staking protocol for Solana',
    tags: ['LIQUID STAKING', 'YIELD'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 800,
    comments: { count: 35 },
    makers: getRandomMakers(2),
    submitter: mockCurators[1],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 180,
      comments30d: 12
    }
  },
  {
    id: 'drift',
    type: ListingType.DAPP,
    category: 'defi',
    name: 'Drift Protocol',
    description: 'Decentralized perpetual exchange',
    tags: ['PERPS DEX', 'LEVERAGE'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 750,
    comments: { count: 40 },
    makers: getRandomMakers(4),
    submitter: mockCurators[2],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 160,
      comments30d: 15
    }
  },
  
  // NFT Dapps
  {
    id: 'tensor',
    type: ListingType.DAPP,
    category: 'nft',
    name: 'Tensor',
    description: 'Advanced NFT trading platform',
    tags: ['NFT TRADING', 'ANALYTICS'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 900,
    comments: { count: 45 },
    makers: getRandomMakers(3),
    submitter: mockCurators[3],
    curators: getRandomCurators(4),
    activity: {
      upvotes30d: 200,
      comments30d: 20
    }
  },
  {
    id: 'magic-eden',
    type: ListingType.DAPP,
    category: 'nft',
    name: 'Magic Eden',
    description: 'Leading NFT marketplace',
    tags: ['NFT MARKETPLACE', 'LAUNCHPAD'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 850,
    comments: { count: 42 },
    makers: getRandomMakers(3),
    submitter: mockCurators[4],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 190,
      comments30d: 18
    }
  },

  // Gaming Dapps
  {
    id: 'genopets',
    type: ListingType.DAPP,
    category: 'gaming',
    name: 'Genopets',
    description: 'Move-to-earn gaming platform',
    tags: ['MOVE2EARN', 'RPG'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
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
    tags: ['MESSAGING', 'NOTIFICATIONS'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
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
    tags: ['MEME', 'COMMUNITY'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 1500,
    comments: { count: 75 },
    makers: getRandomMakers(2),
    submitter: mockCurators[7],
    curators: getRandomCurators(4),
    activity: {
      upvotes30d: 400,
      comments30d: 25
    }
  },
  {
    id: 'jito',
    type: ListingType.TOKEN,
    category: 'infrastructure',
    name: 'Jito',
    description: 'MEV infrastructure token',
    tags: ['MEV', 'INFRASTRUCTURE'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 1200,
    comments: { count: 60 },
    makers: getRandomMakers(3),
    submitter: mockCurators[8],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 300,
      comments30d: 20
    }
  },
  {
    id: 'pyth',
    type: ListingType.TOKEN,
    category: 'infrastructure',
    name: 'Pyth',
    description: 'Oracle network token',
    tags: ['ORACLE', 'INFRASTRUCTURE'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 1100,
    comments: { count: 55 },
    makers: getRandomMakers(3),
    submitter: mockCurators[9],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 280,
      comments30d: 18
    }
  },
  {
    id: 'orca',
    type: ListingType.TOKEN,
    category: 'defi-token',
    name: 'Orca',
    description: 'DEX governance token',
    tags: ['DEX', 'GOVERNANCE'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 1000,
    comments: { count: 50 },
    makers: getRandomMakers(3),
    submitter: mockCurators[10],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 250,
      comments30d: 15
    }
  },
  {
    id: 'render',
    type: ListingType.TOKEN,
    category: 'infrastructure',
    name: 'Render',
    description: 'Decentralized GPU rendering network',
    tags: ['COMPUTE', 'INFRASTRUCTURE'],
    status: ListingStatus.LISTED,
    createdAt: randomDate(),
    upvotes: 900,
    comments: { count: 45 },
    makers: getRandomMakers(3),
    submitter: mockCurators[11],
    curators: getRandomCurators(3),
    activity: {
      upvotes30d: 220,
      comments30d: 14
    }
  }
]; 