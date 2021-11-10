class Pawn extends Piece {
    constructor(){
        super();
        this._directions = [
            [0,1]
        ];
    }
    _moveIsValid(tileId){
        const [x, y] = [...tileId];
        const diffX = Util.getXDifference(this._x, x);
        const diffY = y - this._y;
        const direction = [
            (diffX/Math.abs(diffX) || 0),
            (diffY/Math.abs(diffY) || 0),
        ];
        return (
            (((this._firstMove && diffY == 2) || diffY == 1) 
            && !this._piecesInTheWay(diffX, diffY, direction))
            ||
            (Math.abs(diffX) == 1 && diffY == 1 
            && Tile.isOccupiedByColour(tileId, Util.getOppositeColour(this._colour)))
        );
    }
}
customElements.define('pawn-x', Pawn);