class Pawn extends Piece {
    #forward = null;
    #colour = null;
    
    constructor() {
        super();
    }

    connectedCallback(){
        this.#forward = (this.classList.contains("w")) ? 1 : -1;
        this.setColour();
        this.setDirections([
            [0, 1 * this.#forward]
        ]);
    }

    generateValidMoves(){
        let [file, rank] = this.getLocationArray();

        this.resetValidMoves();

        for(let direction of this.getDirections()){
            const [x, y] = direction;

            let tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && !tile.isOccupied()){
                this.addValidMove(tile.getID());
    
                if(!this.hasMoved()){
                    const newTile = new Tile(file+x*2, rank+y*2);
                    if(newTile.withinBounds() && !newTile.isOccupied()){
                        this.addValidMove(newTile.getID());
                    }
                }
            }
        }
        const captureSquares = [[1, 1*this.#forward], [-1, 1*this.#forward]];
        for(let captureSquare of captureSquares){
            const [x, y] = captureSquare;
            const tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && tile.isOccupied() && tile.getPieceColour() !== this.getColour()){
                this.addValidMove(tile.getID());
            }
        }

        const enPassantMove = this.#checkForEnPassantMove();
        if(enPassantMove) this.addValidMove(enPassantMove);
    }

    #checkForEnPassantMove(){
        const board = document.querySelector('chessboard-');
        const { piece, colour, startTile, endTile } = board.getLastMove();

        if(piece == "pawn-"){
            const file = parseInt(startTile[0]);
            const startRank = parseInt(startTile[1]);
            const endRank = parseInt(endTile[1]);
            const [ thisFile, thisRank ] = this.getLocationArray();
            let move = null;

            if (Math.abs(startRank - endRank) == 2 
            && Math.abs(file - thisFile) == 1 
            && (thisRank == endRank) 
            && this.getColour() !== colour){

                const difference = startRank - endRank;
                const tile = new Tile(file, startRank - (difference/2));
                move = tile.getID();
            }

            return move;
        }
    }
}
window.customElements.define('pawn-', Pawn);