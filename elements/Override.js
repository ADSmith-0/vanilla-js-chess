// Taken from: https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.containsSubArr)
    console.warn("Overriding existing Array.prototype.containsSubArr. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
Array.prototype.containsSubArr = function(array){
    // if the other array is a falsy value, return
    let foundMatch = false;
    for(let i=0, length=this.length; i < length; i++){
        if(this[i].length !== array.length) continue;
        for(let j = 0, l=this[i].length; j < l; j++){
            if(this[i][j] !== array[j]){
                foundMatch = false;
                break;
            }else{
                foundMatch = true;
            }
        }
        if(foundMatch) return true;
    }
    return foundMatch;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "containsSubArr", {enumerable: false});