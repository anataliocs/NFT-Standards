let Infura721aNFT = artifacts.require("./Infura721aNFT.sol");
let Infura721NFT = artifacts.require("./Infura721NFT.sol");
let Infura1155NFT = artifacts.require("./Infura1155NFT.sol");

let infura721aNFTInstance;
let infura721NFTInstance;
let infura1155NFTInstance;

contract('Infura721aNFTContract', function (accounts) {

    it("Contract deployment", function () {
        //Fetching the contract instance of our smart contract
        return Infura721aNFT.deployed().then(function (instance) {
            infura721aNFTInstance = instance;
            assert(infura721aNFTInstance !== undefined, 'Infura721aNFT contract should be defined');
        });
    });

});

contract('Infura721NFTContract', function (accounts) {

    it("Contract deployment", function () {
        //Fetching the contract instance of our smart contract
        return Infura721NFT.deployed().then(function (instance) {
            infura721NFTInstance = instance;
            assert(infura721NFTInstance !== undefined, 'Infura721NFT contract should be defined');
        });
    });

});

contract('Infura1155NFTContract', function (accounts) {

    it("Contract deployment", function () {
        //Fetching the contract instance of our smart contract
        return Infura1155NFT.deployed().then(function (instance) {
            infura1155NFTInstance = instance;
            assert(infura1155NFTInstance !== undefined, 'Infura1155NFT contract should be defined');
        });
    });

});