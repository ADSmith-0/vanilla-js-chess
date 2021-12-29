class SlidingPiece extends Piece {
    constructor(){
        super();
    }

    generateValidMoves(){
        for(let direction of this._directions){
            const [x, y] = direction;
            let [file, rank] = this._location;
            file = parseInt(file);
            rank = parseInt(rank);
            for(let i = 1; i <= 8; i++){
                const tile = new Tile(file+x, rank+y);
                if(tile.withinBounds() && !tile.isOccupied()){
                    this._validMoves.push(tile.getID());
                }else{
                    break;
                }
            }
        }
    }
}