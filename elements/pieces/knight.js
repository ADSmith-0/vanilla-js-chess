class Knight extends Piece {
    constructor() {
        super();
        this._directions = [
            [-1, 2],
            [ 1, 2],
            [ 2, 1],
            [ 2,-1],
            [ 1,-2],
            [-1,-2],
            [-2,-1],
            [-2, 1],
        ];
        this._validMoves = [];

        // bind functions
        this.getDirections = this.getDirections.bind(this);
        this.getValidMoves = this.getValidMoves.bind(this);
    }
    getValidMoves(){
        let [file, rank] = this._location;
        file = parseInt(file);
        rank = parseInt(rank);
        for(let direction of this._directions){
            const [x, y] = direction;
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
window.customElements.define('knight-', Knight);