import { ListingMaker, ListingCurator } from '@/models/Listing';

// Real profile picture URLs (these would be replaced with actual uploaded images)
const PROFILE_PICS = {
  ALEX: '/profiles/alex.jpg',
  SARAH: '/profiles/sarah.jpg',
  MIKE: '/profiles/mike.jpg',
  // Add more as needed
};

// Mock Makers Data
export const mockMakers: ListingMaker[] = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    avatarUrl: PROFILE_PICS.ALEX,
    links: { twitter: 'https://twitter.com/alexchen' }
  },
  {
    name: 'Sarah Wilson',
    role: 'Lead Developer',
    avatarUrl: PROFILE_PICS.SARAH,
    links: { twitter: 'https://twitter.com/sarahw' }
  },
  {
    name: 'Mike Rodriguez',
    role: 'Product Manager',
    avatarUrl: PROFILE_PICS.MIKE,
    links: { twitter: 'https://twitter.com/miker' }
  },
  // Add 17 more makers with placeholder avatars
  {
    name: 'David Park',
    role: 'Technical Lead',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=david`,
    links: { twitter: 'https://twitter.com/davidpark' }
  },
  {
    name: 'Emma Liu',
    role: 'Frontend Developer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=emma`,
    links: { twitter: 'https://twitter.com/emmaliu' }
  },
  {
    name: 'James Smith',
    role: 'Blockchain Engineer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=james`,
    links: { twitter: 'https://twitter.com/jamessmith' }
  },
  {
    name: 'Lisa Wang',
    role: 'UX Designer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=lisa`,
    links: { twitter: 'https://twitter.com/lisawang' }
  },
  {
    name: 'Tom Brown',
    role: 'Backend Developer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=tom`,
    links: { twitter: 'https://twitter.com/tombrown' }
  },
  {
    name: 'Nina Patel',
    role: 'Marketing Lead',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=nina`,
    links: { twitter: 'https://twitter.com/ninapatel' }
  },
  {
    name: 'Kevin Zhang',
    role: 'DevOps Engineer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=kevin`,
    links: { twitter: 'https://twitter.com/kevinzhang' }
  },
  {
    name: 'Rachel Kim',
    role: 'Community Manager',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=rachel`,
    links: { twitter: 'https://twitter.com/rachelkim' }
  },
  {
    name: 'Chris Lee',
    role: 'Smart Contract Developer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=chris`,
    links: { twitter: 'https://twitter.com/chrislee' }
  },
  {
    name: 'Maya Singh',
    role: 'Product Designer',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=maya`,
    links: { twitter: 'https://twitter.com/mayasingh' }
  }
];

// Helper function to create a curator with actions
const createCurator = (name: string, role: ListingCurator['role']): ListingCurator => ({
  id: name.toLowerCase().replace(' ', '-'),
  name,
  role,
  avatarUrl: mockMakers.find(m => m.name === name)?.avatarUrl || 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
  actions: [{
    userId: name.toLowerCase().replace(' ', '-'),
    userName: name,
    action: role === 'submitter' ? 'submit' : role === 'editor' ? 'edit' : 'vote',
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }]
});

// Mock Curators
export const mockCurators = [
  createCurator('Alex Chen', 'submitter'),
  createCurator('Sarah Wilson', 'editor'),
  createCurator('Mike Rodriguez', 'voter'),
  createCurator('David Park', 'submitter'),
  createCurator('Emma Liu', 'editor'),
  createCurator('James Smith', 'voter'),
  createCurator('Lisa Wang', 'submitter'),
  createCurator('Tom Brown', 'editor'),
  createCurator('Nina Patel', 'voter'),
  createCurator('Kevin Zhang', 'submitter'),
  createCurator('Rachel Kim', 'editor'),
  createCurator('Chris Lee', 'voter'),
  createCurator('Maya Singh', 'submitter'),
  // Add more curators as needed
]; 