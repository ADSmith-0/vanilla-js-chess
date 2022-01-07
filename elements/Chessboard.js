class Chessboard extends HTMLElement {
    constructor(){
        super();
        
        this._whiteToMove = null;
        // this._initialState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        this._initialState = "rnbqk1nr/pppppppp/8/8/2b5/8/PPPP1PPP/RNBQK2R w KQkq - 0 1"

        this._canCastle = { 
            "b": { "king": true, "queen": true },
            "w": { "king": true, "queen": true }
        };

        this._storeCastlingState();

        this._init();

        this._startTile = null;

        this._storeStartTile = this._storeStartTile.bind(this);
        this._handleMovePiece = this._handleMovePiece.bind(this);
        this._updateCastling = this._updateCastling.bind(this);
        this._storeCastlingState = this._storeCastlingState.bind(this);

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
            this._checkForCastleMove(piece, endTile);
            this._generateAllPsuedoLegalMoves();
            this._updateCastling();
            this._storeCastlingState();
        }
    }
    _checkForCastleMove(piece, endTile){
        const [file, rank] = endTile;
        const { king:canCastleKingside, queen:canCastleQueenside } = this._canCastle[piece.getColour()];
        if(piece.localName == "king-"){
            if(file == "7" && canCastleKingside){
                const rook = document.getElementById("8"+rank).firstElementChild;
                rook.move("6"+rank);
            }
            if(file == "3" && canCastleQueenside){
                const rook = document.getElementById("1"+rank).firstElementChild;
                rook.move("4"+rank);
            }
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
    _updateCastling(){
        const [blackKing, whiteKing] = document.querySelectorAll('king-');

        if(blackKing.hasMoved()){
            this._canCastle["b"] = { "king": false, "queen": false };
        }

        if(whiteKing.hasMoved()) {
            this._canCastle["w"] = { "king": false, "queen": false };
        }

        const whiteKingHasntMoved = Object.values(this._canCastle["w"]).filter(Boolean).length;
        const blackKingHasntMoved = Object.values(this._canCastle["b"]).filter(Boolean).length;
        
        if(!(whiteKingHasntMoved && blackKingHasntMoved)) return; 

        // qr: black queen-side rook, kr: black king-side rook
        // qR: white queen-side rook, kR: white king-side rook
        // Based off of FEN notation
        const [qr, kr, qR, kR] = document.querySelectorAll('rook-');
        
        if(blackKingHasntMoved){
            // rooks are selected in the order black a8, black h8, white a1, white h1
            this._canCastle["b"]["queen"] = !qr.hasMoved();
            this._canCastle["b"]["king"] = !kr.hasMoved();
        }
        
        if(whiteKingHasntMoved){
            // rooks are selected in the order black a8, black h8, white a1, white h1
            this._canCastle["w"]["queen"] = !qR.hasMoved();
            this._canCastle["w"]["king"] = !kR.hasMoved();
        }
    }
    _storeCastlingState(){
        sessionStorage.setItem('qr', this._canCastle["b"]["queen"]);
        sessionStorage.setItem('kr', this._canCastle["b"]["king"]);
        sessionStorage.setItem('qR', this._canCastle["w"]["queen"]);
        sessionStorage.setItem('kR', this._canCastle["w"]["king"]);
    }
    _boardStateToFENString(){

    }
    _FENStringToBoardState(FENString){
        const [board, colourToMove, canCastle, timer, noOfHalfMoves, noOfMoves] = FENString.split(/\s/);
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
                    file += parseInt(square);
                }
            }
            file = 1;
            rank--;
        }

        this._whiteToMove = (colourToMove == "w");

        for(let char of canCastle){
            switch(char){
                case "K":
                    this._canCastle["w"]["king"] = true;
                    break;
                case "Q":
                    this._canCastle["w"]["queen"] = true;
                    break;
                case "k":
                    this._canCastle["b"]["king"] = true;
                    break;
                case "q":
                    this._canCastle["b"]["queen"] = true;
                    break;
                default:
                    console.error(char, "does not exist, incorrect FENString");
            }
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

    getAllOpponentMoves(colour){
        const moves = [];
        for(let tile of this.children){
            const piece = tile.firstElementChild;
            if(piece && piece.getColour() !== colour){
                moves.push(...piece.getValidMoves());
            }
        }
        return new Set(moves);
    }
}
window.customElements.define('chessboard-', Chessboard);