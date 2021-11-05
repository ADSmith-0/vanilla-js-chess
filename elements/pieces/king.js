class King extends Piece {
    constructor(){
        super();
    }
    _calculatePossibleMoves(){
        const directions = [
            [-1,1],  [0,1],  [1,1],
            [-1,0],          [1,0],
            [-1,-1], [0,-1], [1,-1]
        ];
        return directions;
    }
}
customElements.define('king-x', King);