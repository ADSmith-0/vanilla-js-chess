class Tile {
    constructor(){
    }
    static cleanTile(tile){
        return (tile.localName != "div") ? tile.parentElement : tile;
    }
    static isOccupied(tileId){
        return (document.getElementById(tileId).firstElementChild !== null);
    }
    static isOccupiedByColour(tileId, colour){
        return (
            document.getElementById(tileId).firstElementChild &&
            document.getElementById(tileId).firstElementChild.classList.contains(colour)
        );
    }
    static removePiece(tile){
        tile.firstElementChild.remove();
    }
    static isValid(tileId){
        const [x, y] = [...tileId];
        return (Tile.withinXBoundary(x, 0) && Tile.withinYBoundary(y, 0));
    }
    static withinXBoundary(x, number){
        const asciiCode = Util.numberFromLetter(x);
        const diffX = asciiCode+number;
        return (1 <= diffX && diffX <= 8);
    }
    static withinYBoundary(y, number){
        const diffY = parseInt(y)+number;
        return (1 <= diffY && diffY <= 8);
    }
}