class Bishop extends Piece {
    constructor(){
        super();
    }
    _moveIsValid(){
        return true;
    }
}
customElements.define('bishop-x', Bishop);