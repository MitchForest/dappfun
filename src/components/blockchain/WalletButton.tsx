'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  return (
    <WalletMultiButton 
      className="!bg-blue-600 hover:!bg-blue-700 !text-white !font-medium !text-[15px] !rounded-lg !h-9 !px-4 !py-2 !border-0 !transition-colors" 
      startIcon={<span className="text-[15px] mr-2">👤</span>}
    >
      Sign in
    </WalletMultiButton>
  );
} 