# Full-stack Decentralized Crowdfunding Platform

By Nian Lu, Howard Zhong, Anyong Mao

## Tech Stack

Vyper, Hardhat, Ethers.js, Web3

Express.js, Next.js, Redux Toolkit, NextAuth, Moralis, Typescript, Tailwind CSS

## How to Clone and Deploy

```bash
git clone https://github.com/h2zh/DApp-Fullstack
```

Create a .env.local file in the project root directory, configure the environmental variables based on .env.example

Get pnpm, change directory to this project and install all dependencies with it

```bash
brew install pnpm
pnpm install
```

First compile the blockchain code via Hardhat

```bash
npx hardhat compile
```

Next, run Next.js in development mode:

```bash
pnpm dev
```

Open another terminal to run the Express.js backend server:

```bash
node scripts
```

Now you can open http://localhost:3000 to use this platform!

## Project Description

Our goal is to create a decentralized crowdfunding platform that leverages the power of smart contracts and blockchain technology. This approach allows users to initiate fundraising campaigns, while enabling anyone to contribute with confidence. Through the use of immutable, decentralized ledgers, each contribution is securely recorded and tracked.

To enhance transparency and mitigate potential fraud, the fundraising process requires approval from the majority of contributors before funds can be withdrawn from the smart contract. This collaborative decision-making process fosters trust and accountability within the platform.

By eliminating intermediaries, our decentralized crowdfunding solution reduces costs and opens the door to a broader spectrum of individuals and projects.
