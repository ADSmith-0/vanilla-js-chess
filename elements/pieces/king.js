class King extends Piece {
    constructor(){
        super();
        this._directions = [
            [-1,1],  [0,1],  [1,1],
            [-1,0],          [1,0],
            [-1,-1], [0,-1], [1,-1]
        ];
    }
    _moveIsValid(tileId){
        const [x, y] = [...tileId];
        const diffX = Util.getXDifference(this._x, x);
        const diffY = y - this._y;
        return (
            (Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1)
            && !Tile.isOccupied(tileId)
        );
    }
}
customElements.define('king-x', King);