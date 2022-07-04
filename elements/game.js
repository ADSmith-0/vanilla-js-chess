class Game {
    #player1 = new Player("w");
    #player2 = new Player("b");

    #playerToMove = this.#player1;

    #gameOver = false;

    #endCondition = "ds";

    constructor(){
    }

    switchPlayerToMove(){
        if(this.#playerToMove == this.#player1){
            this.#playerToMove = this.#player2;
        }else{
            this.#playerToMove = this.#player1;
        }
    }

    getPlayerToMove(){
        return this.#playerToMove;
    }

    getColourToMove(){
        return this.#playerToMove.getColour();
    }

    setColourToMove(colour){
        if(colour == "w"){
            this.#playerToMove = this.#player1;
        }else{
            this.#playerToMove = this.#player2;
        }
    }

    setGameOver(bool){
        this.#gameOver = bool;
    }

    setEndCondition(endCondition){
        this.#endCondition = endCondition;
    }

    isGameOver(){
        return this.#gameOver;
    }

    gameEnd(){
        if(this.isGameOver()){
            const gameoverCard = document.querySelector('gameover-card');
            gameoverCard.setAttribute("ending", this.#endCondition);
            gameoverCard.show();
        }
    }
}