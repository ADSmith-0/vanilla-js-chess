class King extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        return true;
    }
}
customElements.define('king-x', King);