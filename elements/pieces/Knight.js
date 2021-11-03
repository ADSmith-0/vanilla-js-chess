class Knight extends Piece {
    constructor(){
        super();
    }
    _calculateValidSpaces(){
        const possibleMoves = [
            [1, 2],
            [-1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1]
        ];
        return possibleMoves.map(move => {
            const [x, y] = move;
            if(this._withinXBoundary(this._x, x) && this._withinYBoundary(this._y, y)){
                const newTileID = this._getID(this._addToLetter(this._x, x), this._y+y)
                if(!this._isOccupiedBySameColour(newTileID)) return newTileID;
            }
        }).filter(Boolean).reduce((acc, val) => [...acc, ...val], []);
    }
}
customElements.define('knight-x', Knight);