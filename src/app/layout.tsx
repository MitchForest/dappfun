import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/components/blockchain/WalletProvider";
import WalletButton from '@/components/blockchain/WalletButton'
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DappFun - Solana Token Curated Registry",
  description: "A decentralized curation platform for Solana projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          <header className="border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold">
                  DappFun
                </Link>
              </div>
              <WalletButton />
            </nav>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Built on Solana
              </div>
            </div>
          </footer>
        </WalletContextProvider>
      </body>
    </html>
  );
}
