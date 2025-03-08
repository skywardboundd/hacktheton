import { Address, contractAddress} from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { WhereIsMyMind } from "./output/task_WhereIsMyMind";

(async (): Promise<void> => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    let contract_address = Address.parse("0QCWVqwkomdw-o4wsVqdBO_HHkv584nZw0ziJUVgeUWG6MkO");

    // Input the contract address
    let contract = await WhereIsMyMind.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getSolved()));
})();
