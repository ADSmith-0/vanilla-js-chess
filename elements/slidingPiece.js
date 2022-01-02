class SlidingPiece extends Piece {
    constructor(){
        super();
    }

    generateValidMoves(){
        this._validMoves = [];
        for(let direction of this._directions){
            const [x, y] = direction;
            let [file, rank] = this._location;
            file = parseInt(file);
            rank = parseInt(rank);
            for(let i = 1; i <= 8; i++){
                const tile = new Tile(file+x*i, rank+y*i);
                if(tile.withinBounds() && !tile.isOccupied()){
                    this._validMoves.push(tile.getID());
                }else if(tile.withinBounds() && tile.getColour() !== this._colour){
                    this._validMoves.push(tile.getID());
                    break;
                }else{
                    break;
                }
            }
        }
    }
}