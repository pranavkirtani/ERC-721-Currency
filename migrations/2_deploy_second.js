const NFT = artifacts.require("NFTCurrency");

module.exports = function(deployer) {
  deployer.deploy(NFT);
};