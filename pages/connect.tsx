import { Layout, Text, Page, Code, Link } from "@vercel/examples-ui";
import MetaMaskSDK from "@metamask/sdk";
import { useEffect, useState } from "react";

function Connect() {
  // const connectMetamask = async () => {
  //   const MMSDK = new MetaMaskSDK();
  // const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
  // const accounts = await ethereum?.request({ method: "eth_requestAccounts", params: [] });
  // if(accounts && accounts.length > 0){
  //   const account = accounts[0];
  // }
  // }
  // Check If MetaMask is Installed
  const [haveMetamask, sethaveMetamask] = useState(true);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  // Connect to MetaMask and Retrieve Wallet Address
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });
      if (!accounts) {
        throw new Error();
      }
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };
  console.log(isConnected, accountAddress);
  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Decentralized Crowdfunding</Text>
        <Text>
          Our goal is to create a decentralized crowdfunding platform that
          leverages the power of smart contracts and blockchain technology. This
          approach allows users to initiate fundraising campaigns, while
          enabling anyone to contribute with confidence. Through the use of
          immutable, decentralized ledgers, each contribution is securely
          recorded and tracked.
        </Text>
      </section>
    </Page>
  );
}

export default Connect;
