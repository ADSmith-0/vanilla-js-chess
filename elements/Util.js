class Util {
    constructor(){
        this.addToLetter = this.addToLetter.bind(this);
    }
    static getOppositeColour(colour){
        return ((colour == "w") ? "b" : "w");
    }
    static numberFromLetter(letter){
        return (letter.charCodeAt(0)-64);
    }
    static letterFromNumber(number){
        return String.fromCharCode(number+64);
    }
    static addToLetter(letter, number){
        return this.letterFromNumber(this.numberFromLetter(letter)+number);
    }
    static coordsToId(x,y){
        return x+y.toString();
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