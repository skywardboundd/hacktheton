import "./messages";
import "./utils";

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

message CheckMind{
    guess: Int;
}

contract WhereIsMyMind(player: Address, nonce: Int, taskName: String, solved: Bool, magicNumber: Int) with Task{
    receive(msg: CheckMind) { 
        self.magicNumber = mind(self.magicNumber);
        if (msg.guess == self.magicNumber) {
            self.solved = true;
        }
    }

    get fun getMagicNumber(): Int {
        return self.magicNumber;
    }
}