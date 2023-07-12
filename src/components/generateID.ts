export default function createId() {
    let id = 1;
    function inner() {
        return id++;
    }
    return inner;
}
