import type { AppProps } from "next/app";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { mainnet } from "wagmi/chains";
import { Provider } from "react-redux";
import reduxStore from "../redux/store";
import Layout from "../components/Layout";

import "@vercel/examples-ui/globals.css";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={reduxStore}>
      <Layout>
        <WagmiConfig client={client}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Component {...pageProps} />
          </SessionProvider>
        </WagmiConfig>
      </Layout>
    </Provider>
  );
}

export default App;
