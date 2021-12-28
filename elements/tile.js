class Tile {
    constructor(rank, file){
        this._rank = rank;
        this._file = file;

        this.getID = this.getID.bind(this);
        this.isOccupied = this.isOccupied.bind(this);
    }
    isOccupied(){
        const tile = document.getElementById(this.getID());
        return tile.firstElementChild;
    }
    getID(){
        return this._rank.toString()+this._file.toString();
    }
}