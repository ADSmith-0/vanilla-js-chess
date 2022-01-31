class Player {
    #colour = null;

    // implement in future
    #score = null;

    #capturedPieces = null;

    constructor(colour){
        this.#colour = colour;
    }

    getColour(){
        return this.#colour;
    }
}