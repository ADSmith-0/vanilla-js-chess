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
}