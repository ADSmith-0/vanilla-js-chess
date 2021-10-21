class Pawn extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        // console.log(this._validSpaces);
        const arr = this._validSpaces.filter(space => space === this._hoveringOverTile.id);
        return arr.length;
    }
    _calculateValidSpaces(){
        const moves = [];
        const limit = +this._firstMove+1;
        for(let i = 1; i <= limit; i++){
            const newY = (this.classList.contains('w')) ? parseInt(this._y)+i : parseInt(this._y)-i;
            moves.push(this._x+newY);
        }
        return moves;
    }
}
customElements.define('pawn-x', Pawn);