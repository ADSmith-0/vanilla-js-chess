class Rook extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        return true;
    }
}
customElements.define('rook-x', Rook);