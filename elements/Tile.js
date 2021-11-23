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
    static isOccupiedByOppositeColour(tileId){
        const tile = document.getElementById(tileId);
        console.log(tile.firstChildElement !== undefined);
        console.log(tile);
        if(tile.firstChildElement !== undefined){
            const colour = (tile.firstChildElement.classList.contains("w")) ? "w" : "b";
            console.log(colour);
            return Tile.isOccupiedByColour(tileId, Util.getOppositeColour(colour));
        }
        return false;
    }
    static removePiece(tile){
        document.getElementById(tile).firstElementChild.remove();
    }
    static isValid(tileId){
        const [x, y] = [...tileId];
        return (Util.withinXBoundary(x, 0) && Util.withinYBoundary(y, 0));
    }
}