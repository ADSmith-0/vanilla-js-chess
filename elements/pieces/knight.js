class Knight extends Piece {
    constructor() {
        super();
        this.setDirections([
            [-1, 2],
            [ 1, 2],
            [ 2, 1],
            [ 2,-1],
            [ 1,-2],
            [-1,-2],
            [-2,-1],
            [-2, 1],
        ]);
    }
    generateValidMoves(){
        const [file, rank] = this.getLocationArray();
        
        this.resetValidMoves();

        for(let direction of this.getDirections()){
            const [x, y] = direction;
            const tile = new Tile(file+x, rank+y);
            if(tile.withinBounds() && this.getColour() !== tile.getPieceColour()){
                this.addValidMove(tile.getID());
            }
        }
    }
}
window.customElements.define('knight-', Knight);