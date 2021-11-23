class Pawn extends Piece {
    constructor(){
        super();
        this._directions = [
            [0, (1*this._forward)]
        ];
    }
    _moveIsValid(tileId){
        const [x, y] = [...tileId];
        const diffX = Util.getXDifference(this._x, x);
        const diffY = y - this._y;
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);
        const direction = [
            (diffX/absDiffX || 0),
            (diffY/absDiffY || 0),
        ];
        console.log(Tile.isOccupiedByOppositeColour(tileId));
        return (
            (((this._firstMove && diffY == 2*this._forward) || diffY == this._forward) 
            && !this._piecesInTheWay(diffX, diffY, direction, true)
            && absDiffX == 0)
            ||
            (absDiffX == 1 && absDiffY == 1 
            && Tile.isOccupiedByOppositeColour(tileId))
        );
    }
}
customElements.define('pawn-x', Pawn);