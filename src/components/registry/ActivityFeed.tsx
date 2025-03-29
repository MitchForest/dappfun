'use client';

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { mockTCRListings, SubmissionType } from '@/data/mock-data';
import { User } from '@/models/Listing';

interface Activity {
  id: string;
  type: 'submission' | 'challenge' | 'approved' | 'rejected';
  listingName: string;
  listingLogo: string;
  user?: User;
  timestamp: string;
  submissionType: SubmissionType;
  votes?: {
    for: number;
    against: number;
  };
}

function getVotePercentages(votes: { for: number; against: number }) {
  const total = votes.for + votes.against;
  const forPercent = Math.round((votes.for / total) * 100);
  const againstPercent = Math.round((votes.against / total) * 100);
  return { forPercent, againstPercent };
}

function getSlashingInfo(votes: { for: number; against: number }, isRejected: boolean) {
  const { forPercent, againstPercent } = getVotePercentages(votes);
  const margin = isRejected ? againstPercent : forPercent;
  const target = isRejected ? 'submitter' : 'challenger';

  if (margin > 90) return `100% of staked tokens were slashed from the ${target}`;
  if (margin > 80) return `75% of staked tokens were slashed from the ${target}`;
  if (margin > 70) return `50% of staked tokens were slashed from the ${target}`;
  if (margin > 60) return `25% of staked tokens were slashed from the ${target}`;
  return `No tokens were slashed from the ${target}`;
}

function getActivityEmoji(type: Activity['type']) {
  switch (type) {
    case 'submission':
      return '📝'; // Memo/paper emoji for submissions
    case 'challenge':
      return '⚔️'; // Crossed swords for challenges
    case 'approved':
      return '✅'; // Green checkmark for approvals
    case 'rejected':
      return '❌'; // Red X for rejections
    default:
      return '';
  }
}

// Generate 10 activities from mock data
const generateActivities = (): Activity[] => {
  const activities = mockTCRListings.flatMap(listing => {
    const baseActivity: Activity = {
      id: `${listing.id}-submit`,
      type: 'submission',
      listingName: listing.name,
      listingLogo: listing.logo || 'https://api.dicebear.com/7.x/shapes/svg?seed=fallback',
      user: listing.submitter,
      timestamp: listing.submittedAt,
      submissionType: listing.submissionType
    };

    // Generate challenge activity if the listing has a challenger
    const challengeActivity: Activity | null = listing.tcrChallenger ? {
      id: `${listing.id}-challenge`,
      type: 'challenge',
      listingName: listing.name,
      listingLogo: listing.logo || 'https://api.dicebear.com/7.x/shapes/svg?seed=fallback',
      user: listing.tcrChallenger,
      timestamp: listing.challengedAt || listing.submittedAt,
      submissionType: listing.submissionType,
      votes: listing.votes
    } : null;

    // Generate outcome activity based on tcrStatus
    const outcomeActivity: Activity | null = 
      (listing.tcrStatus === 'approved' || listing.tcrStatus === 'rejected') ? {
        id: `${listing.id}-${listing.tcrStatus}`,
        type: listing.tcrStatus,
        listingName: listing.name,
        listingLogo: listing.logo || 'https://api.dicebear.com/7.x/shapes/svg?seed=fallback',
        user: listing.submitter, // Add submitter info for outcome activities
        timestamp: listing.updatedAt || listing.submittedAt,
        submissionType: listing.submissionType,
        votes: listing.votes
      } : null;

    // For unchallenged listings that are approved
    const autoApprovalActivity: Activity | null = 
      !listing.tcrChallenger && 
      listing.tcrStatus === 'approved' ? {
        id: `${listing.id}-auto-approved`,
        type: 'approved',
        listingName: listing.name,
        listingLogo: listing.logo || 'https://api.dicebear.com/7.x/shapes/svg?seed=fallback',
        user: listing.submitter, // Add submitter info for auto-approvals
        timestamp: listing.updatedAt || listing.submittedAt,
        submissionType: listing.submissionType
      } : null;

    return [baseActivity, challengeActivity, outcomeActivity, autoApprovalActivity]
      .filter((activity): activity is Activity => activity !== null);
  });

  // Sort by timestamp and take the latest 10
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);
};

function SubmissionTypeChip({ type }: { type: SubmissionType }) {
  const colors = {
    [SubmissionType.NEW]: 'bg-green-100 text-green-800',
    [SubmissionType.EDIT]: 'bg-blue-100 text-blue-800',
    [SubmissionType.DELETE]: 'bg-red-100 text-red-800'
  };

  const labels = {
    [SubmissionType.NEW]: 'New Listing',
    [SubmissionType.EDIT]: 'Edit Listing',
    [SubmissionType.DELETE]: 'Delete Listing'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[type]}`}>
      {labels[type]}
    </span>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const getActivityText = () => {
    switch (activity.type) {
      case 'submission':
        return <>was <strong>submitted</strong> by {activity.user?.name} 📝</>;
      case 'challenge':
        return <>was <strong>challenged</strong> by {activity.user?.name} ⚔️</>;
      case 'approved':
        if (activity.votes) {
          return <>was <strong>approved</strong> by vote ✅</>;
        }
        return <>was <strong>approved</strong> without challenge ✅</>;
      case 'rejected':
        return <>was <strong>rejected</strong> by vote ❌</>;
      default:
        return '';
    }
  };

  return (
    <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Project Logo */}
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <Image
            src={activity.listingLogo}
            alt={activity.listingName}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{activity.listingName}</span>
        </div>
        <p className="text-sm text-gray-600">
          {getActivityText()}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <SubmissionTypeChip type={activity.submissionType} />
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ActivityFeed() {
  const activities = generateActivities();

  return (
    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden relative">
      <div className="relative">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
} 