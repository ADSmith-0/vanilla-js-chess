class King extends Piece {
    #isChecked = false;


    constructor() {
        super();
        this.setDirections([
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1]
        ]);
    }
    generateValidMoves(){
        let [file, rank] = this.getLocation();
        file = parseInt(file);
        rank = parseInt(rank);
        
        this.resetValidMoves();
        for(let direction of this.getDirections()){
            const [x, y] = direction;
            const tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && tile.getPieceColour() !== this.getColour()){
                const board = document.querySelector('chessboard-');
                const opponentMoves = board.getAllOpponentMoves(this.getColour());
                if(!opponentMoves.has(tile.getID())){
                    this.addValidMove(tile.getID());
                }
            }
        }

        this.addValidMoves(this.#getCastlingMoves());
    }
    #getCastlingMoves(){
        const rookKey = (this.getColour() == "w") ? "R" : "r";
        const kingSideCanCastle = sessionStorage.getItem("k" + rookKey);
        const queenSideCanCastle = sessionStorage.getItem("q" + rookKey);

        const rank = (this.getColour() == "w") ? "1" : "8";

        const castlingMoves = [];

        if(kingSideCanCastle){
            if(this.hasMove("6"+rank)){
                castlingMoves.push("7"+rank);
            }
        }
        if(queenSideCanCastle) {
            if(this.hasMove("4"+rank)){
                castlingMoves.push("3"+rank);
            }
        }
        return castlingMoves;
    }
    getChecked(){
        return this._isChecked;
    }
    setChecked(isChecked){
        this._isChecked = isChecked;
    }
}
window.customElements.define('king-', King);