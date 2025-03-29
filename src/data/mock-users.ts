import { User } from '@/models/Listing';

// Real profile picture URLs (these would be replaced with actual uploaded images)
const PROFILE_PICS = {
  ALEX: '/profiles/alex.jpg',
  SARAH: '/profiles/sarah.jpg',
  MIKE: '/profiles/mike.jpg',
  // Add more as needed
};

// Mock Makers Data
export const mockMakers: User[] = [
  {
    name: 'Alex Chen',
    avatar: PROFILE_PICS.ALEX,
    profileUrl: '/users/alex-chen'
  },
  {
    name: 'Sarah Wilson',
    avatar: PROFILE_PICS.SARAH,
    profileUrl: '/users/sarah-wilson'
  },
  {
    name: 'Mike Rodriguez',
    avatar: PROFILE_PICS.MIKE,
    profileUrl: '/users/mike-rodriguez'
  },
  // Add 17 more makers with placeholder avatars
  {
    name: 'David Park',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=david`,
    profileUrl: '/users/david-park'
  },
  {
    name: 'Emma Liu',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=emma`,
    profileUrl: '/users/emma-liu'
  },
  {
    name: 'James Smith',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=james`,
    profileUrl: '/users/james-smith'
  },
  {
    name: 'Lisa Wang',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=lisa`,
    profileUrl: '/users/lisa-wang'
  },
  {
    name: 'Tom Brown',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=tom`,
    profileUrl: '/users/tom-brown'
  },
  {
    name: 'Nina Patel',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=nina`,
    profileUrl: '/users/nina-patel'
  },
  {
    name: 'Kevin Zhang',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=kevin`,
    profileUrl: '/users/kevin-zhang'
  },
  {
    name: 'Rachel Kim',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=rachel`,
    profileUrl: '/users/rachel-kim'
  },
  {
    name: 'Chris Lee',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=chris`,
    profileUrl: '/users/chris-lee'
  },
  {
    name: 'Maya Singh',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=maya`,
    profileUrl: '/users/maya-singh'
  }
];

// Helper function to create a curator
const createCurator = (name: string): User => ({
  name,
  avatar: mockMakers.find(m => m.name === name)?.avatar || 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
  profileUrl: `/users/${name.toLowerCase().replace(' ', '-')}`
});

// Mock Curators
export const mockCurators = [
  createCurator('Alex Chen'),
  createCurator('Sarah Wilson'),
  createCurator('Mike Rodriguez'),
  createCurator('David Park'),
  createCurator('Emma Liu'),
  createCurator('James Smith'),
  createCurator('Lisa Wang'),
  createCurator('Tom Brown'),
  createCurator('Nina Patel'),
  createCurator('Kevin Zhang'),
  createCurator('Rachel Kim'),
  createCurator('Chris Lee'),
  createCurator('Maya Singh')
]; 