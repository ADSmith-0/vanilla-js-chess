class Bishop extends Piece {
    constructor(){
        super();

        this._directions = [
            [1,1],
            [-1,1],
            [1,-1],
            [-1,-1]
        ]
    }
}
customElements.define('bishop-x', Bishop);