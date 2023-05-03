# Full-stack Decentralized Crowdfunding Platform

By Nian Lu, Howard Zhong, Anyong Mao

## Video Walkthrough

https://user-images.githubusercontent.com/61568048/236045303-7fb0b26b-a04c-4d7e-9aa9-c00967a69871.mp4

## Tech Stack

Vyper, Hardhat, Ethers.js, Web3

Next.js, Redux Toolkit, NextAuth, Moralis, Typescript, Express.js, Tailwind CSS

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

Now you can open http://localhost:3000 to use this platform!

## Project Description

Our goal is to create a decentralized crowdfunding platform that leverages the power of smart contracts and blockchain technology. This approach allows users to initiate fundraising campaigns, while enabling anyone to contribute with confidence. Through the use of immutable, decentralized ledgers, each contribution is securely recorded and tracked.

To enhance transparency and mitigate potential fraud, we don't charge users throughout the whole fundraising process, except for when the user withdraws from the smart contract. The only fees that users will need to pay are for the gases collected by the Ethereum network when they perform operations such as creating a campaign, making a contribution, withdrawing funds, or requesting a refund. This approach gives users complete control over their fundraising campaigns, fostering trust and accountability within the platform.

By eliminating intermediaries, our decentralized crowdfunding solution reduces costs and opens the door to a broader spectrum of individuals and projects.
