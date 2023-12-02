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

## How this library works
This library interacts with an underlying blockchain network using and API layer implemented by [Alchemy](https://www.alchemy.com/).
In order to work, set a local .env file in the root foldet of this project containing the required network http url furnished by Alchemy.

You can use this library with any Ethereum network (e.g. mainnet, goerli)

## Why to use this library
If you want to mine a block in the mainnet network, you can run this library and get an idea of the costs.


## Further readings
* [Coinbase What is EIP-1559?](https://help.coinbase.com/en/coinbase/getting-started/crypto-education/eip-1559)
