class Piece extends HTMLElement {
    constructor(){
        super();
        this._type = this.getAttribute('type') ?? "";

        this.innerHTML = (this._type) ? 
        `<img src="./img/${this._type}-s.png">` :
        "";
        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
        this.addEventListener('mousedown', this._handleDrag);
    }
    _handleDrag(e){
        e.preventDefault();
        this._grabbedPiece = e.target;
        document.addEventListener('mousemove', this._trackCoords);
        document.addEventListener('mouseup', this._stopDrag);
        this._toggleGrabbing();
    }
    _trackCoords(e){
        const { 
            offsetLeft: pieceX,
            offsetTop: pieceY,
            offsetWidth: pieceWidth,
            offsetHeight: pieceHeight
        } = this._grabbedPiece;
        const deltaX = e.clientX - (pieceX + pieceWidth/2);
        const deltaY = e.clientY - (pieceY + pieceHeight/2);
        this._grabbedPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
    _stopDrag(e){
        this._grabbedPiece.style.transform = "translate(0,0)";
        this._toggleGrabbing();
        document.removeEventListener('mousemove', this._trackCoords);
        document.removeEventListener('mouseup', this._stopDrag);
    }
    _toggleGrabbing(){
        this._grabbedPiece.classList.toggle('grabbing');
    }
}
customElements.define('chess-piece', Piece);