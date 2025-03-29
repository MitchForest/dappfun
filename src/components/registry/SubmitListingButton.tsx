'use client';

interface SubmitListingButtonProps {
  className?: string;
}

export default function SubmitListingButton({ className = '' }: SubmitListingButtonProps) {
  return (
    <button
      onClick={() => {/* TODO: Open submit modal */}}
      className={`bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 ${className}`}
    >
      Submit New Listing
      <span className="text-sm text-blue-200">Stake: 50 $DAPP</span>
    </button>
  );
} 