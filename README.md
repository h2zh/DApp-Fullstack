# Full-stack Decentralized Crowdfunding Platform

By Nian Lu, Howard Zhong, Anyong Mao

## Tech Stack

Vyper, Hardhat, Ethers.js, Web3

Express.js, Next.js, Redux Toolkit, NextAuth, Moralis, Typescript, Tailwind CSS

## How to Clone and Deploy

```bash
git clone <the link of this repo>
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