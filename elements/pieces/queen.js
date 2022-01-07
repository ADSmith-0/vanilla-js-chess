class Queen extends SlidingPiece {
    constructor() {
        super();
        this.setDirections([
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1]
        ]);
    }
}
window.customElements.define('queen-', Queen);