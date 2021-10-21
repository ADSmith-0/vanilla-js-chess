class Pawn extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        return false;
    }
}
customElements.define('pawn-x', Pawn);