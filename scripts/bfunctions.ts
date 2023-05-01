import {ethers} from "ethers";
import web3 from "web3";
import contractJSON from "./crowdfundingProject.json";
const contractABI = contractJSON.abi;
const contractBytecode = contractJSON.bytecode;
const adminProvider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/pRS_ZCMP9xjYC_qNr6nhK0WThqiJpsE9`);
const adminPrivateKey = "7740f7ae4a285d3da1a79c1512a05f3f580faf9b347b31410bce4903000626d1";
const adminSigner = new ethers.Wallet(adminPrivateKey, adminProvider);
const adminAccount = "0xB0Bc4B6080Bd46f3225B4A684a7Bf8f300dd9ebA"

 // creatorAccount is the account of
// targetAmount, minContribution in Ether
// minContribution is to restrict the number of transaction(reduce gas)
export async function createProject(
  creatorAccount: any,
  title: any,
  description: any,
  targetAmount: any,
  daysLimit: any,
  minContribution: any
) {
  // Ether is represented in its smallest unit, Wei, when interacting with smart contracts
  const tagetAmountInWei = web3.utils.toWei(targetAmount.toString(), "ether");
  const minContributionInWei = web3.utils.toWei(
    minContribution.toString(),
    "ether"
  );

  // new a project contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Prompt the user to connect their wallet to the dApp
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const projectContract = new ethers.ContractFactory(contractABI, contractBytecode, signer);
  console.log(
    creatorAccount,
    title,
    description,
    tagetAmountInWei,
    daysLimit,
    minContributionInWei
  );
  //Estimate gas required for deployment
  const deployTransaction = projectContract.getDeployTransaction(
    creatorAccount,
    title,
    description,
    tagetAmountInWei,
    daysLimit,
    minContributionInWei);
  const gasEstimate = await adminSigner.estimateGas(deployTransaction);

  // Set your custom gas limit
  const gasLimit = gasEstimate.mul(ethers.BigNumber.from(2));

  const newProject = await projectContract.deploy(
    creatorAccount,
    title,
    description,
    tagetAmountInWei,
    daysLimit,
    minContributionInWei,
    { gasLimit }
  );
  console.log("newProject");
  await newProject.deployed();
  // projArr.push(newProject.address)
  // console.log("New project deployed at:", newProject.address);
  return newProject.address;
}

export async function payDeposit(projectAddr:string, depositAmount:number) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt the user to connect their wallet to the dApp
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const depositAmountInWei = web3.utils.toWei(
      depositAmount.toString(),
      "ether"
    );
    const projectContract = new ethers.Contract(projectAddr, contractABI, provider);
  
    const connectedContract = projectContract.connect(signer);
  
    try {
      const gasLimit = 50000;
      // console.log("depositAmountInWei", depositAmountInWei, "gasLimit", gasLimit);
      await connectedContract.payDeposit({
        value: depositAmountInWei,
        gasLimit: gasLimit,
        maxFeePerGas: 250000000000,
        maxPriorityFeePerGas: 250000000000,
      });
      console.log("PayDeposit successful");
      return true
    } catch (error) {
      console.error("Error:", error);
      return false
    }
  }

  export async function contribute(projectAddr: any, donation: any) {
    const donationInWei = web3.utils.toWei(donation.toString(), "ether");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt the user to connect their wallet to the dApp
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const projectContract = new ethers.Contract(projectAddr, contractABI, provider);
    const connectedContract = projectContract.connect(signer);
  
    try {
      // maybe since the contributor data structure, require many gas
      const gasLimit = 200000;
      const tx = await connectedContract.contribute({
        value: donationInWei,
        gasLimit: gasLimit,
      });
      const receipt = await tx.wait();
      console.log("Donation successful", receipt);
      return true
    } catch (error: any) {
      if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
        console.log("Error:", error.reason);
      } else {
        console.error("Error:", error);
      }
      return false
    }
  }

  export  async function withdraw(projectAddr: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt the user to connect their wallet to the dApp
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    
    const projectContract = new ethers.Contract(projectAddr, contractABI, provider);
    const connectedContract = projectContract.connect(signer);
    //const creatorWallet = new hre.ethers.Wallet(creatorPrivateKey, hre.ethers.provider);
  
    try {
      const gasLimit = 100000;
      await connectedContract.withdraw(adminAccount, { gasLimit: gasLimit });
      console.log("Withdraw successful");
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const gasLimit = 100000;
      await connectedContract.finalize({ gasLimit: gasLimit });
      console.log("Finalize successful");
      return true
    } catch (error) {
      console.error("Error:", error);
      return false
    }
  }
  
  export  async function refund(projectAddr:any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt the user to connect their wallet to the dApp
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const projectContract = new ethers.Contract(projectAddr, contractABI, provider);
    const connectedContract = projectContract.connect(signer);

    try {
      const gasLimit = 200000;
      await connectedContract.refund({ gasLimit: gasLimit });
      console.log("Refund successful");
    } catch (error) {
      console.error("Error:", error);
    }
    
    try {
      const gasLimit = 100000;
      const tx = await connectedContract.finalize({ gasLimit: gasLimit });
      await tx.wait()
      console.log("Finalize successful");
      return true
    } catch (error) {
      console.error("Error:", error);
      return false
    }
  }

export async function getDetail(projectAddr:any) {
    const projectContract = new ethers.Contract(projectAddr, contractABI, adminProvider);
    const details = await projectContract.getDetail();
    return details;
  }