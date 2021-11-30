class Chessboard extends HTMLElement {
    constructor(){
        super();
        this._pieceSize = "s";
        this._backRow = {
            "A": "rook",
            "B": "knight",
            "C": "bishop",
            "D": "queen",
            "E": "king",
            "F": "bishop",
            "G": "knight",
            "H": "rook",
        }
        this._pressureMap = new Map();
        this._pressureMap.set({"H": ["","b","b","b","b","b","b",""]});
        this._pressureMap.set({"G": ["b","b","b","b","b","b","b","b","b"]});
        this._pressureMap.set({"F": ["","","","","","","",""]});
        this._pressureMap.set({"E": ["","","","","","","",""]});
        this._pressureMap.set({"D": ["","","","","","","",""]});
        this._pressureMap.set({"C": ["","","","","","","",""]});
        this._pressureMap.set({"B": ["w","w","w","w","w","w","w","w","w"]});
        this._pressureMap.set({"A": ["","w","w","w","w","w","w",""]});
        this._blackChecked = false;
        this._whiteChecked = false;
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
            return ["b", "pawn"];
        }else if(yCoord == 2){
            return ["w", "pawn"];
        }else if(yCoord == 1 || yCoord == 8){
            let piece = [];
            piece.push((yCoord == 1) ? "w" : "b");
            piece.push(this._backRow[xCoord]);
            return piece;
        }
        return null;
    }
    _createPiece(pieceCode){
        let piece;
        piece = document.createElement(`${pieceCode[1]}-x`);
        piece.setAttribute('class', `chess-piece ${pieceCode[0]} ${this._pieceSize}`);
        return piece;
    }
    static checked(colour){
        if(colour === "b"){
            this._blackChecked = true;
        }else{
            this._whiteChecked = true;
        }
        console.table([["White Checked:", this._whiteChecked], ["Black Checked:", this._blackChecked]]);
    }
}

customElements.define('chessboard-x', Chessboard);