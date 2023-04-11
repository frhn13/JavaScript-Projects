const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const winConditions = [ // 2D array of all the win conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initialiseGame();

function initialiseGame() {
    running = true
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex"); // this refers to whatever cells is clicked on
    if (options[cellIndex] != "" || !running) { // Cell only updated if it hasn't been filled before
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer; // Writes the X or O to the cell on the grid
    
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "0" : "X"; // Alternates the play turn
    statusText.textContent = `${currentPlayer}'s turn` 
}

function checkWinner() {
    let roundWon = false;
    for (let i=0; i<winConditions.length; i++) { // Iterates through each group of 3 cells
        const condition = winConditions[i];
        const cellA = options[condition[0]]; // Checks groups of three cells to see if they match the win conditions 
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA=="" || cellB=="" || cellC=="") {
            continue;
        }
        if (cellA==cellB && cellB==cellC) { // If group of cells have same value then round won
            roundWon=true;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running=false;
    }
    else if(!options.includes("")) { // If all cells filled with no winner, then game over
        statusText.textContent = "Draw!";
        running=false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer="X";
    options = ["", "", "", "", "", "", "", "", ""]; // Clears all inputs in array
    cells.forEach(cell => cell.textContent="") // Clears all inputs in text
    statusText.textContent = `${currentPlayer}'s turn`
    running=true;
}