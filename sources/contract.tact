import "./messages";

trait Task {
    solved: Bool;
    taskName: String;

    receive("check"){
        message(MessageParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: CheckLevelResult{
                name: self.taskName,
                completed: self.solved
                }.toCell()
        });
    }

    get fun solved(): Bool{
        return self.solved;
    }
}

contract TaskName(player: Address, nonce: Int, taskName: String, solved: Bool) with Task{
    
}