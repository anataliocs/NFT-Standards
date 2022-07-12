require("dotenv").config();

const {PUBLIC_ADDRESS, CONTRACT_ADDRESS_721A} = process.env;

// Loading the compiled contract Json
const contract721aJson = require("../build/contracts/Infura721aNFT.json");

module.exports = async function (callback) {
    // web3 is injected by Truffle
    const contract721a = new web3.eth.Contract(
        contract721aJson.abi,
        CONTRACT_ADDRESS_721A // this is the address generated when running migrate
    );

    // get the current network name to display in the log
    const network = await web3.eth.net.getNetworkType();

    // Generate a transaction to calls the `mintNFT` method
    const tx721a = contract721a.methods.mint(PUBLIC_ADDRESS, 3);
    // Send the transaction to the network
    await tx721a
        .send({
            from: (await web3.eth.getAccounts())[0], // uses the first account in the HD wallet
            gas: await tx721a.estimateGas(),
        })
        .on("transactionHash", (txhash) => {
            console.log(`Mining ERC-721a transaction for a batch of 3 NFTs ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        })
        .on("error", function (error) {
            console.error(`An error happened: ${error}`);
            callback();
        })
        .then(function (receipt) {
            // Success, you've minted the NFT. The transaction is now on chain!
            console.log(
                `\n Success: 3 ERC-721a NFTs have been minted and mined in block ${receipt.blockNumber} which cost ${receipt.gasUsed} gas \n`
            );
            callback();
        });

};
