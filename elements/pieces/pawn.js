class Pawn extends Piece {
    constructor(){
        super();
    }
    _calculateValidSpaces(){
        const potentialY = [1];
        const potentialX = [-1,1];
        if(this._firstMove) potentialY.push(2);
        const moves = potentialY.map(y => {
            let newID;
            if(Tile.withinYBoundary(this._y, this._forward*y)){
                let captures = [];
                if(y == 1){
                    captures = potentialX.map(x => {
                        if(Tile.withinXBoundary(this._x, this._forward*x)){
                            newID = Util.addToLetter(this._x, this._forward*x)+(this._y+this._forward*y);
                            return (this._canCapture(newID) && newID);
                        }
                    }).filter(Boolean);
                }
                newID = (this._x)+(this._y+this._forward*y);
                const forward = (Tile.isOccupied(newID)) ? newID : 0;
                captures.push(forward);
                return captures;
            }
        })
        .filter(Boolean)
        .reduce((acc, val) => [...acc, ...val], [])
        .filter(Boolean) ?? [];
        return moves;
    }
}
customElements.define('pawn-x', Pawn);