class Tile {
    constructor(file, rank){
        this._file = file;
        this._rank = rank;

        this.getID = this.getID.bind(this);
        this.isOccupied = this.isOccupied.bind(this);
    }
    isOccupied(){
        // console.log(this.getID());
        const tile = document.getElementById(this.getID());
        return tile.firstElementChild;
    }
    getID(){
        return this._file.toString()+this._rank.toString();
    }
    withinBounds(){
        return (this._file >= 1 && this._file <= 8 && this._rank >= 1 && this._rank <= 8);
    }
    getPieceColour(){
        const piece = this.isOccupied();
        if(piece){
            return (piece.classList.contains("w")) ? "w" : "b";
        }else{
            return null;
        }
    }
}