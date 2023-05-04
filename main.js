const cells = document.querySelectorAll(".cell");
const resultDisplay = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

let currentPlayer = "X";
let running = false;
let options = ["", "", "", "", "", "", "", "", ""]

startGame();

function startGame(){

    
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    resultDisplay.textContent = `${currentPlayer}'s turn!`;
    running = true;
}

function cellClick(){
    const cellIndex = this.getAttribute("cellIndex");
    
    // cell position will only be updated if options is empty
    if(options[cellIndex] != "" || !running){
        return;
    }   
    updateCell(this, cellIndex);
 
    checkWinner();

}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    resultDisplay.textContent = `${currentPlayer}'s turn!`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){

        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        else if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        resultDisplay.textContent = `${currentPlayer} wins!`
        running = false;
    }
    else if(!options.includes("")){
        resultDisplay.textContent = `Draw!!!`
        running = false;
    }
    else{
        changePlayer();
    }
}   

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    resultDisplay.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}







