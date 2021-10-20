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
        if(yCoord <= 2 || yCoord >= 7){
            const piece = this._getPieceFromCoordinates(xCoord, yCoord);
            tile.appendChild(this._createPiece(piece));
        }
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
        const piece = document.createElement('chess-piece');
        if(pieceCode) piece.setAttribute('type', pieceCode);
        return piece;
    }
}

customElements.define('custom-chessboard', Chessboard);