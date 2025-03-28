import { Category } from '@/types/category';
import { Listing, ListingType } from '@/models/Listing';

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
  return oneYearAgo + Math.random() * (now - oneYearAgo);
};

// Mock Listings
export const mockListings: Listing[] = [
  // Dapps
  {
    id: 'jupiter',
    type: ListingType.DAPP,
    category: 'defi',
    name: 'Jupiter',
    description: 'The best swap aggregator on Solana',
    url: 'https://jup.ag',
    logoUrl: '/logos/jupiter.png',
    status: 'LISTED',
    createdAt: '2024-03-28T00:00:00Z',
    updatedAt: '2024-03-28T00:00:00Z',
    upvotes: 1000,
    metadata: {
      dapp: {
        platform: 'solana',
        features: ['swap', 'aggregator'],
        status: 'live'
      }
    }
  },
  {
    id: 'tensor',
    type: ListingType.DAPP,
    category: 'nft',
    name: 'Tensor',
    description: 'The most advanced NFT trading platform on Solana',
    url: 'https://tensor.trade',
    logoUrl: '/logos/tensor.png',
    status: 'LISTED',
    createdAt: '2024-03-28T00:00:00Z',
    updatedAt: '2024-03-28T00:00:00Z',
    upvotes: 800,
    metadata: {
      dapp: {
        platform: 'solana',
        features: ['nft-trading', 'analytics'],
        status: 'live'
      }
    }
  },
  // Tokens
  {
    id: 'bonk',
    type: ListingType.TOKEN,
    category: 'meme',
    name: 'BONK',
    description: 'The first Solana dog coin to truly go viral',
    url: 'https://bonkcoin.com',
    logoUrl: '/logos/bonk.png',
    status: 'LISTED',
    createdAt: '2024-03-28T00:00:00Z',
    updatedAt: '2024-03-28T00:00:00Z',
    upvotes: 1500,
    metadata: {
      token: {
        symbol: 'BONK',
        marketCap: '500000000',
        price: '0.00001234',
        volume24h: '1000000'
      }
    }
  },
  {
    id: 'jito',
    type: ListingType.TOKEN,
    category: 'defi-token',
    name: 'Jito',
    description: 'The native token of the Jito MEV infrastructure',
    url: 'https://jito.network',
    logoUrl: '/logos/jito.png',
    status: 'LISTED',
    createdAt: '2024-03-28T00:00:00Z',
    updatedAt: '2024-03-28T00:00:00Z',
    upvotes: 700,
    metadata: {
      token: {
        symbol: 'JTO',
        marketCap: '300000000',
        price: '3.45',
        volume24h: '5000000'
      }
    }
  }
]; 