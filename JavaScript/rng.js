let a = Math.random(); // Generates random nunber between 0-1
let b = Math.floor(Math.random()*6) + 1 // Generates random number between 1-6
console.log(b);
let x;
let y;
let z;
document.getElementById("rollButton").onclick = function() {
    x = Math.floor(Math.random()*6) + 1 // Generates random number between 1-6
    y = Math.floor(Math.random()*6) + 1 // Generates random number between 1-6
    z = Math.floor(Math.random()*6) + 1 // Generates random number between 1-6
    document.getElementById("xLabel").innerHTML = x; // Places x in text for xLabel
    document.getElementById("yLabel").innerHTML = y;
    document.getElementById("zLabel").innerHTML = z;
}
