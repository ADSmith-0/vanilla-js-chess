class Pawn extends Piece {
    constructor(){
        super();

        this._getMoves = this._getMoves.bind(this);
        this._getPotentialCaptures = this._getPotentialCaptures.bind(this);        
    }
    _moveIsValid(){
        // console.log(this._validSpaces);
        const arr = this._validSpaces.filter(space => space === this._hoveringOverTile.id);
        return arr.length;
    }
    _calculateValidSpaces(){
        const moves = this._getMoves();
        const captures = this._getPotentialCaptures();
        return [...moves, ...captures];
    }
    _getMoves(){
        const moves = [];
        const limit = +this._firstMove+1;
        for(let i = 1; i <= limit; i++){
            const newY = (this.classList.contains('w')) ? parseInt(this._y)+i : parseInt(this._y)-i;
            const newTile = this._x+newY;
            if(!this._isOccupied(newTile)) moves.push(newTile);
        }
        return moves;
    }
    _getPotentialCaptures(){
        const captures = [-1, 1].map(x => {
            if(this._checkXBoundary(this._x, x)){
                const newID = this._addToLetter(this._x, x)+(this._y+1);
                return this._canCapture(newID);
            }
            return "";
        }) ?? [];
        return captures;
    }
}
customElements.define('pawn-x', Pawn);