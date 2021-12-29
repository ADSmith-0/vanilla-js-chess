class Pawn extends Piece {
    constructor() {
        super();
        this._directions = [
            [0, 1*this._forward]
        ];
        this._validMoves = [];

        // bind functions
        this.getDirections = this.getDirections.bind(this);
        this.getValidMoves = this.getValidMoves.bind(this);
    }

    generateValidMoves(){
        let [file, rank] = this._location;
        file = parseInt(file);
        rank = parseInt(rank);

        for(let direction of this._directions){
            const [x, y] = direction;

            let tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && !tile.isOccupied()){
                this._validMoves.push(tile.getID());
    
                if(!this._hasMoved){
                    const newTile = new Tile(file+x*2, rank+y*2);
                    if(newTile.withinBounds() && !newTile.isOccupied()){
                        this._validMoves.push(newTile.getID());
                    }
                }
            }
        }
        const captureSquares = [[1, 1], [-1, 1]];
        for(let captureSquare of captureSquares){
            const [x, y] = captureSquare;
            const tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && this._colour !== tile.getColour()){
                this._validMoves.push(tile.getID());
            }
        }
    }
    getDirections() {
        return this._directions;
    }
    getValidMoves() {
        return this._validMoves;
    }
}
window.customElements.define('pawn-', Pawn);