let Infura721aNFT = artifacts.require("./Infura721aNFT.sol");
let Infura721NFT = artifacts.require("./Infura721NFT.sol");
let Infura1155NFT = artifacts.require("./Infura1155NFT.sol");

let infura721aNFTInstance;
let infura721NFTInstance;
let infura1155NFTInstance;

contract('Infura721aNFTContract', function (accounts) {

    it("Contract deployment", function () {
        return Infura721aNFT.deployed().then(function (instance) {
            infura721aNFTInstance = instance;
            assert(infura721aNFTInstance !== undefined, 'Infura721aNFT contract should be defined');
        });
    });

    it("Should mint Infura721aNFT token", function () {
        const toAddress = accounts[1];
        return infura721aNFTInstance.mint(toAddress, 1, {
            from: accounts[0]
        })
            .then(function (result) {

                assert(result.logs[0].event === 'Transfer', 'Transfer Event should have been emitted');
                assert(result.logs[0].args[0] === '0x0000000000000000000000000000000000000000', 'Transfer Event arg[0] should be sender');
                assert(result.logs[0].args[1] === toAddress, 'Transfer Event arg[1] should be receiver');
                assert(result.logs[0].args[2].toNumber() === 0, 'Transfer Event arg[2] should be id');
            })
    });

});

contract('Infura721NFTContract', function (accounts) {

    it("Contract deployment", function () {
        return Infura721NFT.deployed().then(function (instance) {
            infura721NFTInstance = instance;
            assert(infura721NFTInstance !== undefined, 'Infura721NFT contract should be defined');
        });
    });

    it("Should mint Infura721NFT token", function () {
        const toAddress = accounts[1];
        return infura721NFTInstance.mintNFT(toAddress, {
            from: accounts[0]
        })
            .then(function (result) {

                assert(result.logs[0].event === 'Transfer', 'Transfer Event should have been emitted');
                assert(result.logs[0].args[0] === '0x0000000000000000000000000000000000000000', 'Transfer Event arg[0] should be sender');
                assert(result.logs[0].args[1] === toAddress, 'Transfer Event arg[1] should be receiver');
                assert(result.logs[0].args[2].toNumber() === 1, 'Transfer Event arg[2] should be id');
            })
    });

});

contract('Infura1155NFTContract', function (accounts) {

    it("Contract deployment", function () {
        return Infura1155NFT.deployed().then(function (instance) {
            infura1155NFTInstance = instance;
            assert(infura1155NFTInstance !== undefined, 'Infura1155NFT contract should be defined');
        });
    });

    it("Should mint Infura1155NFT token", async function () {
        const toAddress = accounts[1];
        return infura1155NFTInstance.mint(toAddress, {
            from: accounts[0]
        })
            .then(function (result) {
                assert(result.logs.length === 3, '3 TransferSingle Events should have been emitted');
                assert(result.logs[0].event === 'TransferSingle', 'Transfer Event should have been emitted');
                assert(result.logs[0].args[1] === '0x0000000000000000000000000000000000000000', 'Transfer Event arg[1] should be sender');
                assert(result.logs[0].args[2] === toAddress, 'Transfer Event arg[1] should be receiver');
                assert(result.logs[0].args[3].toNumber() === 0, 'Transfer Event arg[3] should be id');
                assert(result.logs[0].args[4].toNumber() === 10, 'Transfer Event arg[4] should be value');
            })
    });

});
