# Gas Fee Estimator
An Ethereum Gas Fee Estimator, based on the EIP-1559

## What is EIP-1559
[Ethereum Improvement Proposal (EIP) 1559](https://eips.ethereum.org/EIPS/eip-1559) is an upgrade that happened on August 5, 2021 to change how Ethereum calculates and processes network transaction fees (called "gas fees"). The upgrade made Ethereum transactions more efficient by using a system of block-based base fees, and sender-specified max fees, rather than bidding on gas prices to more evenly incentivize miners in periods of high or low network congestion. It was packaged with the London hard fork. Four other EIPs will join EIP 1559 in London.

## Context
Before the London fork, the gas price calculators only needed to look at the gas price of transactions in previous blocks to determine what the spread of bids should look like for the current block. Post London fork, the gas prices are split into base fees and priority fees. Since the base fee is a fixed rate set by the protocol, the only bid that we need to estimate is what to bid for the priority fee. Thus, the calculators need to be updated.
There are two important metrics we need to look at first:
1. How full was this block?
2. How much did transactions have to bid to be included in this block?

The answers to these questions will help us determine how much we should bid to be included in the pending block.

## Further readings
* [Coinbase What is EIP-1559?](https://help.coinbase.com/en/coinbase/getting-started/crypto-education/eip-1559)
