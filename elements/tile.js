class Tile {
    #file;
    #rank;

    constructor(file, rank){
        this.#file = file;
        this.#rank = rank;

        this.getID = this.getID.bind(this);
        this.isOccupied = this.isOccupied.bind(this);
    }
    isOccupied(){
        // console.log(this.getID());
        const tile = document.getElementById(this.getID());
        return tile.firstElementChild;
    }
    getID(){
        return this.#file.toString()+this.#rank.toString();
    }
    withinBounds(){
        return (this.#file >= 1 && this.#file <= 8 && this.#rank >= 1 && this.#rank <= 8);
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