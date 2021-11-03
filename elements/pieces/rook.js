class Rook extends Piece {
    constructor(){
        super();
    }
    _calculatePossibleMoves(){
        const directions = [
            [0,1],
            [1,0],
            [0,-1],
            [-1,0]
        ];

        return this._allMovesFromDirections(directions);
    }
}
customElements.define('rook-x', Rook);