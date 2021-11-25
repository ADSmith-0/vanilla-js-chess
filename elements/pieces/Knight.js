class Knight extends Piece {
    constructor(){
        super();

        // this._directions = [
        //     [1, 2],
        //     [-1, 2],
        //     [2, 1],
        //     [2, -1],
        //     [1, -2],
        //     [-1, -2],
        //     [-2, -1],
        //     [-2, 1]
        // ];
    }
    _piecesInTheWay(){
        return false;
    }
    _moveIsValid(tile){
        const [x, y] = [...tile];
        const diffX = Util.getXDifference(this._x, x);
        const diffY = y - this._y;
        return (Math.abs(diffX * diffY) === 2);
    }
}
customElements.define('knight-x', Knight);