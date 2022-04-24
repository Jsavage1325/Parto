const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const MusicInvestToken = artifacts.require("MusicInvestToken");

module.exports = async function(deployer) {

    // sf = new SuperfluidSDK.Framework({
    //     web3,
    //     version: "v1",
    //     tokens: ["fDAI"]
    // });

    // await sf.initialize();

    const superSpotifyToken = "0xB806966A6078ac78c789665c177DFDacfd544E71";
    const SuperFakeDAIToken = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
    const HostAddress = "0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3";
    const IDAAddress = "0x556ba0b3296027Dd7BCEb603aE53dEc3Ac283d2b";

    await deployer.deploy(MusicInvestToken, "Partoken", "PRT", superSpotifyToken, SuperFakeDAIToken, HostAddress, IDAAddress);

};

/*
string memory name,
string memory symbol,
ISuperToken cashToken,
ISuperfluid host,
IInstantDistributionAgencodeWithSignatureeementV1 ida)
ERC20(name, symbol)
*/