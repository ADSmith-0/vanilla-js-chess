class Queen extends Piece {
    constructor(){
        super();
    }
    _calculatePossibleMoves(){
        const directions = [
            [-1,1],  [0,1],  [1,1],
            [-1,0],          [1,0],
            [-1,-1], [0,-1], [1,-1]
        ];
        return this._allMovesFromDirections(directions);
    }
}
customElements.define('queen-x', Queen);