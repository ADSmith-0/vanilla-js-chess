class Pawn extends Piece {
    constructor(){
        super();

        this._getMoves = this._getMoves.bind(this);
        // this._getPotentialCaptures = this._getPotentialCaptures.bind(this);

    }
    _moveIsValid(){
        // console.log(this._validSpaces);
        const arr = this._validSpaces.filter(space => space === this._hoveringOverTile.id);
        return arr.length;
    }
    _calculateValidSpaces(){
        const moves = this._getMoves();
        // const captures = this._getPotentialCaptures();
        // return [...moves, ...captures];
        // console.log(moves);
        return moves;
    }
    _getMoves(){
        const potentialY = [1];
        const potentialX = [-1,1];
        if(this._firstMove) potentialY.push(2);
        const moves = potentialY.map(y => {
            let newID;
            if(this._withinYBoundary(this._y, this._forward*y)){
                let captures = [];
                if(y == 1){
                    captures = potentialX.map(x => {
                        if(this._withinXBoundary(this._x, this._forward*x)){
                            newID = this._addToLetter(this._x, this._forward*x)+(this._y+this._forward*y);
                            return (this._canCapture(newID) && newID);
                        }
                    }).filter(Boolean);
                }
                newID = (this._x)+(this._y+this._forward*y);
                const forward = (!this._isOccupied(newID)) ? newID : 0;
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