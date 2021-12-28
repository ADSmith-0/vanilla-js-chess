class Piece extends HTMLElement {
    constructor(){
        super();
        this._directions = [];
        this._validMoves = [];

        this._location = "";

        // binding functions
        this._grabbedPiece = null;
        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
        this._toggleGrabbing = this._toggleGrabbing.bind(this);
        this._setLocation = this._setLocation.bind(this);

        this.addEventListener('mousedown', this._handleDrag);
        this._setLocation();
        console.log(this._location);
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
        if (this._moveIsValid(this._hoveringOverTileId)) {
            this._movePiece(this._hoveringOverTileId);
        }
    }
    _hoveringOverTile(e) {
        return Tile.cleanTile(document.elementFromPoint(e.clientX, e.clientY));
    }
    _toggleGrabbing() {
        this._grabbedPiece.classList.toggle('grabbing');
    }
    generateValidMoves(){

    }
    _setLocation(){
        this._location = this.parentElement.id;
    }
}