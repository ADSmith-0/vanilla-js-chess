class SlidingPiece extends Piece {
    constructor(){
        super();
    }

    generateValidMoves(){
        for(let direction of this._directions){
            const [x, y] = direction;
            const [file, rank] = this._location;
            for(let i = 1; i <= 8; i++){
                if(file+x >= 1 && file+x <= 8 && rank+y >= 1 && rank+y <= 8){
                    const tile = new Tile(file+x, rank+y);
                    if(!tile.isOccupied()){
                        this._validMoves.push(tile.getID());
                    }else{
                        break;
                    }
                }else{
                    break;
                }
            }
        }
    }
}