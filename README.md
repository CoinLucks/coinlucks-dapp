# CoinLucks DApp 

Telegram mini app & Web App (responsive ux)

### CoinLucks > Web3 Fair-to-Win Platform

CoinLucks is a decentralized, fair-to-win gaming platform built on Web3 technology. It offers various instant games, staking pools, and a referral system, all powered by blockchain for transparency and trustlessness.

## Repository Structure

The repository is structured as follows:

- `src/`: Contains the main application code
  - `app/`: Next.js app router components
  - `components/`: React components for various parts of the application
  - `constants/`: Application-wide constants and configurations
  - `context/`: React context providers
  - `hooks/`: Custom React hooks
  - `libs/`: Utility libraries
  - `locales/`: Internationalization files
  - `styles/`: Global styles and CSS modules
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions

Key Files:
- `src/app/[locale]/page.tsx`: Main entry point for the application
- `src/components/Layout/SidebarLayout/index.tsx`: Main layout component
- `src/constants/contracts/address.ts`: Contract addresses for different networks
- `src/middleware.ts`: Next.js middleware for handling internationalization

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v18 or later)
- yarn

To install the project dependencies, run:

```bash
yarn install
```

### Getting Started

### 1. Run dev

To start the application in development mode:

```
yarn dev
```

The application will be available at `http://localhost:3000`.

### 2. Run dev over https


- generate locally-trusted development certificates. 

   refer > [https://nextjs.org/docs/app/api-reference/cli/next#using-https-during-development]

```
yarn dev:https
```

The application will be available at `https://localhost:3000`.


### Configuration

The main configuration file is located at `src/config/AppConfig.ts`. You can modify the following settings:

- `name`: Application name
- `host`: Host URL
- `apiHost`: API host URL
- `defaultChainId`: Default blockchain network ID
- `ipfsGateway`: IPFS gateway URL

### Integration

To integrate CoinLucks into your project:

1. Set up the required smart contracts on your chosen network(s).
2. Update the contract addresses in `src/constants/contracts/address.ts`.
3. Configure the `wagmi` client in `src/wagmi.ts` with your preferred providers.

### Testing & Quality

To run tests:

```bash
yarn test
```

### Troubleshooting

Common issues:

1. Network connectivity issues:
   - Error: "Failed to connect to the network"
   - Solution: Check your internet connection and ensure you're connected to the correct network in your wallet.

2. Smart contract interaction failures:
   - Error: "Transaction failed" or "Insufficient gas"
   - Solution: Make sure you have sufficient funds for gas fees and that you're interacting with the correct contract addresses.

To enable debug mode, set the `DEBUG` environment variable:

```bash
DEBUG=true yarn dev
```

Debug logs can be found in the browser console or server logs.

## Data Flow

1. User connects their wallet to the application.
2. Application loads game data and user information from smart contracts.
3. User interacts with games (e.g., placing bets, scratching cards).
4. Transactions are sent to the blockchain for processing.
5. Smart contracts emit events, which are captured by the application.
6. Application updates the UI based on transaction results and emitted events.

```
[User Wallet] <-> [Frontend Application] <-> [Smart Contracts]
     ^                    |                         |
     |                    v                         v
[Blockchain] <------> [Event Listeners] <---> [Contract Events]
```

## Deployment

Prerequisites:
- Vercel account (or similar hosting platform)
- Access to target blockchain networks

Deployment steps:
1. Build the application: `yarn build`
2. Deploy smart contracts to target networks
3. Update contract addresses in the configuration
4. Deploy the frontend to Vercel or your chosen hosting platform

## Infrastructure

The application relies on the following infrastructure:

- Smart Contracts:
  - RaffleContract: Manages raffle functionality
  - Referral: Handles the referral system
  - DiceShake: Implements the Dice Shake game
  - CoinFlip: Implements the Coin Flip game
  - Scratch69: Implements the Scratch69 game

- Blockchain Networks:
  - Optimistic BNB Chain (opBNB)
  - Various testnets

The `DeployAddress` object in `src/constants/contracts/address.ts` maps contract names to their addresses on different networks, allowing for easy configuration and network switching.