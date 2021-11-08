class Rook extends Piece {
    constructor(){
        super();

        this._directions = [
            [0,1],
            [1,0],
            [0,-1],
            [-1,0]
        ];
    }
}
customElements.define('rook-x', Rook);