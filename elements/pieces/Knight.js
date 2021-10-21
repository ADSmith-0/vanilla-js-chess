class Knight extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        return true;
    }
}
customElements.define('knight-x', Knight);