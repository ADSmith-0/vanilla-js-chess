class Piece extends HTMLElement {
    constructor(){
        super();
        this._directions = [];
        this._validMoves = [];

        this._location = "";

        this._hasMoved = false;
        this._forward = (this.classList.contains("w")) ? 1 : -1;
        this._colour = (this.classList.contains("w")) ? "w" : "b";

        // binding functions
        this._grabbedPiece = null;
        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
        this._toggleGrabbing = this._toggleGrabbing.bind(this);
        this._setLocation = this.setLocation.bind(this);

        // this._setLocation();
        this.addEventListener('mousedown', this._handleDrag);
    }
    _handleDrag(e) {
        e.preventDefault();
        document.addEventListener('mousemove', this._trackCoords);
        document.addEventListener('mouseup', this._stopDrag);
        this._grabbedPiece = e.target;
        this._toggleGrabbing();
        this._trackCoords(e);
    }
    _trackCoords(e) {
        const {
            offsetLeft: pieceX,
            offsetTop: pieceY,
            offsetWidth: pieceWidth,
            offsetHeight: pieceHeight
        } = this._grabbedPiece;
        const deltaX = e.clientX - (pieceX + pieceWidth / 2);
        const deltaY = e.clientY - (pieceY + pieceHeight / 2);
        this._grabbedPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
    _stopDrag(e) {
        document.removeEventListener('mousemove', this._trackCoords);
        document.removeEventListener('mouseup', this._stopDrag);
        this._grabbedPiece.style.transform = "none";
        this._toggleGrabbing();
        this._hoveringOverTileId = this._hoveringOverTile(e).id;
        // if (this._moveIsValid(this._hoveringOverTileId)) {
        //     this._movePiece(this._hoveringOverTileId);
        // }
    }
    _hoveringOverTile(e) {
        const tile = document.elementFromPoint(e.clientX, e.clientY);
        return (tile.localName != "div") ? tile.parentElement : tile;
    }
    _toggleGrabbing() {
        this._grabbedPiece.classList.toggle('grabbing');
    }
    generateValidMoves(){
    }
    setLocation(){
        this._location = this.parentElement.id;
    }
}