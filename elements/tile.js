class Tile {
    #file;
    #rank;

    constructor(file, rank, id){

        if(!id){
            this.#file = file;
            this.#rank = rank;
        }else{
            this.#file = parseInt(id[0]);
            this.#rank = parseInt(id[1]);
        }

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
    getIDArray(){
        return [this.#file, this.#rank];
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