fun mind(curr: Int): Int {
    repeat(10) {
        nativeRandomize(curr);
        curr = nativeRandomInterval(curr);

        nativeRandomize(curr);
        curr = randomInt();
    }
    return curr;
} 