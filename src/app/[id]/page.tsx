'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star, MessageSquare, Users, GitHub } from 'lucide-react';
import { mockListings, mockTCRListings } from '@/data/mock-data';
import { Listing, User, TCRListing } from '@/models/Listing';

// Helper components
function ExternalLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`inline-flex items-center gap-1 hover:underline ${className}`}
    >
      {children}
      <ArrowUpRight className="w-3 h-3" />
    </a>
  );
}

function UserAvatar({ user, size = 'md' }: { user: User; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { width: 24, height: 24, className: 'w-6 h-6' },
    md: { width: 40, height: 40, className: 'w-10 h-10' },
    lg: { width: 64, height: 64, className: 'w-16 h-16' },
  };
  
  return (
    <Link href={user.profileUrl} className="group flex flex-col items-center">
      <div className="relative">
        <Image
          src={user.avatar}
          alt={user.name}
          width={sizes[size].width}
          height={sizes[size].height}
          className={`${sizes[size].className} rounded-full transition-transform group-hover:scale-105`}
          unoptimized
        />
      </div>
      <span className="text-sm mt-1 text-gray-700 group-hover:text-gray-900">{user.name}</span>
    </Link>
  );
}

interface ProjectStats {
  upvotes: number;
  followers: number;
  comments: number;
  reviews: number;
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Listing | TCRListing | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [stats, setStats] = useState<ProjectStats>({
    upvotes: 0,
    followers: 0,
    comments: 0,
    reviews: 0
  });

