class Chessboard extends HTMLElement {
    #whiteToMove = null;
    // #initialState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    #initialState = "rnbqk1nr/pppppppp/8/8/2b5/8/PPPP1PPP/RNBQK2R w KQkq - 0 1";
    #canCastle = {
        "b": { "king": true, "queen": true },
        "w": { "king": true, "queen": true }
    };

    #startTile = null;
    
    constructor(){
        super();
        
        this.#storeCastlingState();

        this.#init();

        this.addEventListener('mousedown', this.#storeStartTile);
        this.addEventListener('mouseup', this.#handleMovePiece);
    }
    #init(){
        for(let rank = 8; rank >= 1; rank--){
            for(let file = 1; file <= 8; file++){
                const tile = this.#createTile(file, rank);
                this.appendChild(tile);
            }
        }
        this.#FENStringToBoardState(this.#initialState);
    }
    connectedCallback() {
        this.#generateAllPsuedoLegalMoves();
    }
    #createTile(file, rank){
        const tile = document.createElement('div');
        tile.setAttribute('id', file.toString()+rank.toString());
        
        let className = "tile ";
        className += ((file+rank) % 2) ? "light-square" : "dark-square";
        tile.setAttribute('class', className);

        return tile;
    }
    #getTile(x, y){
        const { offsetLeft:left, offsetTop:top, offsetHeight:height } = document.querySelector('chessboard-');
        const { offsetWidth:tileWidth, offsetHeight:tileHeight } = document.getElementById('11');
        const file = Math.floor((x - left) / tileWidth)+1;
        const rank = Math.floor(((height+top) - y) / tileHeight)+1;
        return file.toString()+rank.toString();
    }
    #getTileMouseIsHoveringOver(e){
        const id = this.#getTile(e.clientX, e.clientY);
        return id;
    }
    #storeStartTile(e){
        this.#startTile = this.#getTileMouseIsHoveringOver(e);
    }
    #handleMovePiece(e){
        const endTile = this.#getTileMouseIsHoveringOver(e);
        this.#makeMove(this.#startTile, endTile);
    }
    #makeMove(startTile, endTile){
        const piece = document.getElementById(startTile).firstElementChild || null;
        if(piece && piece.moveIsLegal(endTile)){
            piece.move(endTile);
            this.#checkForCastleMove(piece, endTile);
            this.#generateAllPsuedoLegalMoves();
            this.#updateCastling();
            this.#storeCastlingState();
        }
    }
    #checkForCastleMove(piece, endTile){
        const [file, rank] = endTile;
        const { king:canCastleKingside, queen:canCastleQueenside } = this.#canCastle[piece.getColour()];
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
    #generateAllPsuedoLegalMoves(){
        const chessboard = document.querySelector('chessboard-');
        for(let tile of chessboard.children){
            const piece = tile.firstElementChild || null;
            if(piece){
                piece.setLocation();
                piece.generateValidMoves();
                // console.log(piece.#validMoves);
            }
        }
    }
    #updateCastling(){
        const [blackKing, whiteKing] = document.querySelectorAll('king-');

        if(blackKing.hasMoved()){
            this.#canCastle["b"] = { "king": false, "queen": false };
        }

        if(whiteKing.hasMoved()) {
            this.#canCastle["w"] = { "king": false, "queen": false };
        }

        const whiteKingHasntMoved = Object.values(this.#canCastle["w"]).filter(Boolean).length;
        const blackKingHasntMoved = Object.values(this.#canCastle["b"]).filter(Boolean).length;
        
        if(!(whiteKingHasntMoved && blackKingHasntMoved)) return; 

        // rooks are selected in the order black a8, black h8, white a1, white h1
        // qr: black queen-side rook, kr: black king-side rook
        // qR: white queen-side rook, kR: white king-side rook
        // Based off of FEN notation
        const [qr, kr, qR, kR] = document.querySelectorAll('rook-');
        
        if(blackKingHasntMoved){
            
            this.#canCastle["b"]["queen"] = !qr.hasMoved();
            this.#canCastle["b"]["king"] = !kr.hasMoved();
        }
        
        if(whiteKingHasntMoved){
            this.#canCastle["w"]["queen"] = !qR.hasMoved();
            this.#canCastle["w"]["king"] = !kR.hasMoved();
        }
    }
    #storeCastlingState(){
        sessionStorage.setItem('qr', this.#canCastle["b"]["queen"]);
        sessionStorage.setItem('kr', this.#canCastle["b"]["king"]);
        sessionStorage.setItem('qR', this.#canCastle["w"]["queen"]);
        sessionStorage.setItem('kR', this.#canCastle["w"]["king"]);
    }
    #boardStateToFENString(){

    }
    #FENStringToBoardState(FENString){
        const [board, colourToMove, canCastle, timer, noOfHalfMoves, noOfMoves] = FENString.split(/\s/);
        let rank = 8;
        let file = 1;
        for(let row of board.split('/')){
            const squares = [...row];
            for(let square of squares){
                // if piece is not a number
                if(!parseInt(square)){
                    const pieceType = this.#pieceFromLetter(square);
                    const piece = document.createElement(pieceType);
                    const colour = this.#colourFromLetter(square);
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

        this.#whiteToMove = (colourToMove == "w");

        for(let char of canCastle){
            switch(char){
                case "K":
                    this.#canCastle["w"]["king"] = true;
                    break;
                case "Q":
                    this.#canCastle["w"]["queen"] = true;
                    break;
                case "k":
                    this.#canCastle["b"]["king"] = true;
                    break;
                case "q":
                    this.#canCastle["b"]["queen"] = true;
                    break;
                default:
                    console.error(char, "does not exist, incorrect FENString");
            }
        }
    }

    #pieceFromLetter(letter){
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

    #colourFromLetter(letter){
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