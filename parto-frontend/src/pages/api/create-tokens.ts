import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

const jsonFile = "src/utils/abi.json";

export default async function handler(
  req: NextApiRequest,
  _res: NextApiResponse
) {
  try {
    const { sourceAddress, targetAddress } = req.body;

    const partoken = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
    const provider =
      "https://kovan.infura.io/v3/dd072c9e29824ccf93bea07c71ee2697";
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const brainContractAddress = "0x4E4C66A261ae312083A2BB56f56634bB98c83F44";
    const BrainContract = new web3.eth.Contract(partoken, brainContractAddress);
    await BrainContract.methods
      .issue(targetAddress, "100000000000000000")
      .send({ from: sourceAddress })
      .on("receipt", (err, transactionHash) => {
        if (err) {
          console.log(err);
        } else {
          console.log(transactionHash);
        }
      });
  } catch (e) {
    console.log("e", e);
  }
}
