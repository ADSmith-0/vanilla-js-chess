class Bishop extends Piece {
    constructor(){
        super();
    }
    _calculatePossibleMoves(){
        const directions = [
            [1,1],
            [-1,1],
            [1,-1],
            [-1,-1]
        ]

        return this._allMovesFromDirections(directions);
    }
}
customElements.define('bishop-x', Bishop);