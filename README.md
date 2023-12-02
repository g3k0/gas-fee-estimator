# Gas Fee Estimator
An Ethereum Gas Fee Estimator, based on the EIP-1559

## What is EIP-1559
[Ethereum Improvement Proposal (EIP) 1559](https://eips.ethereum.org/EIPS/eip-1559) is an upgrade that happened on August 5, 2021 to change how Ethereum calculates and processes network transaction fees (called "gas fees"). The upgrade made Ethereum transactions more efficient by using a system of block-based base fees, and sender-specified max fees, rather than bidding on gas prices to more evenly incentivize miners in periods of high or low network congestion. It was packaged with the London hard fork. Four other EIPs will join EIP 1559 in London.

## Context
Before the London fork, the gas price calculators only needed to look at the gas price of transactions in previous blocks to determine what the spread of bids should look like for the current block. Post London fork, the gas prices are split into base fees and priority fees. Since the base fee is a fixed rate set by the protocol, the only bid that we need to estimate is what to bid for the priority fee. Thus, the calculators need to be updated.

## How EIP-1599 works
EIP-1599 works on the basis of three variables:
* **base fee**: It represents the reserve that must be paid for a transaction to be included in a block. It is calculated based on the previous blocks, and it is predictable for users.
* **max priority fee per gas**:  This is a variable controlled by the user, it is a part that goes to the miner and it can be thinked as a tip paid to the miner to prioritize the mining of the block.
* **max fee per gas**: it is controlled by the user, it represent the maximum amount that a user is willing to pay for their transaction. It includes the base fee + max priority fee per gas. The difference between the max fee per gas and the sum of the base fee and the max priority fee per gas is returned to the user.

## How this estimator library works
This library interacts with the blockchain network using and API layer implemented by [Alchemy](https://www.alchemy.com/).

To work, the estimator requires an http endpoint furnished by Alchemy with which the estimator interacts with the underlying blockchain network.

You can use this library with any Ethereum network (e.g. mainnet, goerli) by manually configuring the script.

This script calculates the results based on the last 20 blocks in the blockchain, and returns 3 prices, respectively for a slow, average and fast mining (it depends of the tip paid to the miner). The results are expressed in Wei:

```js
{ 
    slow: 35885684480,
    average: 36282184480,
    fast: 39053000797
}
```
The max priority fee per gas (aka tip) is calculated using the 25th, 50th, and 75th percentiles of each priority fees for the 20 transactions considered (average).

The script is configured to report the costs for a mining on the production mainnet network.


## How to run the estimator

1. Install [node.js](https://nodejs.org/en) on your machine;
2. go in the root folder of this project;
3. run ```npm i``` to install the required dependencies;
4. create an .env file and write the following env variable containing your private API key ```API_URL_HTTP_PROD_MAINNET=<your-url>```
4. run ```node .``` ro run the script;
5. have fun :)

## Why to use this estimator
If you want to know how much you will pay for your block to be mined in the mainnet network, you can run this library and get an idea of the cost (or simply surf the web for another browser extension to install).


## Further readings
* [Coinbase What is EIP-1559?](https://help.coinbase.com/en/coinbase/getting-started/crypto-education/eip-1559)
