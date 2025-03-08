import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { TaskName } from "./output/task_TaskName";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async (): Promise<void> => {
    // Parameters
    let testnet = true;
    let packageName = "task_TaskName.pkg";
    let player = Address.parse("0QCWVqwkomdw-o4wsVqdBO_HHkv584nZw0ziJUVgeUWG6MkO");
    let nonce = 0n;
    let taskNameString = "FIFTing"

    let init = await TaskName.init(player, nonce, taskNameString, false);

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
