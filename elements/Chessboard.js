class Chessboard extends HTMLElement {
    constructor(){
        super();
        
        this._whiteToMove = null;
        this._initialState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

        this._init();

        this._startTile = null;

        this._storeStartTile = this._storeStartTile.bind(this);
        this._handleMovePiece = this._handleMovePiece.bind(this);

        this.addEventListener('mousedown', this._storeStartTile);
        this.addEventListener('mouseup', this._handleMovePiece);
    }
    _init(){
        for(let rank = 8; rank >= 1; rank--){
            for(let file = 1; file <= 8; file++){
                const tile = this._createTile(file, rank);
                this.appendChild(tile);
            }
        }
        this._FENStringToBoardState(this._initialState);
    }
    connectedCallback() {
        this._generateAllPsuedoLegalMoves();
    }
    _createTile(file, rank){
        const tile = document.createElement('div');
        tile.setAttribute('id', file.toString()+rank.toString());
        
        let className = "tile ";
        className += ((file+rank) % 2) ? "light-square" : "dark-square";
        tile.setAttribute('class', className);

        return tile;
    }
    _getTile(x, y){
        const { offsetLeft:left, offsetTop:top, offsetHeight:height } = document.querySelector('chessboard-');
        const { offsetWidth:tileWidth, offsetHeight:tileHeight } = document.getElementById('11');
        const file = Math.floor((x - left) / tileWidth)+1;
        const rank = Math.floor(((height+top) - y) / tileHeight)+1;
        return file.toString()+rank.toString();
    }
    _getTileMouseIsHoveringOver(e){
        const id = this._getTile(e.clientX, e.clientY);
        return id;
    }
    _storeStartTile(e){
        this._startTile = this._getTileMouseIsHoveringOver(e);
    }
    _handleMovePiece(e){
        const endTile = this._getTileMouseIsHoveringOver(e);
        this._makeMove(this._startTile, endTile);
    }
    _makeMove(startTile, endTile){
        const piece = document.getElementById(startTile).firstElementChild || null;
        if(piece && piece.moveIsLegal(endTile)){
            piece.move(endTile);
            this._generateAllPsuedoLegalMoves();
        }
    }
    _generateAllPsuedoLegalMoves(){
        const chessboard = document.querySelector('chessboard-');
        for(let tile of chessboard.children){
            const piece = tile.firstElementChild || null;
            if(piece){
                piece.setLocation();
                piece.generateValidMoves();
                // console.log(piece._validMoves);
            }
        }
    }
    _boardStateToFENString(){

    }
    _FENStringToBoardState(FENString){
        const board = FENString.split(/\s/)[0];
        let rank = 8;
        let file = 1;
        for(let row of board.split('/')){
            const squares = [...row];
            for(let square of squares){
                // if piece is not a number
                if(!parseInt(square)){
                    const pieceType = this._pieceFromLetter(square);
                    const piece = document.createElement(pieceType);
                    const colour = this._colourFromLetter(square);
                    piece.setAttribute('class', "piece "+colour);

                    const tile = new Tile(file, rank);
                    document.getElementById(tile.getID()).appendChild(piece);
                    file++;
                }else{
                    file += square;
                }
            }
            file = 1;
            rank--;
        }
    }

    _pieceFromLetter(letter){
        letter = letter.toLowerCase();
        switch(letter){
            case "p":
                return "pawn-";
            case "r":
                return "rook-";
            case "n":
                return "knight-";
            case "b":
                return "bishop-";
            case "k":
                return "king-";
            case "q":
                return "queen-";
        }
    }

    _colourFromLetter(letter){
        return (letter.charCodeAt(0) > 90) ? "b" : "w";
    }
}
window.customElements.define('chessboard-', Chessboard);