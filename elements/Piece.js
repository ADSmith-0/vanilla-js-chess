class Piece extends HTMLElement {
    #directions = [];
    #validMoves = [];
    #location = "";
    #hasMoved = false;
    #colour = null;
    #grabbedPiece = null;

    constructor(){
        super();

        this.addEventListener('mousedown', this.#handleDrag.bind(this));
    }
    connectedCallback(){
        this.setColour();
    }
    #handleDrag(e) {
        e.preventDefault();
        document.onmousemove = this.#trackCoords.bind(this);
        document.onmouseup = this.#stopDrag.bind(this);
        this.#grabbedPiece = e.target;
        this.#toggleGrabbing();
    }
    #trackCoords(e){
        const {
            offsetLeft: pieceRelativeLeft,
            offsetTop: pieceY,
            offsetWidth: pieceWidth,
            offsetHeight: pieceHeight,
            offsetParent: pieceParent
        } = this.#grabbedPiece;
        const pieceX = pieceParent.offsetLeft + pieceRelativeLeft;
        const deltaX = e.clientX - (pieceX + pieceWidth / 2);
        console.log(e.clientX, (pieceX + pieceWidth / 2));
        const deltaY = e.clientY - (pieceY + pieceHeight / 2);
        this.#grabbedPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
    #stopDrag(e) {
        this.#grabbedPiece.style.transform = "none";
        document.onmousemove = null;
        document.onmouseup = null;
        this.#toggleGrabbing();
    }
    #toggleGrabbing() {
        this.#grabbedPiece.classList.toggle('grabbing');
    }
    
    generateValidMoves(){
    }

    setLocation(){
        this.#location = this.parentElement.id;
    }

    getLocation() {
        return this.#location;
    }

    getLocationArray(){
        return [...this.#location].map(x => parseInt(x));
    }

    moveIsLegal(endTile){
        return this.#validMoves.includes(endTile);
    }

    move(endTile){
        if(this.#location !== endTile){
            const tile = document.getElementById(endTile);
            this.remove();
            if(tile.firstElementChild){
                tile.firstElementChild.remove();
            }
            tile.appendChild(this);
            if(!this.#hasMoved){
                this.#hasMoved = true;
            }
        }
    }

    hasMove(move) {
        return this.#validMoves.includes(move);
    }

    hasMoved(){
        return this.#hasMoved;
    }

    setColour(){
        this.#colour = (this.classList.contains("w")) ? "w" : "b";
    }

    getColour(){
        return this.#colour;
    }

    setDirections(directions){
        this.#directions = directions;
    }

    getDirections() {
        return this.#directions;
    }

    getValidMoves() {
        return this.#validMoves;
    }

    addValidMove(move){
        this.#validMoves.push(move);
    }

    addValidMoves(moves){
        this.#validMoves.push(...moves);
    }

    resetValidMoves(){
        this.#validMoves = [];
    }
}