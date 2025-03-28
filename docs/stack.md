# Technology Stack Documentation
## Solana Token Curated Registry

This document outlines the technology stack and dependencies required for the MVP of the Token Curated Registry platform.

## Frontend Technologies

### Core Framework
- **Next.js**: React framework for building the web application
  - Server-side rendering for improved SEO
  - API routes for backend functionality
  - File-based routing system

### Language
- **TypeScript**: Strongly-typed language for improved development experience
  - Type definitions for all components and functions
  - Integration with React component props
  - Custom type definitions for blockchain data

### Styling
- **Tailwind CSS**: Utility-first CSS framework
  - Responsive design utilities
  - Component styling consistency
  - Dark/light mode support

### Component Library
- **Headless UI** or minimal setup of **shadcn/ui**:
  - Accessible UI components
  - Customizable styling
  - Core components: modals, dropdowns, tabs, etc.

### Data Fetching
- **React Query**: Library for fetching, caching, and updating data
  - Handles loading and error states
  - Caching and background refetching
  - Pagination support

### State Management
- **React Context API**: For global state management
  - Wallet connection state
  - User authentication state
  - Theme preferences

## Blockchain Integration

### Solana Interaction
- **@solana/web3.js**: Official JavaScript API for Solana
  - Connection to Solana clusters
  - Transaction building and sending
  - Account data deserialization

### Wallet Integration
- **@solana/wallet-adapter**: Integration with Solana wallets
  - Wallet connection dialog
  - Multi-wallet support (Phantom, Solflare, etc.)
  - Transaction signing

### Token Interaction
- **@solana/spl-token**: Library for SPL token interaction
  - Token minting and transfers
  - Token account creation
  - Associated token account handling

### Program Interface
- **@project-serum/anchor**: Framework for Solana program interaction
  - TypeScript client for Anchor programs
  - Program account deserialization
  - IDL integration

## Backend/API

### API Routes
- **Next.js API Routes**: Server-side API endpoints
  - Data aggregation and transformation
  - Caching layer for blockchain data
  - Webhook handling

### Storage Solutions
- **Arweave/IPFS**: For decentralized storage of listing metadata
  - Content addressing
  - Permanent storage
  - Integration with Solana programs

## Smart Contract Development

### Solana Program Framework
- **Anchor**: Framework for Solana program development
  - Rust-based smart contract development
  - Testing utilities
  - Account validation

### Development Tools
- **Solana CLI**: Command-line tools for Solana development
  - Program deployment
  - Account management
  - Transaction inspection

### Testing Framework
- **Anchor Test Framework**: For testing Solana programs
  - Local validator for testing
  - Program interaction testing
  - State verification

## Deployment and Infrastructure

### Frontend Hosting
- **Vercel**: Platform for Next.js deployment
  - CI/CD pipeline
  - Preview deployments
  - Edge network distribution

### RPC Provider
- **Helius** or **GenesysGo**: RPC service for Solana
  - High-performance node access
  - WebSocket connections
  - Transaction broadcasting

## Development Tools

### Code Editor
- **Visual Studio Code**: Primary development environment
  - TypeScript integration
  - Rust analyzer extension
  - Tailwind CSS intellisense

### Version Control
- **Git/GitHub**: For source code management
  - Feature branch workflow
  - Pull request reviews
  - GitHub Actions for CI

### Package Management
- **npm/yarn**: For managing JavaScript dependencies
  - Lock file for dependency versioning
  - Script management
  - Workspace support for monorepo (if needed)

## Installation Requirements

### Local Development Setup

1. **Node.js**: v16.x or higher
   ```bash
   # Check version
   node --version
   ```

2. **Rust**: Latest stable version
   ```bash
   # Install Rust
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **Solana CLI**: Latest version
   ```bash
   # Install Solana CLI
   sh -c "$(curl -sSfL https://release.solana.com/v1.14.0/install)"
   ```

4. **Anchor**: Latest version
   ```bash
   # Install Anchor
   npm install -g @project-serum/anchor-cli
   ```

5. **Next.js Project Setup**
   ```bash
   # Create Next.js project
   npx create-next-app@latest my-tcr --typescript
   cd my-tcr
   
   # Install dependencies
   npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui @project-serum/anchor tailwindcss @headlessui/react react-query
   ```

6. **Anchor Project Setup**
   ```bash
   # Initialize Anchor project
   anchor init tcr-program
   cd tcr-program
   ```

## Dependency Management

### Frontend Dependencies

```json
{
  "dependencies": {
    "next": "^13.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@solana/web3.js": "^1.73.0",
    "@solana/wallet-adapter-react": "^0.15.28",
    "@solana/wallet-adapter-wallets": "^0.19.11",
    "@solana/wallet-adapter-react-ui": "^0.9.27",
    "@solana/spl-token": "^0.3.7",
    "@project-serum/anchor": "^0.26.0",
    "tailwindcss": "^3.3.0",
    "@headlessui/react": "^1.7.13",
    "react-query": "^3.39.3"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/node": "^18.15.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "eslint": "^8.36.0",
    "eslint-config-next": "^13.4.0"
  }
}
```

### Program Dependencies (Cargo.toml)

```toml
[dependencies]
anchor-lang = "0.26.0"
anchor-spl = "0.26.0"
solana-program = "1.14.0"
```

## Configuration Files

### tailwind.config.js

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sol-purple': '#9945FF',
        'sol-green': '#14F195',
      },
    },
  },
  plugins: [],
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['arweave.net', 'ipfs.io'],
  },
  // Add any additional Next.js configuration here
}

module.exports = nextConfig
```

### Anchor.toml

```toml
[features]
seeds = false

[programs.localnet]
tcr_program = "Anchor1111111111111111111111111111111111111111"

[registry]
url = "https://anchor.projectserum.com"

[provider]
cluster = "localnet"
wallet = "~/.config/solana/id.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```

This technology stack provides all the necessary tools and dependencies to build the MVP of your Token Curated Registry on Solana, with a focus on developer productivity and platform performance.
