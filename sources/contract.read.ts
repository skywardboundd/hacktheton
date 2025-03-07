import { Address, contractAddress} from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { TaskName } from "./output/task_TaskName";


(async (): Promise<void> => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let player = Address.parse("0QCWVqwkomdw-o4wsVqdBO_HHkv584nZw0ziJUVgeUWG6MkO");
    let nonce = 0n;
    let taskName = "some task"

    let init = await TaskName.init(player, nonce, taskName, false);

    let contract_address = contractAddress(0, init);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    let contract = await TaskName.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getSolved()));
})();
