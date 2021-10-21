class Piece extends HTMLElement {
    constructor(){
        super();
        this._type = this.getAttribute('type') ?? "";

        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
        this.addEventListener('mousedown', this._handleDrag);
    }
    connectedCallback(){
        this.style.backgroundImage = `url('./img/${this._type}-s.png')`;
    }
    _handleDrag(e){
        e.preventDefault();
        document.addEventListener('mousemove', this._trackCoords);
        document.addEventListener('mouseup', this._stopDrag);
        this._currentTile = e.target.parentElement;
        this._grabbedPiece = e.target;
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
        document.removeEventListener('mousemove', this._trackCoords);
        document.removeEventListener('mouseup', this._stopDrag);
        this._grabbedPiece.style.transform = "translate(0,0)";
        this._toggleGrabbing();
        const hoveringOverTile = this._cleanTile(document.elementFromPoint(e.clientX, e.clientY));
        this._movePiece(hoveringOverTile);
    }
    _toggleGrabbing(){
        this._grabbedPiece.classList.toggle('grabbing');
    }
    _movePiece(tile){
        if(tile.id != this._currentTile){
            if(tile.firstElementChild) tile.firstElementChild.remove();
            tile.appendChild(this._grabbedPiece);
        }
    }
    _cleanTile(tile){
        return (tile.localName == "chess-piece") ? tile.parentElement : tile;
    }
}
customElements.define('chess-piece', Piece);