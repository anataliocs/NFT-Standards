require("dotenv").config();

const {PUBLIC_ADDRESS, CONTRACT_ADDRESS_1155} = process.env;

// Loading the compiled contract Json
const contract1155Json = require("../build/contracts/Infura1155NFT.json");

module.exports = async function (callback) {
    // web3 is injected by Truffle
    const contract1155 = new web3.eth.Contract(
        contract1155Json.abi,
        CONTRACT_ADDRESS_1155 // this is the address generated when running migrate
    );

    // get the current network name to display in the log
    const network = await web3.eth.net.getNetworkType();

    // Generate a transaction to calls the `mint` function
    const tx1155 = contract1155.methods.mint(PUBLIC_ADDRESS);
    // Send the transaction to the network
    await tx1155
        .send({
            from: (await web3.eth.getAccounts())[0], // uses the first account in the HD wallet
            gas: await tx1155.estimateGas(),
        })
        .on("transactionHash", (txhash) => {
            console.log(`Mining ERC-1155 transaction for 2 NFTs and fungible tokens ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        })
        .on("error", function (error) {
            console.error(`An error happened: ${error}`);
            callback();
        })
        .then(function (receipt) {
            // Success, you've minted the NFT. The transaction is now on chain!
            console.log(
                `\n Success: ERC-1155 NFTs and tokens have been minted and mined in block ${receipt.blockNumber} which cost ${receipt.gasUsed} gas \n`
            );
            callback();
        });
};
