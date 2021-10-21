class Queen extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        return true;
    }
}
customElements.define('queen-x', Queen);