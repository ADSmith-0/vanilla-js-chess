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
        this._updateValidSpaces = this._updateValidSpaces.bind(this);
        this._updateLocation = this._updateLocation.bind(this);
        this._calculateValidSpaces = this._calculateValidSpaces.bind(this);
        this._calculatePossibleMoves = this._calculatePossibleMoves.bind(this);
        this._isOccupiedBySameColour = this._isOccupiedBySameColour.bind(this);
        this._canCapture = this._canCapture.bind(this);
        this._allMovesFromDirections = this._allMovesFromDirections.bind(this);

        this._possibleMoves = [];

        this._possibleMoves = this._calculatePossibleMoves();

        this.addEventListener('mousedown', this._handleDrag);
    }
    connectedCallback(){
        this._validSpaces = this._calculateValidSpaces();
    }
    _handleDrag(e){
        e.preventDefault();
        document.addEventListener('mousemove', this._trackCoords);
        document.addEventListener('mouseup', this._stopDrag);
        this._grabbedPiece = e.target;
        this._toggleGrabbing();
        this._updateValidSpaces();
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
        this._hoveringOverTile = Tile.cleanTile(document.elementFromPoint(e.clientX, e.clientY));
        this._movePiece(this._hoveringOverTile);
    }
    _toggleGrabbing(){
        this._grabbedPiece.classList.toggle('grabbing');
    }
    _movePiece(tile){
        if(tile.id != this._currentTile && this._moveIsValid()){
            if(this._canCapture(tile.id)) Tile.removePiece(tile);
            tile.appendChild(this._grabbedPiece);
            if(this._firstMove) this._firstMove = false;
            this._updateLocation();
        }
    }
    _updateValidSpaces(){
        this._possibleMoves = this._calculatePossibleMoves();
        this._validSpaces = this._calculateValidSpaces();
    }
    _updateLocation(){
        this._currentTile = this._hoveringOverTile.id;
        this._x = this._currentTile[0];
        this._y = parseInt(this._currentTile[1]);
    }
    
    _moveIsValid(){
        console.log(this._validSpaces);
        const { length:moveIsValid } = this._validSpaces.filter(space => space === this._hoveringOverTile.id);
        return moveIsValid;
    }
    _calculateValidSpaces(){
        return this._possibleMoves.map(move => {
            const [x, y] = move;
            if(Tile.withinXBoundary(this._x, x) && Tile.withinYBoundary(this._y, y)){
                const newTileID = Util.coordsToId(Util.addToLetter(this._x, x), this._y+y)
                if(!this._isOccupiedBySameColour(newTileID)) return newTileID;
            }
        }).filter(Boolean);
    }
    _calculatePossibleMoves(){
        return [];
    }
    _isOccupiedBySameColour(id){
        return ((document.getElementById(id).firstElementChild) ? document.getElementById(id).firstElementChild.classList.contains(this._colour) : false);
    }
    _canCapture(id){
        const tile = document.getElementById(id);
        const colour = Util.getOppositeColour();
        return ((tile.firstElementChild !== null) && tile.firstElementChild.classList.contains(colour));
    }
    _getTileFromId(id){
        return document.getElementById(id);
    }
    _allMovesFromDirections(directions){
        return directions.map(direction => {
            const [x, y] = direction;
            const moves = [];
            for(let coeff = 1; coeff <= 8; coeff++){
                const tileId = Util.coordsToId(Util.addToLetter(this._x, (x*coeff)), this._y+(y*coeff));
                if(Tile.isValid(tileId)){
                    moves.push([x*coeff, y*coeff]);
                }else{
                    break;
                }
            }
            return moves;
        }).reduce((acc, val) => [...acc, ...val], []);
    }
}
customElements.define('chess-piece', Piece);