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
        return (Util.withinXBoundary(x, 0) && Util.withinYBoundary(y, 0));
    }
}