const FilesHandler = artifacts.require("FilesHandler");

module.exports = function(deployer) {
  deployer.deploy(FilesHandler);
};
