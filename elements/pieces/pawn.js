class Pawn extends Piece {
    constructor() {
        super();
        this._forward = null;
    }

    connectedCallback(){
        this._forward = (this.classList.contains("w")) ? 1 : -1;
        this.setDirections([
            [0, 1 * this._forward]
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
        const captureSquares = [[1, 1*this._forward], [-1, 1*this._forward]];
        for(let captureSquare of captureSquares){
            const [x, y] = captureSquare;
            const tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && this.getColour() !== tile.getPieceColour()){
                this.addValidMove(tile.getID());
            }
        }
    }
}
window.customElements.define('pawn-', Pawn);