  useEffect(() => {
    // Find the project from mock data
    const foundProject = [...mockListings, ...mockTCRListings].find(
      listing => listing.id === params.id
    );
    
    if (foundProject) {
      setProject(foundProject);
      // Set mock stats
      setStats({
        upvotes: foundProject.upvotes,
        followers: Math.floor(foundProject.upvotes * 0.4),
        comments: foundProject.comments.count,
        reviews: Math.floor(foundProject.comments.count * 0.3),
      });
    }
  }, [params.id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
  };

  // Loading state
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading project...</div>
      </div>
    );
  }

  // Generate curator list combining submitters, challengers, etc.
  const getCurators = () => {
    const curators = new Map<string, User>();
    
    // Add submitter
    if (project.submitter) {
      curators.set(project.submitter.name, project.submitter);
    }
    
    // Add challenger if exists
    if ('tcrChallenger' in project && project.tcrChallenger) {
      curators.set(project.tcrChallenger.name, project.tcrChallenger);
    }
    
    // Add existing curators
    if (project.curators) {
      project.curators.forEach(curator => {
        curators.set(curator.name, curator);
      });
    }
    
    return Array.from(curators.values());
  };

  const curators = getCurators();
  const demoScreenshot = `https://picsum.photos/seed/${project.id}/1200/630`;

  return (
    <div className="max-w-7xl mx-auto pb-16">
      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="w-full h-96 rounded-xl overflow-hidden relative bg-gray-100">
          <Image 
            src={demoScreenshot} 
            alt={`${project.name} screenshot`}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <div className="relative -mt-24 px-8 py-6 bg-white shadow-xl rounded-xl max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                src={project.logo}
                alt={project.name}
                width={64}
                height={64}
                className="rounded-xl object-cover"
                unoptimized
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                  {project.category.toUpperCase()}
                </span>
                {project.tags.slice(0, 5).map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:ml-auto">
              <button 
                onClick={handleFollow}
                className={`px-4 py-2 rounded-lg border ${
                  isFollowing 
                    ? 'border-gray-300 bg-gray-50 text-gray-700' 
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                } flex items-center gap-2`}
              >
                <Star className="w-4 h-4" fill={isFollowing ? 'currentColor' : 'none'} />
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              </button>
              <ExternalLink 
                href={project.url} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Visit Site
              </ExternalLink>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-500">Upvotes</p>
              <p className="text-xl font-semibold">{stats.upvotes.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <p className="text-xl font-semibold">{stats.followers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Comments</p>
              <p className="text-xl font-semibold">{stats.comments.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reviews</p>
              <p className="text-xl font-semibold">{stats.reviews.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <div className="sticky top-[65px] bg-white z-10 border-b mb-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-8 no-scrollbar">
            <a href="#overview" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Overview</a>
            <a href="#makers" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Makers</a>
            <a href="#curators" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Curators</a>
            <a href="#reviews" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Reviews</a>
            <a href="#comments" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">Comments</a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700">{project.description}</p>

              {/* Extended description - in a real app, this would come from the API */}
              <p className="text-gray-700">
                This is an extended description of {project.name}. In a real application, this would be a longer, 
                more detailed description retrieved from the API or database.
                It would explain the project's features, benefits, and integration with Solana.
              </p>
              
              <h3>Key Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Feature 1 with detailed explanation</li>
                <li>Feature 2 with benefits</li>
                <li>Feature 3 with technical details</li>
                <li>Integration with Solana blockchain</li>
              </ul>
            </div>
          </section>

          {/* Makers Section */}
          <section id="makers" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Makers</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-6">
                Meet the team behind {project.name}. These are the builders responsible for creating and maintaining the project.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {project.makers.map(maker => (
                  <UserAvatar key={maker.name} user={maker} size="lg" />
                ))}
              </div>
            </div>
          </section>

          {/* Curators Section */}
          <section id="curators" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Curators</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-6">
                These community members have participated in curating {project.name} through submission, challenging, 
                or voting. They help ensure quality projects are highlighted in the registry.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
                {curators.map(curator => (
                  <UserAvatar key={curator.name} user={curator} />
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reviews</h2>
            <div className="bg-white rounded-xl border p-6">
              <div className="mb-8">
                <h3 className="font-medium text-lg text-gray-900 mb-2">Rate this project</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleRate(rating)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        userRating && userRating >= rating
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {userRating && (
                  <p className="mt-2 text-sm text-gray-600">Thanks for rating this project!</p>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={getRandomAvatar()}
                      alt="Reviewer"
                      width={36}
                      height={36}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <p className="font-medium text-gray-900">john.sol</p>
                      <div className="text-yellow-500 text-sm">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    This project has been a game-changer for me. The UI is intuitive, the transactions are fast, 
                    and the team is responsive to feedback. Highly recommended!
                  </p>
                </div>
                <div className="border-b pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={getRandomAvatar()}
                      alt="Reviewer"
                      width={36}
                      height={36}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <p className="font-medium text-gray-900">sarah.sol</p>
                      <div className="text-yellow-500 text-sm">★★★★☆</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great project with solid fundamentals. The only reason I'm not giving 5 stars is because 
                    I'd like to see more advanced features in future updates.
                  </p>
                </div>
              </div>
              
              <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
                View all {stats.reviews} reviews
              </button>
            </div>
          </section>

          {/* Comments Section */}
          <section id="comments" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Comments</h2>
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h3 className="font-medium text-lg text-gray-900 mb-4">Add a comment</h3>
                <textarea 
                  className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={3} 
                  placeholder="Share your thoughts about this project..."
                ></textarea>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Post Comment
                </button>
              </div>
              
              <div className="divide-y">
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <Image
                      src={getRandomAvatar()}
                      alt="Commenter"
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">alex.sol</p>
                        <span className="text-gray-500 text-sm">3 days ago</span>
                      </div>
                      <p className="text-gray-700 mt-1">
                        I've been using this project for a few months now, and it's been a fantastic experience.
                        The team is very responsive, and the product just keeps getting better.
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>24</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 text-sm">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <Image
                      src={getRandomAvatar()}
                      alt="Commenter"
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">taylor.sol</p>
                        <span className="text-gray-500 text-sm">1 week ago</span>
                      </div>
                      <p className="text-gray-700 mt-1">
                        Does anyone know if they're planning to add support for NFTs in future updates?
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>18</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 text-sm">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t">
                <button className="w-full py-3 text-blue-600 hover:text-blue-800 font-medium">
                  View all {stats.comments} comments
                </button>
              </div>
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-[140px] space-y-8">
            {/* Links Card */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-medium text-lg text-gray-900 mb-4">Links</h3>
              <div className="space-y-3">
                <ExternalLink href={project.url} className="text-gray-700">
                  Official Website
                </ExternalLink>
                <ExternalLink href="https://twitter.com/example" className="text-gray-700">
                  Twitter
                </ExternalLink>
                <ExternalLink href="https://discord.gg/example" className="text-gray-700">
                  Discord
                </ExternalLink>
                <ExternalLink href="https://github.com/example" className="text-gray-700">
                  GitHub
                </ExternalLink>
              </div>
            </div>
            
            {/* Related Projects */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-medium text-lg text-gray-900 mb-4">Related Projects</h3>
              <div className="space-y-4">
                {getRelatedProjects(project, 3).map(relatedProject => (
                  <Link 
                    key={relatedProject.id} 
                    href={`/${relatedProject.id}`}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <Image
                        src={relatedProject.logo}
                        alt={relatedProject.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{relatedProject.name}</p>
                      <p className="text-xs text-gray-500">{relatedProject.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get related projects
function getRelatedProjects(project: Listing | TCRListing, count: number): Listing[] {
  return mockListings
    .filter(listing => 
      listing.id !== project.id && 
      (listing.category === project.category || 
       listing.tags.some(tag => project.tags.includes(tag)))
    )
    .slice(0, count);
}

// Helper function to get random avatar for demo
function getRandomAvatar(): string {
  const seeds = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank', 'grace', 'heidi'];
  const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
  return `https://api.dicebear.com/7.x/personas/svg?seed=${randomSeed}`;
} 