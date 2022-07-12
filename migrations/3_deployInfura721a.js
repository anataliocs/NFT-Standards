const infura721aNFT = artifacts.require("Infura721aNFT");

module.exports = function (deployer) {
  deployer.deploy(infura721aNFT);
};
