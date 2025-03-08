import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { WhereIsMyMind } from "./output/task_WhereIsMyMind";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { randomInt } from "crypto";

(async (): Promise<void> => {
    // Parameters
    let testnet = true;
    let packageName = "task_WhereIsMyMind.pkg";
    let player = Address.parse("0QCWVqwkomdw-o4wsVqdBO_HHkv584nZw0ziJUVgeUWG6MkO");
    let nonce = 0n;
    let taskName = "some task"
    let curr = randomInt(0, 1e9);

    let init = await WhereIsMyMind.init(player, nonce, taskName, false, BigInt(curr));

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let code = init.code.toBoc();

    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("DATA & CODE");
    console.log("============================================================================================");
    console.log("DATA: ", data.toString("base64"));
    console.log("CODE: ", code.toString("base64"));

    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
