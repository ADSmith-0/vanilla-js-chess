class Chessboard extends HTMLElement {
    constructor(){
        super();
        this._backRow = {
            "A": "r",
            "B": "n",
            "C": "b",
            "D": "q",
            "E": "k",
            "F": "b",
            "G": "n",
            "H": "r",
        }
        this._init();
        this._handleDrag = this._handleDrag.bind(this);
        this._trackCoords = this._trackCoords.bind(this);
        this._stopDrag = this._stopDrag.bind(this);
    }
    connectedCallback(){
        Array.from(document.querySelectorAll('.tile img'))
        .map(img => img.addEventListener('mousedown', this._handleDrag));
    }
    _init(){
        for(let i = 8; i >= 1; i--){
            const style = (i%2) ?  "row" : "alt-row";
            this.appendChild(this._createRow(i, style));
        }
    }
    _createRow(yCoord, style){
        const row = document.createElement('section');
        row.setAttribute('id', yCoord);
        row.setAttribute('class', style);
        const x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        x.map(xCoord => row.appendChild(this._createTile(xCoord, yCoord)));
        return row;
    }
    _createTile(xCoord, yCoord){
        const tile = document.createElement('div');
        tile.setAttribute('id', xCoord+yCoord.toString());
        tile.setAttribute('class', 'tile');
        const piece = this._getPieceFromCoordinates(xCoord, yCoord);
        tile.appendChild(this._createPiece(piece));
        return tile;
    }
    _getPieceFromCoordinates(xCoord, yCoord){
        if(yCoord == 7){
            return "bp";
        }else if(yCoord == 2){
            return "wp";
        }else if(yCoord == 1 || yCoord == 8){
            let piece = "";
            piece += (yCoord == 1) ? "w" : "b";
            piece += this._backRow[xCoord];
            return piece;
        }
        return null;
    }
    _createPiece(pieceCode){
        const piece = document.createElement('img');
        if(pieceCode) piece.setAttribute('src', `./img/${pieceCode}-s.png`);
        return piece;
    }
    _handleDrag(e){
        e.preventDefault();
        const piece = e.target;
        document.addEventListener('mousemove', (event) => this._trackCoords(event, piece));
        document.addEventListener('mouseup', this._stopDrag);
    }
    _trackCoords(e, piece){
        console.log(e.clientX, " ", e.clientY);
        const { 
            offsetLeft: pieceX,
            offsetTop: pieceY,
            offsetWidth: pieceWidth,
            offsetHeight: pieceHeight
        } = piece;
        const deltaX = e.clientX - (pieceX + pieceWidth/2);
        const deltaY = e.clientY - (pieceY + pieceHeight/2);
        piece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
    _stopDrag(e){
        document.removeEventListener('mousemove', (event) => this._trackCoords(event, piece));
        document.removeEventListener('mouseup', this._stopDrag);
    }
}

customElements.define('custom-chessboard', Chessboard);