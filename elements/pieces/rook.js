class Rook extends SlidingPiece {
    constructor() {
        super();
        this.setDirections([
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ]);
    }
}
window.customElements.define('rook-', Rook);