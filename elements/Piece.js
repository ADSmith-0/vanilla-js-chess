class Piece extends HTMLElement {
    constructor(){
        super();

        this._colour = this.classList.contains("b") ? "b" : "w";
        this._forward = (this._colour == "b") ? -1 : 1;
        this._firstMove = true;
        this._currentTile = this.parentElement.id;
        this._x = this._currentTile[0];
        this._y = parseInt(this._currentTile[1]);

        this.directions = [];
        
        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
        this._moveIsValid = this._moveIsValid.bind(this);
        this._updateLocation = this._updateLocation.bind(this);
        this._piecesInTheWay = this._piecesInTheWay.bind(this);
        this._canCapture = this._canCapture.bind(this);
        this._checkChecked = this._checkChecked.bind(this);

        this.addEventListener('mousedown', this._handleDrag);
    }
    _handleDrag(e){
        e.preventDefault();
        document.addEventListener('mousemove', this._trackCoords);
        document.addEventListener('mouseup', this._stopDrag);
        this._grabbedPiece = e.target;
        this._toggleGrabbing();
        this._trackCoords(e);
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
        this._grabbedPiece.style.transform = "none";
        this._toggleGrabbing();
        this._hoveringOverTileId = Tile.cleanTile(document.elementFromPoint(e.clientX, e.clientY)).id;
        if(this._moveIsValid(this._hoveringOverTileId)){
            this._movePiece(this._hoveringOverTileId);
        }
    }
    _toggleGrabbing(){
        this._grabbedPiece.classList.toggle('grabbing');
    }
    _movePiece(tileId){
        const tile = this._getTileFromId(tileId);
        if(this._canCapture(tileId)) Tile.removePiece(tileId);
        tile.appendChild(this._grabbedPiece);
        if(this._firstMove) this._firstMove = false;
        this._updateLocation();
    }
    _updateLocation(){
        this._currentTile = this._hoveringOverTileId;
        this._x = this._currentTile[0];
        this._y = parseInt(this._currentTile[1]);
    }
    _moveIsValid(tileId){
        const [x, y] = [...tileId];
        const diffX = Util.getXDifference(this._x, x);
        const diffY = y - this._y;
        const direction = [
            (diffX/Math.abs(diffX) || 0),
            (diffY/Math.abs(diffY) || 0),
        ];
        if(!this._directionIsValid(direction)) return false;
        return !this._piecesInTheWay(diffX, diffY, direction);
    }
    _piecesInTheWay(diffX, diffY, direction, inclusive=false){
        const [directionX, directionY] = direction;
        let limit = Math.abs((diffX === 0) ? diffY : diffX);
        if(inclusive) limit++;
        for(let i = 1; i < limit; i++){
            const tileId = Util.coordsToId(Util.addToLetter(this._x, (i*directionX)), this._y+(i*directionY));
            if(Tile.isOccupied(tileId)) return true;
        }
        return false;
    }
    _directionIsValid(normalizedMove){
        // directions are unique, therefore length is never more than 1
        const directionValid = this._directions.containsSubArr(normalizedMove);
        return directionValid;
    }
    _canCapture(id){
        const tile = document.getElementById(id);
        const colour = Util.getOppositeColour(this._colour);
        return ((tile.firstElementChild !== null) && tile.firstElementChild.classList.contains(colour));
    }
    _getTileFromId(id){
        return document.getElementById(id);
    }
    _checkChecked(){
        return false;
    }
}