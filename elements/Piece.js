class Piece extends HTMLElement {
    constructor(){
        super();

        this._colour = this.classList.contains("b") ? "b" : "w";
        this._forward = (this._colour == "b") ? -1 : 1;
        this._firstMove = true;
        this._currentTile = this.parentElement.id;
        this._x = this._currentTile[0];
        this._y = parseInt(this._currentTile[1]);
        
        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
        this._moveIsValid = this._moveIsValid.bind(this);
        this._updateLocation = this._updateLocation.bind(this);
        this._calculateValidSpaces = this._calculateValidSpaces.bind(this);
        this._canCapture = this._canCapture.bind(this);
        this._getOppositeColour = this._getOppositeColour.bind(this);
        this._addToLetter = this._addToLetter.bind(this);

        this._validSpaces = this._calculateValidSpaces();

        this.addEventListener('mousedown', this._handleDrag);
    }
    _handleDrag(e){
        e.preventDefault();
        document.addEventListener('mousemove', this._trackCoords);
        document.addEventListener('mouseup', this._stopDrag);
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
        this._hoveringOverTile = this._cleanTile(document.elementFromPoint(e.clientX, e.clientY));
        this._movePiece(this._hoveringOverTile);
    }
    _toggleGrabbing(){
        this._grabbedPiece.classList.toggle('grabbing');
    }
    _movePiece(tile){
        if(tile.id != this._currentTile && this._moveIsValid()){
            if(tile.firstElementChild) tile.firstElementChild.remove();
            tile.appendChild(this._grabbedPiece);
            if(this._firstMove) this._firstMove = false;
            this._updateLocation();
        }
    }
    _updateLocation(){
        this._currentTile = this._hoveringOverTile.id;
        this._x = this._currentTile[0];
        this._y = parseInt(this._currentTile[1]);
        this._validSpaces = this._calculateValidSpaces();
    }
    _cleanTile(tile){
        return (tile.localName == "chess-piece") ? tile.parentElement : tile;
    }
    _moveIsValid(){
        return this._calculateValidSpaces();
    }
    _calculateValidSpaces(){
        return [];
    }
    _isOccupied(id){
        return ((document.getElementById(id).firstElementChild) ? !!document.getElementById(id).firstElementChild.classList.contains(this._colour) : false);
    }
    _canCapture(id){
        const tile = document.getElementById(id);
        const colour = this._getOppositeColour();
        return ((tile.firstElementChild) && !!tile.firstElementChild.classList.contains(colour));
    }
    _getOppositeColour(){
        return ((this._colour == "w") ? "b" : "w");
    }
    _numberFromLetter(letter){
        return (letter.charCodeAt(0)-64);
    }
    _letterFromNumber(number){
        return String.fromCharCode(number+64);
    }
    _addToLetter(letter, number){
        return this._letterFromNumber(this._numberFromLetter(letter)+number);
    }
    _getID(x, y){
        return x+y.toString();
    }
    _checkXBoundary(x, number){
        return !((x == "A" && number < 0) || (x == "H" && number > 0));
    }
    _checkYBoundary(y, number){
        return !((y == 1 && number < 0) || (y == 8 && number > 0));
    }
}
customElements.define('chess-piece', Piece);