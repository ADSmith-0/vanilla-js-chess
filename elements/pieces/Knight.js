class Knight extends Piece {
    constructor(){
        super();
    }
    _calculatePossibleMoves(){
        return [
            [1, 2],
            [-1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1]
        ];
    }
}
customElements.define('knight-x', Knight);