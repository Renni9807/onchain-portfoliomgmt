# Wallet Connect and Send Transaction DApp

## Project Overview

This project is a decentralized application (DApp) that enables users to connect their Ethereum wallets, view balances of ETH, USDC, and USDT, and send transactions. The application is built using React, TypeScript, Wagmi, and Tailwind CSS.

## Project Structure

The project consists of several key components:

1. **App.tsx**: The main application component that renders the WalletConnect and BalanceDisplay components.

2. **WalletConnect.tsx**: Handles wallet connection functionality using Wagmi hooks.

3. **BalanceDisplay.tsx**: Displays token balances and provides transaction functionality for ETH, USDC, and USDT.

4. Hybrid approach with Wagmi and RainbowKit:
Wagmi was chosen as the primary library for wallet interactions and blockchain functionality due to its flexibility and customization options.
RainbowKit was integrated at the root level (main.tsx) to leverage its robust wallet connection handling and provider management.
Custom UI components were built instead of using RainbowKit's pre-built UI to maintain a consistent design language with the blockchain theme.

5. **Image fetching (Node.js/Express)**: Handles image retrieval from AWS S3 for token logos.

## Key Features

- Wallet connection using various providers (MetaMask, Coinbase Wallet, WalletConnect)
- RainbowKit is initialized in the main.tsx file, providing its core wallet connection and management capabilities.
- Instead of using RainbowKit's UI components, custom components were developed to handle wallet connections, balance displays, and transactions.
- This approach allows for a tailored user interface that aligns with the project's specific design requirements while still benefiting from RainbowKit's robust backend functionality.-
- Display of ETH, USDC, and USDT balances
- Transaction functionality for ETH, USDC, and USDT
- Responsive design using Tailwind CSS
- Backend integration with AWS S3 for serving token images. IAM also used to access the S3 bucket.

## Technical Decisions

1. **Wagmi over Rainbow Kit**: Wagmi was chosen for greater customization and to maintain a consistent design language with the blockchain theme, despite Rainbow Kit offering an easier setup for wallet connections.

2. **Tailwind CSS**: Implemented for rapid styling and maintaining a responsive design.

3. **TypeScript**: Employed throughout the project for type safety and improved developer experience.

4. **AWS S3 Integration**: A backend service was implemented to securely serve token images from S3.

## Development Challenges

The development process encountered version conflicts between React scripts and Wagmi/Rainbow Kit TypeScript versions. After exploring various solutions, initializing the project with Wagmi provided the most stable foundation.

Issues with handling the .env file in GitHub led to a complete repository reset, emphasizing the importance of proper Git hygiene and careful management of sensitive information.

## Future Development

Future plans for the project include exploring integrations with:

1. Moralis API
2. 1inch API

These integrations could potentially expand the functionality of the DApp, offering more comprehensive blockchain data and decentralized exchange capabilities.

## Performance Optimization

While the current implementation is functional, there are several opportunities for optimization, particularly in the BalanceDisplay.tsx component:

**Component Decomposition**: The BalanceDisplay.tsx file could be refactored into smaller, more manageable components. This would include:
   - TokenBalance: A separate component for displaying individual token balances.
   - TransactionForm: A reusable component for handling token transfers.
   - NetworkSelector: A component for network selection.
**State Management**: Considering the use of a state management library like Redux or Recoil for more efficient state updates and to avoid prop drilling.
**Conditional Rendering**: Optimizing rendering logic to only show relevant information based on the current state (e.g., connected wallet, selected network) could improve performance.

<img width="686" alt="스크린샷 2024-08-28 오전 3 32 01" src="https://github.com/user-attachments/assets/46d8d99b-fe5b-4d4a-994d-d9a27cc15d5f">

<img width="763" alt="스크린샷 2024-08-28 오전 3 21 04" src="https://github.com/user-attachments/assets/179d7470-fafb-44ca-a369-592d3ab345a6">

<img width="812" alt="스크린샷 2024-08-28 오전 3 21 24" src="https://github.com/user-attachments/assets/1a6258fd-c96a-4437-85db-8975c95efd67">

<img width="670" alt="스크린샷 2024-08-28 오전 3 24 41" src="https://github.com/user-attachments/assets/d11569ef-6a5c-4c25-970e-cdea461a845b">

<img width="787" alt="스크린샷 2024-08-28 오전 3 22 11" src="https://github.com/user-attachments/assets/1765ba4b-88b4-4891-98a3-ea685f241c1a">



