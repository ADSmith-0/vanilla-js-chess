class Chessboard extends HTMLElement {
    constructor(){
        super();
        this._init();
    }
    _init(){
        for(let rank = 8; rank >= 1; rank--){
            for(let file = 1; file <= 8; file++){
                const tile = this._createTile(file, rank);
                this.appendChild(tile);
            }
        }
    }
    _createTile(file, rank){
        const tile = document.createElement('div');
        tile.setAttribute('id', file.toString()+rank.toString());
        
        let className = "tile ";
        className += ((file+rank) % 2) ? "light-square" : "dark-square";
        tile.setAttribute('class', className);

        return tile;
    }
}
window.customElements.define('chessboard-x', Chessboard);