require("dotenv").config();
const AlchemyWeb3 = require("@alch/alchemy-web3");

const { API_URL_HTTP_PROD_GOERLI } = process.env;
const web3 = AlchemyWeb3.createAlchemyWeb3(API_URL_HTTP_PROD_GOERLI);

/**
 * We ask for the fee history information starting from the pending block 
 * and looking backward 4 blocks. 
 * For each block we also ask the 25th, 50th, and 75th percentiles of 
 * priority fees for transactions in the block
 */
const historicalBlocks = 4;
const blockTag = 'pending';  // Use 'latest', 'pending', or 'earliest' as needed
const percentiles = [25, 50, 75];

web3.eth.getFeeHistory(historicalBlocks, blockTag, percentiles)
  .then(console.log)
  .catch(error => console.error(error));