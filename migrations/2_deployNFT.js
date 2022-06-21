const myNFT = artifacts.require("MyNFT");

module.exports = function (deployer) {
  deployer.deploy(myNFT);
};
