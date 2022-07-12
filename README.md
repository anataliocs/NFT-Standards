# NFT-Standards

ERC-721 vs ERC-721a vs ERC-1155

- Compare different NFT Implementations

## Module 1: Setup

In this section, we will walk through setting up your development environment.

### Prerequisites

You must setup:

- [NodeJS](https://nodejs.org/en/) version 16 or above
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git Bash](https://git-scm.com/downloads)
- [Bash on VS Code](https://www.shanebart.com/set-default-vscode-terminal/)

### MetaMask Setup

First, install MetaMask on your browser. If you are already a MetaMask user, it's suggested to create a new browser profile for development purposes and install a separate instance of MetaMask.

See this article to create a [new Chrome profile](https://pureinfotech.com/add-new-user-profiles-google-chrome/), [Firefox](https://www.wikihow.com/Create-a-Firefox-Profile) or [Brave Browser](https://community.brave.com/t/brave-multi-user-accounts/119425).

Go to [https://metamask.io/download/](https://metamask.io/download/)] and choose your browser.

Set up your wallet. **Remember to save your secret recovery phrase in a secure location**. Due to how blockchains are created, the secret recovery phrase CAN NOT be reset. Since MetaMask is a non-custodial wallet, they do not hold a copy for you.

### Infura Setup

Next, you will need to [set up a free account with Infura](https://infura.io/register).

![infura-signup.png](img/infura-signup.png)

Next, select a project. We will create two projects.

First, select Ethereum project.

![create-new-project.png](img/create-new-project.png)

Choose the Rinkeby Test Network. It' easier to view test net NFTs on this network via OpenSea.

![eth-creds-infura-rinkeby](img/eth-creds-infura-rinkeby.png)

Access your credentials. The project ID can be akin to your username, and the project secret a password.

![eth-creds-infura](img/eth-creds-infura.png)

Next, create a new project and choose IPFS.
You will save both these credentials into an .env file.

![ipfs-creds-infura](img/ipfs-creds-infura.png)

### Upload Art to IPFS

Find a sample image you'd like to upload to IPFS.

We will be using this one:
![meme-nft.jpeg](/img/meme-nft.jpeg)

From your project root, run the follow `curl`command to upload the image. Make sure to modify the `curl` script to add the `Project Secret`and`Project ID` from your **IPFS project**, not your Rinkeby project.

```curl
curl "https://ipfs.infura.io:5001/api/v0/add" \
-X POST \
-F file=@"/img/meme-nft.json" \
-u "<Project-ID>:<Project-Secret>"
```

You will recieve something like below. The Hash is the IPFS Cotent ID (CID) which we will use to identify our asset.

```bash
-X POST \
-F file=@"./img/meme-nft.jpeg" \
-u "<Project-ID>:<Project-Secret>"
{"Name":"meme-nft.jpeg","Hash":"QmW5sPVbZDueZwvSuibteAwDFwFXhF8gebfptGBx1DZq1j","Size":"78353"}
```

We can check the following address below for the NFT. Note that **spooderman** is the name of the dedicated subdomain. This part of the URL will reflect your subdomain's name. Also notice the prefix for `.../ipfs`, followed by the images content id (CID).

https://spooderman.infura-ipfs.io/ipfs/QmW5sPVbZDueZwvSuibteAwDFwFXhF8gebfptGBx1DZq1j

Viola! We have used decentralized storage to upload our NFT image. Now let's create our project.

### Truffle Project Setup

Now, let's set up our directory.

First, let's create the repository. After selecting your desired directory to create the project, in your terminal, run:

Create the directory folder.

```bash
mkdir NFT-Crash-Course
```

Create a .env file for your Infura credentials

```bash
touch .env
```

Within the same folder, add a node project. Step through the questions in the initial setup by pressing enter to add the defaults.

```bash
npx yarn init
```

Add dotenv to manage environment files

```bash
npx yarn add dotenv
```

Open the config file

```bash
open .env
```

Get a mnemonic by running the following code. Copy and paste this into `.env` file.

```bash
npx mnemonics
```

Add the Infura credentials

```text
# Secret recovery phrase - NEVER EVER SHARE
MNEMONIC= Add your 12 word secret phrase to access your assets on Ethereum. Never share these! Wrap in qoutations.

# Infura Project details
INFURA_PROJECT_ID= Add your secret here. (No qoutations)
INFURA_PROJECT_SECRET=Add your ID here. (No quotations)

# IPFS Project details
INFURA_IPFS_PROJECT_ID= Add IPFS project id (No qoutations)
INFURA_IPFS_SECRET= Same for IPFS secret (No qoutations)
```

If you are using git, let's add a .gitignore file to omit the inclusion of unnecessary files.

```bash
touch .gitignore
```

At the top of the `.gitignore` file, add the following.

```text
# environment files
.env

# Mac OS files system - if mac users
.DS_Store
```

Below that text, add [following code](https://github.com/github/gitignore/blob/main/Node.gitignore) to the `.gitignore` file.

### Truffle Config

#### Truffle init

Next, let's set up our Truffle. The following command will setup our the scaffold files for our smart contract development environment.

```bash
npx truffle init
```

Truffle creates the following directory structure for your project:
contracts/: directory for your [Solidity contracts](https://trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts/).
migrations/: directory for the [scriptable deployment files](https://trufflesuite.com/docs/truffle/getting-started/running-migrations/#migration-files).
test/: directory for files that [test your application and contracts](ur-contracts/).
truffle-config.js: the [Truffle configuration file](https://trufflesuite.com/docs/truffle/reference/configuration/).

#### Install hdwallet-provider

Next, let's add the hierarchical deterministic wallet (HD Wallet). `hdwallet-provider` is a separate package that holds our keys and signs transactions for addresses derived from a 12 or 24-word mnemonic.

Note: that Infura does not manage your private keys. So, it cannot sign transactions on your behalf.

```bash
yarn add @truffle/hdwallet-provider
```

#### OpenZeppelin Contracts

Next up, let's add the OpenZeppelin Contracts. OpenZeppelin is a library for secure smart contract development. It allows developers to build on a solid foundation of community-vetted code.

This is important because smart contracts can hold enormous amounts of value and are immutable.

```bash
npx yarn add @openzeppelin/contracts
```

#### Truffle config

Now, let's configure our Truffle set up. This will allow us to connect Truffle to Infura and access the Ethereum Network.

This particular network, `Rinkeby`, is test network. Test networks are used to deploy contract for testing for free. This allows developers to experiment with contracts conditions that mirror the Ethereum Mainnet where Ether is worth real money.

Open `truffle.config.js` and modify `truffle-config.js` with the following code:

```javascript
// add at the top of truffle-config.js

require("dotenv").config(); // allows usage of .env file to store secrets
const HDWalletProvider = require('@truffle/hdwallet-provider'); // holds secret mnemonic for your Ethereum address
const infuraURL = 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID; // end point to join network
const mnemonic = process.env.MNEMONIC;

//...
// inside networks value
networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraURL),
      network_id: 4, // Rinkeby's id
      gas: 5500000, // Rinkeby has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
},
//...
// inside compilers
 compilers: {
    solc: {
      version: '0.8.13'
    }
};
```

#### Fund Deployment Account

Finally, let get some free Ether to process transactions on the Rinkeby test network.

Ether is required because:

- Without it, public networks accessible by all would run into DDOS attacks.
- Being able to upload arbitraty logic opens up the network to the the halting problem.
- independent network operators require incentivization to process computation on the network and pay for their operating costs.

Luckily, for our test networks, Ether is free.

Go to [faucet.paradigm.xyz/](https://faucet.paradigm.xyz/) and add your address to claim Rinkeby Ether.

### Front End

Let's setup our client front-end within the same repository. We will call it `/client`.

```bash
npx create-react-app client
```

Navigate inside the `/client file` and initialize yarn. Additionally, add tailwind to help create a simple user interface.

```bash
npx yarn init -y && yarn add tailwind
```

## Module 3: Code Time

### Smart Contracts Walkthrough

Our focus for this tutorial will be on smart contracts and interacting with them.

#### Migration

`Migrations.sol` keeps track of our smart contract migrations to the chain. No edits are required here.

#### NFT contract

Let's create our NFT Contract!

Run the following command to create a new contract

```bash
npx truffle create contract MyNFT
```

Within `MyNFT.sol, add the following code:

```solidity
//Contract based on [https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("My meme NFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

In `mintNFT()`:

- \_tokenIds.increment(); increases a counter by 1, thus enabling the code to generate a unique Token ID.
- uint256 newItemId = \_tokenIds.current() assigns the current count number to a new instance of \_tokenIds named newItemId.
- \_safeMint(recipient, newItemId); mints newItemId and assigns it to recipient (an address).
- \_setTokenURI(newItemId, tokenURI); sets tokenURI as the URI of the NFT’s metadata file, that we created earlier.

Now that we have our contract, let's compile it into EVM Bytecode for eventual deployment.

```bash
npx truffle compile
```

Compiled files go in the `build/contracts/` directory, relative to your project root. Refer to the [Truffle documentation](https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts/#compiling-contracts) for more information about the compilation process.

## Module 3: Deployment

Let's now write the script for deployment to the Rinkeby test network.

Navigate to the root of your project directory and create the `2_deployNFT.js` file.

```bash
touch ./migrations/2_deployNFT.js
```

The deployment scripts are numbered in the order we wish to deploy them.

Inside `2_deployNFT.js` add:

```javascript
var InfuraNFT = artifacts.require("InfuraNFT");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(InfuraNFT);
};
```

Now we can deploy our contract to Rinkeby test network!

```bash
truffle migrate --network rinkeby
```

![send-tx.gif](/img/send-rinkeby.gif)

You have just completed your first transaction!

Wait until the transactions is finished in about 15 seconds. Then, run the above command again.

```bash
truffle migrate --network rinkeby
```

Note: Save the contract address of InfuraNFT(0x65a156B90bc5E3e858C3e77d7Fd524A0F80c64e1, in this example) because you'll need it when minting the InfuraNFT.

### Update .env file

Let's update our `.env` file to account for our NFT metadata:

```text
# Secret recovery phrase - NEVER EVER SHARE
MNEMONIC= Add your 12 word secret phrase to access your assets on Ethereum. Never share these! Wrap in qoutations.

# Infura Project details
INFURA_PROJECT_ID= Add your secret here. (No qoutations)
INFURA_PROJECT_SECRET=Add your ID here. (No quotations)

# IPFS Project details
INFURA_IPFS_PROJECT_ID= Add IPFS project id (No qoutations)
INFURA_IPFS_SECRET= Same for IPFS secret (No qoutations)

# IPFS address of the NFT JSON metadata
TOKEN_URI="https://spooderman.infura-ipfs.io/ipfs/QmW5sPVbZDueZwvSuibteAwDFwFXhF8gebfptGBx1DZq1j"

# Address of the deployed smart contract
CONTRACT_ADDRESS="0x47DC746F41c5dB584e5A6ccf15c2c161560cD0F7"

# Public address to assign NFT mint to
# Use address 1 in your MetaMask account
PUBLIC_ADDRESS="<Public-Address-Of-The-Account-To-Send-NFT-To>"
```

### Module 4: Minting the NFT

#### Creating the Minting script

Let's mint our cool NFT! We will do so in a programmatic way using a minting script.

Create a `/scripts` directory in the project's root directory and enter the said directory.

```bash
mkdir scripts && cd ./scripts
```

Next lets create the `mintNFT.js` script

```bash
touch mintNFT.js
```

Within `mintNFT.js` add the following code:

```javascript
require("dotenv").config();

const { TOKEN_URI, CONTRACT_ADDRESS, PUBLIC_ADDRESS } = process.env;

// Loading the compiled contract Json
const contractJson = require("../build/contracts/InfuraNFT.json");

module.exports = async function (callback) {
  // web3 is injected by Truffle
  const contract = new web3.eth.Contract(
    contractJson.abi,
    CONTRACT_ADDRESS // this is the address generated when running migrate
  );

  // get the current network name to display in the log
  const network = await web3.eth.net.getNetworkType();

  // Generate a transaction to calls the `mintNFT` method
  const tx = contract.methods.mintNFT(PUBLIC_ADDRESS, TOKEN_URI);
  // Send the transaction to the network
  const receipt = await tx
    .send({
      from: (await web3.eth.getAccounts())[0], // uses the first account in the HD wallet
      gas: await tx.estimateGas(),
    })
    .on("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    })
    .on("error", function (error) {
      console.error(`An error happened: ${error}`);
      callback();
    })
    .then(function (receipt) {
      // Success, you've minted the NFT. The transaction is now on chain!
      console.log(
        `Success: The NFT has been minted and mined in block ${receipt.blockNumber}`
      );
      callback();
    });
};
```

##### Finally, lets mint the NFT

Run the following script

```bash
npx truffle exec scripts/mintNFT.js --network rinkeby
```

Once you run the script, wait about 15 to 30 seconds. You should see something similar to:

```bash
Using network 'rinkeby'.

Mining transaction ...
https://rinkeby.etherscan.io/tx/0x6992baf3056a6fd486be3ddbbbef2a0f856e3b8d6f7c988656acf85fe6119754
Success: The NFT has been minted and mined in block 10893060
```

Viola! You have minted a new NFT!

You can check your NFT through various ways:

### View via EtherScan

Via EtherScan: Copy and paste the outputted console message to view the transaction reciept.

#### View via OpenSea

Via OpenSea: Go to [https://testnets.opensea.io/](https://testnets.opensea.io/) and log in with your development MetaMask Account.

You will notice your MyNFT! However the metadata and picture is not populated!

Lets fix this!

#### Adjusting NFT MetaData for OpenSea

Let's adjust our file structure to allow for metadata. Metadata allows digita assets to have additional properties, like a name, description, and image. This metadata is used to display information on OpenSea's website.

##### Create folders

For the sake of organization, let's copy our `meme-nft.jpg` file into a new directory called `/images`.

```bash
mkdir images && cp img/meme-nft.jpeg images/nft-meme-nft.jpeg
```

Create an additional folder called `/metadata`. The `/metadata` directory will hold all the JSON files for the tokens in your NFT contract and we will upload all of them at once as a compiled [IPFS Car](https://ipld.io/specs/transport/car/carv1/).

```bash
mkdir metadata
```

#### Create Metadata

Let's create the metadata file

```bash
touch metadata/InfuraNFT.json
```

Now let's add the metadata:

```javascript
{
  "description": "So Hot, NFT Demo",
  "external_url": "https://spooderman.infura-ipfs.io/ipfs/QmW5sPVbZDueZwvSuibteAwDFwFXhF8gebfptGBx1DZq1j",
  "image": "https://spooderman.infura-ipfs.io/ipfs/QmW5sPVbZDueZwvSuibteAwDFwFXhF8gebfptGBx1DZq1j",
  "name": "MyNFT - So Hot!",
  "background_color": "#FFF"
}
```

##### Modify contract

OpenSea requires the `tokenURI` method in the ERC721 standard to pull off-chain metadata for an NFT. The `uri` (uniform resource identifer) should return an `https` or `ipfs` URL.

```solidity
/**
 * @dev Returns an URI for a given token ID
 */
function tokenURI(uint256 _tokenId) public view returns (string) {
  return Strings.strConcat(
      baseTokenURI(),
      Strings.uint2str(_tokenId)
  );
}
```

When queried, this URL returns JSON data representing your NFT metadata.

![opensea-metadata-overview.png](/img/opensea-metadata-overview.png)
