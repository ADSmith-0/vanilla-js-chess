class SlidingPiece extends Piece {
    constructor(){
        super();
    }

    generateValidMoves(){
        this.resetValidMoves();
        for(let direction of this.getDirections()){
            const [x, y] = direction;
            const [file, rank] = this.getLocationArray();
            for(let i = 1; i <= 8; i++){
                const tile = new Tile(file+x*i, rank+y*i);
                if(tile.withinBounds() && !tile.isOccupied()){
                    this.addValidMove(tile.getID());
                }else if(tile.withinBounds() && tile.getPieceColour() !== this.getColour()){
                    this.addValidMove(tile.getID());
                    break;
                }else{
                    break;
                }
            }
        }
    }
}