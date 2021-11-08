class Bishop extends Piece {
    constructor(){
        super();

        this._directions = [
            [1,1],
            [-1,1],
            [1,-1],
            [-1,-1]
        ]
    }
    _calculatePossibleMoves(){
        

        return this._allMovesFromDirections(directions);
    }
}
customElements.define('bishop-x', Bishop);