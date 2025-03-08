import "./messages";

trait Task {
    solved: Bool;
    FIFTing: String;

    receive("check"){
        message(MessageParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: CheckLevelResult{
                name: self.FIFTing,
                completed: self.solved
                }.toCell()
        });
    }

    get fun solved(): Bool{
        return self.solved;
    }
}

contract FIFTing(player: Address, nonce: Int, FIFTing: String, solved: Bool) with Task{
    receive("is 300 bucks") {
        self.solved = true;
    }
}