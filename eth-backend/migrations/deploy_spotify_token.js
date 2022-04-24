var SpotifyToken = artifacts.require("SpotifyToken");

module.exports = function(deployer) {
    deployer.deploy(SpotifyToken);
};