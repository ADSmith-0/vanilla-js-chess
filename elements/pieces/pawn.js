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
        let [file, rank] = this.getLocation();
        file = parseInt(file);
        rank = parseInt(rank);

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

        this.#checkForEnPassantMoves();
    }

    #checkForEnPassantMoves(){
        const board = document.querySelector('chessboard-');
        const { piece, startTile, endTile } = board.getLastMove();

        if(piece == "pawn-"){
            const file = parseInt(startTile[0]);
            const startRank = parseInt(startTile[1]);
            const endRank = parseInt(endTile[1]);
            let [ thisFile, thisRank ] = this.getLocation().map();
            thisFile = parseInt(thisFile);
            thisRank = parseInt(thisRank);
            const moves = [];

            if (Math.abs(startRank - endRank) == 2 
            && Math.abs(file - thisFile) == 1 
            && (thisRank == endRank)){

                const difference = startRank - endRank;
                const tile = new Tile(file, startTile - (difference/2));
                moves.push(tile.getID())
            }
        }
    }
}
window.customElements.define('pawn-', Pawn);