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
    url: 'https://jup.ag',
    tags: ['SPOT DEX', 'PERPS DEX', 'ONRAMP'],
    status: ListingStatus.LISTED,
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
    tags: ['LIQUID STAKING', 'YIELD'],
    status: ListingStatus.LISTED,
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
    tags: ['PERPS DEX', 'LEVERAGE'],
    status: ListingStatus.LISTED,
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
    tags: ['NFT TRADING', 'ANALYTICS'],
    status: ListingStatus.LISTED,
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
    tags: ['NFT MARKETPLACE', 'LAUNCHPAD'],
    status: ListingStatus.LISTED,
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
    url: 'https://dialect.to',
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
    url: 'https://bonkcoin.com',
    tags: ['MEME', 'COMMUNITY'],
    status: ListingStatus.LISTED,
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
    tags: ['MEV', 'INFRASTRUCTURE'],
    status: ListingStatus.LISTED,
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
    tags: ['ORACLE', 'INFRASTRUCTURE'],
    status: ListingStatus.LISTED,
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
    tags: ['DEX', 'GOVERNANCE'],
    status: ListingStatus.LISTED,
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
    tags: ['COMPUTE', 'INFRASTRUCTURE'],
    status: ListingStatus.LISTED,
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