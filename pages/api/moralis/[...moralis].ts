import { MoralisNextApi } from "@moralisweb3/next";

const STR_MORALIS_API_KEY: string = process.env.MORALIS_API_KEY!
const STR_NEXTAUTH_URL: string = process.env.NEXTAUTH_URL!
const STR_APP_DOMAIN: string = process.env.APP_DOMAIN!

export default MoralisNextApi({
  apiKey: STR_MORALIS_API_KEY,
  authentication: {
    domain: STR_APP_DOMAIN,
    uri: STR_NEXTAUTH_URL,
    timeout: 120,
  },
});