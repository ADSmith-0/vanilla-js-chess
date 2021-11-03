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
        this._isOccupied = this._isOccupied.bind(this);
        this._isOccupiedBySameColour = this._isOccupiedBySameColour.bind(this);
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
            if(this._canCapture(tile.id)) this._capturePiece(tile);
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
        return (tile.localName != "div") ? tile.parentElement : tile;
    }
    _moveIsValid(){
        console.log(this._validSpaces);
        const { length:moveIsValid } = this._validSpaces.filter(space => space === this._hoveringOverTile.id);
        return moveIsValid;
    }
    _calculateValidSpaces(){
        return [];
    }
    _isOccupied(id){
        return (document.getElementById(id).firstElementChild !== null);
    }
    _isOccupiedBySameColour(id){
        return ((document.getElementById(id).firstElementChild) ? document.getElementById(id).firstElementChild.classList.contains(this._colour) : false);
    }
    _canCapture(id){
        const tile = document.getElementById(id);
        const colour = this._getOppositeColour();
        return ((tile.firstElementChild !== null) && tile.firstElementChild.classList.contains(colour));
    }
    _capturePiece(tile){
        tile.firstElementChild.remove();
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
    _withinXBoundary(x, number){
        const asciiCode = this._numberFromLetter(x);
        const diffX = asciiCode+number;
        return (1 <= diffX && diffX <= 8);
    }
    _withinYBoundary(y, number){
        const diffY = y+number;
        return (1 <= diffY && diffY <= 8);
    }
}
customElements.define('chess-piece', Piece);