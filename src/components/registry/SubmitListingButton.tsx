'use client';

interface SubmitListingButtonProps {
  className?: string;
}

export default function SubmitListingButton({ className = '' }: SubmitListingButtonProps) {
  return (
    <button
      onClick={() => {/* TODO: Open submit modal */}}
      className={`bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors px-4 py-2 ${className}`}
    >
      Submit Now
    </button>
  );
} 