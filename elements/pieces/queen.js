class Queen extends Piece {
    constructor(){
        super();
        // this._directions = [
        //     [-1,1],  [0,1],  [1,1],
        //     [-1,0],          [1,0],
        //     [-1,-1], [0,-1], [1,-1]
        // ];
    }
}
customElements.define('queen-x', Queen);