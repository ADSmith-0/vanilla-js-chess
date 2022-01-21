class Chessboard extends HTMLElement {
    // replace with better implementation
    #colourToMove = "w";
    // #initialState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    // #initialState = "rnbqkbn1/pppppppp/8/8/1b6/8/PPPP1PPP/RNBQK2R w KQkq - 0 1";
    // #initialState = "rnbqkbn1/pppppppp/8/8/3r4/8/PPPP1PPP/RNBQK2R w KQkq - 0 1";
    #initialState = "rnbqkbnr/pppppppp/8/8/2p5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1";
    
    #inCheck = {
        "b": false,
        "w": false
    }

    #canCastle = {
        "b": { "king": true, "queen": true },
        "w": { "king": true, "queen": true }
    };

    #moves = {
        "b": new Set([]),
        "w": new Set([])
    }

    #lastMove = {
        "piece": null,
        "colour": null,
        "startTile": null,
        "endTile": null
    }

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
    #makeMove(startTileID, endTileID){
        const piece = document.getElementById(startTileID).firstElementChild || null;
        if (piece && piece.moveIsLegal(endTileID)){
            const lastMove = this.#lastMove;
            const moves = this.#moves;
            this.#checkForEnPassantMove(piece, new Tile(null, null, startTileID), new Tile(null, null, endTileID));
            piece.move(endTileID);
            this.#checkForCastleMove(piece, endTileID);
            this.#setLastMove(piece.localName, piece.getColour(), startTileID, endTileID);
            this.#generateAllPsuedoLegalMoves();
            this.#updateCheck();
            if(this.#inCheck[piece.getColour()]){
                this.#flashKing();
                piece.move(startTileID);
                this.#moves = moves;
                this.#lastMove = lastMove;
            }else{
                this.#updateCastling();
            }
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
    #checkForEnPassantMove(piece, startTile, endTile){
        const [ startFile, startRank ] = startTile.getIDArray();
        const [ endFile, endRank ] = endTile.getIDArray();
        const diffFile = Math.abs(startFile - endFile);
        const diffRank = Math.abs(startRank - endRank);
        if(piece.localName == "pawn-" && !endTile.isOccupied() && 
        diffFile == 1 && diffRank == 1){
            
            const pawnTile = new Tile(endFile, startRank);

            document.getElementById(pawnTile.getID()).firstElementChild.remove();
        }
    }
    #generateAllPsuedoLegalMoves(){
        const chessboard = document.querySelector('chessboard-');
        const moves = {
            "b": [],
            "w": []
        }
        for(let tile of chessboard.children){
            const piece = tile.firstElementChild || null;
            if(piece){
                piece.setLocation();
                piece.generateValidMoves();
                if(piece.getColour() == "w"){
                    moves["w"].push(...piece.getValidMoves());
                }else{
                    moves["b"].push(...piece.getValidMoves());
                }
            }
        }
        this.#moves["w"] = new Set(moves["w"]);
        this.#moves["b"] = new Set(moves["b"]);
    }
    #updateCheck(){
        const [ blackKing, whiteKing ] = document.querySelectorAll('king-');
        this.#inCheck = {
            "w": this.#moves["b"].has(whiteKing.getLocation()),
            "b": this.#moves["w"].has(blackKing.getLocation())
        }
    }
    #flashKing() {
        const { parentElement: kingTile } = document.querySelector('king-.' + this.#colourToMove);
        this.#flash(kingTile);
    }
    #flash(tile) {
        tile.classList.add('red');
        setTimeout(() => tile.classList.remove('red'), 2100);
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

        this.#storeCastlingState();
    }
    #storeCastlingState(){
        sessionStorage.setItem('qr', this.#canCastle["b"]["queen"]);
        sessionStorage.setItem('kr', this.#canCastle["b"]["king"]);
        sessionStorage.setItem('qR', this.#canCastle["w"]["queen"]);
        sessionStorage.setItem('kR', this.#canCastle["w"]["king"]);
    }
    #setLastMove(piece, colour, startTile, endTile){
        this.#lastMove = { piece, colour, startTile, endTile };
    }
    getLastMove(){
        return this.#lastMove;
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

        this.#colourToMove = colourToMove;

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
        return (colour == "w") ? this.#moves["b"] : this.#moves["w"];
    }

    getOpponentColour(colour) {
        return (colour == "w") ? "b" : "w";
    }

    isInCheck(colour){
        return this.#inCheck[colour];
    }
}
window.customElements.define('chessboard-', Chessboard);