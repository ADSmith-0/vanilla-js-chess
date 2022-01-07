class Bishop extends SlidingPiece {
    constructor(){
        super();
        this.setDirections([
            [-1, 1],
            [ 1, 1],
            [ 1,-1],
            [-1,-1]
        ]);
    }
}
window.customElements.define('bishop-', Bishop);