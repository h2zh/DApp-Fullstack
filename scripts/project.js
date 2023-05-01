const hre = require("hardhat");
const { ethers } = require("ethers");
const web3 = require("web3");
// Don't use ES6 module in CommonJS project
// import web3 from "web3";
// import hre from "hardhat";
// import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();
// maintain all projects
const projArr = [];

function sampleFunc() {
  console.log("successfully call sampleFunc\n");
}
// creatorAccount is the account of
// targetAmount, minContribution in Ether
// minContribution is to restrict the number of transaction(reduce gas)
async function createProject(
  creatorAccount,
  title,
  description,
  targetAmount,
  daysLimit,
  minContribution
) {
  // Ether is represented in its smallest unit, Wei, when interacting with smart contracts
  const tagetAmountInWei = web3.utils.toWei(targetAmount.toString(), "ether");
  const minContributionInWei = web3.utils.toWei(
    minContribution.toString(),
    "ether"
  );

  // new a project contract
  const projectContract = await hre.ethers.getContractFactory(
    "crowdfundingProject"
  );
  console.log(
    creatorAccount,
    title,
    description,
    tagetAmountInWei,
    daysLimit,
    minContributionInWei
  );
  const gasLimit = 500000;
  const newProject = await projectContract.deploy(
    creatorAccount,
    title,
    description,
    tagetAmountInWei,
    daysLimit,
    minContributionInWei
    // { gasLimit }
  );
  console.log("newProject");
  await newProject.deployed();
  // projArr.push(newProject.address)
  // console.log("New project deployed at:", newProject.address);
  return newProject.address;
}

async function getAllProjects() {
  console.log(projArr.length);
  for (const projAddr of projArr) {
    const projectContract = await hre.ethers.getContractAt(
      "crowdfundingProject",
      projAddr
    );
    const details = await projectContract.getDetail();
    console.log(
      "New project registered in Projects contract and the details: ",
      details
    );
    return details;
  }
}

async function payDeposit(projectAddr, creatorPrivateKey, depositAmount) {
  const creatorWallet = new hre.ethers.Wallet(
    creatorPrivateKey,
    hre.ethers.provider
  );
  const depositAmountInWei = web3.utils.toWei(
    depositAmount.toString(),
    "ether"
  );

  const projectContract = await hre.ethers.getContractAt(
    "crowdfundingProject",
    projectAddr
  );
  const projectContractWithSigner = projectContract.connect(creatorWallet);

  try {
    gasLimit = 21000;
    // console.log("depositAmountInWei", depositAmountInWei, "gasLimit", gasLimit);
    await projectContractWithSigner.payDeposit({
      value: depositAmountInWei,
      gasLimit: gasLimit,
      maxFeePerGas: 250000000000,
      maxPriorityFeePerGas: 250000000000,
    });
    console.log("PayDeposit successful");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function contribute(projectAddr, creatorPrivateKey, donation) {
  const creatorWallet = new hre.ethers.Wallet(
    creatorPrivateKey,
    hre.ethers.provider
  );
  const donationInWei = web3.utils.toWei(donation.toString(), "ether");

  const projectContract = await hre.ethers.getContractAt(
    "crowdfundingProject",
    projectAddr
  );
  const projectContractWithSigner = projectContract.connect(creatorWallet);

  try {
    // maybe since the contributor data structure, require many gas
    gasLimit = 200000;
    const tx = await projectContractWithSigner.contribute({
      value: donationInWei,
      gasLimit: gasLimit,
    });
    const receipt = await tx.wait();
    console.log("Donation successful");
  } catch (error) {
    if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
      console.log("Error:", error.reason);
    } else {
      console.error("Error:", error);
    }
  }
}

async function getDetail(projAddr) {
  const projectContract = await hre.ethers.getContractAt(
    "crowdfundingProject",
    projAddr
  );
  const details = await projectContract.getDetail();
  return details;
}

async function withdraw(projAddr) {
  const projectContract = await hre.ethers.getContractAt(
    "crowdfundingProject",
    projAddr
  );
  //const creatorWallet = new hre.ethers.Wallet(creatorPrivateKey, hre.ethers.provider);
  //const projectContractWithSigner = projectContract.connect(creatorWallet);

  try {
    gasLimit = 100000;
    await projectContract.withdraw({ gasLimit: gasLimit });
    console.log("Withdraw successful");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function refund(projAddr) {
  const projectContract = await hre.ethers.getContractAt(
    "crowdfundingProject",
    projAddr
  );

  try {
    gasLimit = 200000;
    await projectContract.refund({ gasLimit: gasLimit });
    console.log("Refund successful");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function finalize(projAddr) {
  const projectContract = await hre.ethers.getContractAt(
    "crowdfundingProject",
    projAddr
  );

  try {
    gasLimit = 100000;
    await projectContract.finalize({ gasLimit: gasLimit });
    console.log("Finalize successful");
  } catch (error) {
    console.error("Error:", error);
  }
}

// this main function is for test
async function test() {
  // // parameter
  let projectAddr;
  let targetAmount = 0.002; // ETH
  let daysLimit = 1; // 1 day
  // default min_contribution is calculate by restricted number of donated people(200)
  let min_contribution = targetAmount * 0.005; // ETH
  let createAccount = "0xB0Bc4B6080Bd46f3225B4A684a7Bf8f300dd9ebA";
  console.log("Test func in project.js just executed");
  //////////////////create a new project
  // projectAddr = await createProject(
  //   createAccount,
  //   "Sample Project",
  //   "This is a sample project",
  //   targetAmount,
  //   daysLimit,
  //   min_contribution
  // );
  // console.log("projectAddr:", projectAddr);

  //////////////////maintain the project in the array
  // projArr.push(projectAddr)

  /////////////////pay deposit
  //depositInEther = targetAmount * 0.01
  //projectAddr = "0x93C22FB90929365d47C734883BFb8762F14ECA0E"
  // privateKey = "2bc0f47d8bbae1529555575e925b939f6706ff88c53c30ee91b4d90c418a9614"
  // creator privateKey
  //privateKey2 = "f3790613f390092fa017870db688bab815ecedf101ba05164227be9947eea4ed"
  //await payDeposit(projectAddr, privateKey2, depositInEther)

  ///////////////// donate to a project
  //donation = 0.0001
  //privateKey3 = "176448a2bdd92582a2b371dd430283e84f0e0321b664c2e7d011f520c0cb8f90"
  // await donate(projectAddr, privateKey3, donation)

  /////////////// get detail
  //details = await getDetail(projectAddr);
  //console.log("project details:", details);

  //////////////// withdraw for a project
  //await withdraw(projectAddr)

  /////////////// project refund
  //await refund(projectAddr)

  ////////////// destroy a project
  //await finalize(projectAddr)
}

test().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = {
  createProject,
  getAllProjects,
  payDeposit,
  contribute,
  getDetail,
  withdraw,
  refund,
  finalize,
};
