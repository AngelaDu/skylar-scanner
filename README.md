
![skylar1](https://github.com/AngelaDu/skylar-scanner/assets/38049339/ab40186e-5693-4968-b3a2-96365edc336b)
## Inspiration

The majority of internet users today find navigating blockchain to be highly technical and out of reach. From seed phrases to long transaction times and gas fees, it is clear why a new user would be deterred from using the space. Naturally, many have focused on improving the usability and lowering the entry level to get going. 


In regards to this idea, members of our team have been heavily focused on lowering the cost of entry to web3. One has been researching account abstraction at Coinbase, innovating ways to enable seamless onboarding. Another is at an early stage start-up focusing on on-ramps.

With Account Abstraction, users can finally interact with crypto without caring for many of its previous issues! Seed phrases, gas fees, and long transaction times (to some extent), can all be abstracted away. However, taken too far, the user can also lose their self-custody and ownership. 

In particular, many of these issues are solved by the introduction of **ERC 4337** without making changes at the protocol level. This created a lot more overhead, however, the __most popular scanners today still throw an error when attempting to view a transaction hash made with a 4337 compatible wallet__. 

Without writing code to interface and parse the data from the chain, there is no simple way to trace a transaction hash from a 4337 compatible wallet, otherwise known as a [user operation](‘https://eips.ethereum.org/EIPS/eip-4337’). In other words, a user would have had no way of knowing from other third parties whether their actions were described accurately by their wallets. This loses a core tenet of the blockchain being trustlessness which we are strong advocates from.

Hence, we set out with a goal to design a user-friendly 4337 compatible explorer that is also packed with shortcuts for the power user. This makes it suitable for both newer and veteran blockchain users to understand what’s going on in the chain.

## What it does

Skylar Scanner not only allows you to query the chain with regular transaction hashes and addresses, but also supports user operation and bundle hashes. This is done while presenting only the most relevant information, increasing efficiency in viewing information by hiding away irrelevant and unused data.
Transactions are presented in an easy to digest format. Gas fees are denoted in currencies that are tractable to users with USD as the default. Each transaction also identifies and displays NFT/ERC20 transactions which makes asset changes easy to follow.
Additionally, users can query for their NFTs in their wallet along with token balances and recent transaction information. We present this in an incredibly simple manner, as the goal is to make sure that any and all users have an additional source to verify the contents within their wallet… without being tied to their wallet.

Finally, in an effort to democratize and accelerate 4337 adoption, we also developed in a way that supports a large amount of EVM compatible chains, including but not limited to: Ethereum, Polygon, Arbitrum, Optimism, Mumbai, Sepolia, and Goerli!

## How we built it
High level:
In order to obtain these user operations, it required us to sift through the logs of the entrypoint contracts that we enabled on the respective chains. We then traced each of these points back towards the origin and fetched all the other data we needed in many different ways.

Stack: NextJS, Typescript, Viem, APIs(Infura, Alchemy)

## Challenges we ran into

Due to the nascency of the 4337 specification, there were some challenges involved in finding the varying types of transaction executable by a 4337 wallet.

Moreover, outside of the official sample wallet implementation, the other entry point contract and Account abstracted wallet contract variants were a black box. We often had to resort to reading decompiled bytecodes in an attempt to understand how to use it.

Finally, parsing and querying the chain was slow… Building a web app that feels fast, smooth and responsive is an ongoing journey. And while we implemented a start, there are still ways for us to go in this department..

## Accomplishments that we're proud of

Having a fully functioning prototype that is immediately useful. The website also feels fairly easy to navigate and power-user (read: us) friendly.

## What we learned

We hugely underestimate what goes on behind the scenes to make a blockchain accessible. Having been in the space for a while, we thought it would have been easy to find and parse the transactions.  However, there is a fundamental disconnect between how the blockchain is stored, and how people want to interact with data. Being optimised for trustless writes in a public ledger means that space and verifiability and verifiability are a huge concern. This often means that much of the data that is actually stored is hashed and encoded instead of being readable and searchable. Much effort has been put into making this compressed data easily searchable and explorable.

We also under-estimated how fast the chain would be, Typescript, with data parsing and long request times made certain parts of the app feel sluggish. We had to resort to web2 tricks like caching, distributed compute, and ux considerations (ex: loading skeletons) to keep things feeling snappy and fast.


## What's next for Skylar Scanner

- We plan to enable plenty more chains over time including many more evm chains. Eventually, we want to start exploring non-evm chains too
- We plan to support more in-depth views of transactions, letting you know what the transaction is about without having to comb through each of the internal transactions
- We plan to introduce native integration to allow users to perform web3 actions on both verified and _non-verified_ contracts
- We plan to add natural language search capabilities to further reduce the barrier for new users. We hope that this will empower them to take more ownership of their information!
