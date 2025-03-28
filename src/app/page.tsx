import Link from "next/link";

export default function Home() {
  const dappCategories = [
    { href: '/dapps/defi', label: 'DeFi', description: 'Decentralized finance applications' },
    { href: '/dapps/gaming', label: 'Gaming', description: 'Games and gaming platforms' },
    { href: '/dapps/social', label: 'Social', description: 'Social networks and communication' },
    { href: '/dapps/dao', label: 'DAOs', description: 'Decentralized autonomous organizations' },
  ];

  const tokenCategories = [
    { href: '/tokens/memecoins', label: 'Memecoins', description: 'Community-driven tokens' },
    { href: '/tokens/nft', label: 'NFT Tokens', description: 'Non-fungible token projects' },
    { href: '/tokens/rwa', label: 'RWA', description: 'Real world asset tokens' },
    { href: '/tokens/ai', label: 'AI', description: 'Artificial intelligence tokens' },
    { href: '/tokens/stablecoins', label: 'Stablecoins', description: 'Price-stable cryptocurrencies' },
    { href: '/tokens/lst', label: 'LSTs', description: 'Liquid staking tokens' },
    { href: '/tokens/depin', label: 'DePIN', description: 'Decentralized physical infrastructure' },
    { href: '/tokens/infra', label: 'Infrastructure', description: 'Blockchain infrastructure tokens' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Discover the Best of Solana
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore and curate the top projects in the Solana ecosystem. Join our community-driven platform to discover, submit, and validate amazing projects.
        </p>
      </section>

      {/* Dapps Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Dapps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dappCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                {category.label}
              </h3>
              <p className="text-gray-600 mt-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tokens Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                {category.label}
              </h3>
              <p className="text-gray-600 mt-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
