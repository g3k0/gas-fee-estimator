require("dotenv").config();
const AlchemyWeb3 = require("@alch/alchemy-web3");

const { API_URL_HTTP_PROD_MAINNET } = process.env;
const web3 = AlchemyWeb3.createAlchemyWeb3(API_URL_HTTP_PROD_MAINNET);

const historicalBlocks = 20;
const blockTag = 'pending';  // Use 'latest', 'pending', or 'earliest' as needed
const percentiles = [25, 50, 75];

/**
 * It turns the hex strings into numbers and also groups the results by block
 * 
 * @param {string} result - the result of the web3 get fee history request
 * @param {boolean} includePending - if true the pending block is included
 * @returns - array of blocks containing the formatted results
 */

function formatFeeHistory(result, includePending) {
  let blockNum = parseInt(result.oldestBlock, 16);
  const blocks = [];

  for (let i=0; i < historicalBlocks; i++) {
    blocks.push({
      number: blockNum,
      baseFeePerGas: Number(result.baseFeePerGas[i]),
      gasUsedRatio: Number(result.gasUsedRatio[i]),
      priorityFeePerGas: result.reward[i].map(x => Number(x)) || null,
    });
    blockNum += 1;
  }

  if (includePending) {
    blocks.push({
      number: "pending",
      baseFeePerGas: Number(result.baseFeePerGas[historicalBlocks]),
      gasUsedRatio: NaN,
      priorityFeePerGas: [],
    });
  }
  return blocks;
}

function avg(arr) {
  const sum = arr.reduce((a, v) => a + v);
  return Math.round(sum/arr.length);
}

/**
 * We ask for the fee history information starting from the pending block 
 * and looking backward 20 blocks. 
 * For each block we also ask the 25th, 50th, and 75th percentiles of 
 * priority fees for transactions in the block
 */

web3.eth.getFeeHistory(historicalBlocks, blockTag, percentiles)
  .then(feeHistory => {
    const blocks = formatFeeHistory(feeHistory, false);
    
    const slow    = avg(blocks.map(b => b.priorityFeePerGas[0]));
    const average = avg(blocks.map(b => b.priorityFeePerGas[1]));
    const fast    = avg(blocks.map(b => b.priorityFeePerGas[2]));
  
    web3.eth.getBlock("pending").then((block) => {
      const baseFeePerGas = Number(block.baseFeePerGas);
      console.log("Manual estimate (Wei):", {
        slow: slow + baseFeePerGas,
        average: average + baseFeePerGas,
        fast: fast + baseFeePerGas,
      });
    });
  })
  .catch(error => console.error(error));