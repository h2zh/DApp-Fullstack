import type { AppProps } from "next/app";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { mainnet } from "wagmi/chains";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";

import "@vercel/examples-ui/globals.css";
import { MoralisProvider } from "react-moralis";

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
    <MoralisProvider initializeOnMount={false}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <WagmiConfig client={client}>
              <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
              </SessionProvider>
            </WagmiConfig>
          </Layout>
        </PersistGate>
      </Provider>
    </MoralisProvider>
  );
}

export default App;
