class Rook extends Piece {
    constructor(){
        super();
    }
    _calculatePossibleMoves(){
        const moves = [
            [0,1],
            [1,0],
            [0,-1],
            [-1,0]
        ];

        return moves.map(move => {
            const [x, y] = move;
            return [1,2,3,4,5,6,7,8].map(coeff => [x*coeff, y*coeff])
        }).reduce((acc, val) => [...acc, ...val], []);
    }
}
customElements.define('rook-x', Rook);