import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Discover the Best of Solana
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore and curate the top projects in the Solana ecosystem. Join our community-driven platform to discover, submit, and validate amazing projects.
        </p>
      </section>

      {/* Categories Preview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['DeFi', 'Games', 'NFT', 'Wallets'].map((category) => (
          <div
            key={category}
            className="p-6 border rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
          >
            <h3 className="font-semibold text-lg">{category}</h3>
            <p className="text-gray-600 mt-2">
              Explore {category} projects
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
