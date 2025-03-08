import { Address, contractAddress} from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { FIFTing } from "./output/task_FIFTing";


(async (): Promise<void> => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    let contract_address = Address.parse("0QCWVqwkomdw-o4wsVqdBO_HHkv584nZw0ziJUVgeUWG6MkO");

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    let contract = await FIFTing.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getSolved()));
})();
