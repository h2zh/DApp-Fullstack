import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { Layout, Text, Page, Code, Link, Button } from "@vercel/examples-ui";

function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message }: any = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // DEBUG
    // const userData = { address: account, chainId: chain.id };
    // console.log(userData);
    // console.log(signature);

    // redirect user after success authentication to '/user' page
    const { url, provider }: any = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/user",
    });
    console.log("provider: ", provider);
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback (callbackUrl) and push it to the router to avoid page refreshing
     */
    push(url);
  };

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Connect Wallet</Text>
        <Button onClick={handleAuth}>Authenticate via Metamask</Button>
      </section>
    </Page>
  );
}

export default SignIn;
