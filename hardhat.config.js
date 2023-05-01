require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-vyper");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "pRS_ZCMP9xjYC_qNr6nhK0WThqiJpsE9"; // XkLbgWXknSJnPb1NLTS_BbKAvrbNjf-P

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY =
  "f3790613f390092fa017870db688bab815ecedf101ba05164227be9947eea4ed";
// 2bc0f47d8bbae1529555575e925b939f6706ff88c53c30ee91b4d90c418a9614
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  vyper: {
    version: "0.3.0",
    settings: {
      optimizer: { enabled: true, runs: 200, details: { yul: false } },
    },
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
