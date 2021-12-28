class Bishop extends SlidingPiece {
    constructor(){
        super();
        this._directions = [
            [-1, 1],
            [ 1, 1],
            [ 1,-1],
            [-1,-1]
        ];
        this._validMoves = [];

        // bind functions
        this.getDirections = this.getDirections.bind(this);
        this.getValidMoves = this.getValidMoves.bind(this);
    }
    getDirections(){
        return this._directions;
    }
    getValidMoves(){
        return this._validMoves;
    }
}
window.customElements.define('bishop-', Bishop);