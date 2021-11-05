class Pawn extends Piece {
    constructor(){
        super();
    }
    _calculateValidSpaces(){
        const directionMoves = [[0,1]];
        const directionCaptures = [
            [-1,1],
            [1,1]
        ];
        if(this._firstMove) directionMoves.push([0,2]); 
        const moves = directionMoves.map(direction => {
            const [x, y] = direction;
            const tileId = Util.coordsToId(Util.addToLetter(this._x, x*this._forward), this._y+y*this._forward);
            return (Tile.isValid(tileId) && !Tile.isOccupied(tileId)) ? tileId : 0;
        }).filter(Boolean);
        const captures = directionCaptures.map(direction => {
            const [x, y] = direction;
            const tileId = Util.coordsToId(Util.addToLetter(this._x, x*this._forward), this._y+y*this._forward);
            return (Tile.isValid(tileId) && Tile.isOccupiedByColour(tileId, Util.getOppositeColour(this._colour))) ? tileId : 0;
        }).filter(Boolean);
        return [...moves, ...captures];
    }
}
customElements.define('pawn-x', Pawn);