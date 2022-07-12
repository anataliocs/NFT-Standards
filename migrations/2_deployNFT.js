const infuraNFT = artifacts.require("InfuraNFT");

module.exports = function (deployer) {
  deployer.deploy(infuraNFT);
};
