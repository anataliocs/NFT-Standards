const infura721NFT = artifacts.require("Infura721NFT");

module.exports = function (deployer) {
  deployer.deploy(infura721NFT);
};
