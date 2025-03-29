import Link from 'next/link';
import RegistryTable from '@/components/registry/RegistryTable';
import SubmitListingButton from '@/components/registry/SubmitListingButton';
import ActivityFeed from '@/components/registry/ActivityFeed';

export default function RegistryPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header with CTA */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Solana Dapp & Token Curated Registry
            </h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                Submit new listings or propose edits to existing ones. All changes require you to stake 50 $DAPP tokens. 
                If your submission is approved, your tokens will be returned in full. If your submission is rejected, 
                some of your tokens may be slashed.{' '}
                <Link href="/docs/registry" className="text-blue-600 hover:text-blue-700">
                  Learn more here
                </Link>
                .
              </p>
              <div className="flex justify-start">
                <SubmitListingButton className="px-6 py-3 text-lg" />
              </div>
            </div>
          </div>

          {/* New Submissions Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              New Submissions
            </h2>
            <RegistryTable status="challengePeriod" />
          </section>

          {/* Contested Submissions Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400" />
              Contested Submissions
            </h2>
            <RegistryTable status="votingPeriod" />
          </section>
        </div>

        {/* Activity Feed Sidebar */}
        <div className="w-96 shrink-0">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </main>
  );
} 