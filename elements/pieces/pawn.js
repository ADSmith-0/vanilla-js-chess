class Pawn extends Piece {
    constructor(){
        super();
        this._directions = [
            [0,1],
            [0,2]
        ]
    }
    _calculateValidSpaces(){
        const directionMoves = [[0,1]];
        const directionCaptures = [
            [-1,1],
            [1,1]
        ];
    }
}
customElements.define('pawn-x', Pawn);