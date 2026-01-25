const player1Input = document.getElementById("player1Name");
const player2Input = document.getElementById("player2Name");
const modeSelect = document.getElementById("mode");

const btnStart = document.getElementById("btnStart");
const gameDiv = document.getElementById("game");
const turnDisplay = document.getElementById("turnDisplay");
const cells = document.querySelectorAll(".cell");
const resultDisplay = document.getElementById("result");
const btnRestart = document.getElementById("btnRestart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let player1 = "Player 1", player2 = "Player 2";
let vsComputer = false;

// Winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

btnStart.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  if (modeSelect.value === "cpu") {
    player2 = "Computer";
    vsComputer = true;
  } else {
    player2 = player2Input.value || "Player 2";
    vsComputer = false;
  }

  document.querySelector(".setup").classList.add("hidden");
  gameDiv.classList.remove("hidden");
  updateTurn();
});

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

btnRestart.addEventListener("click", () => {
  board.fill("");
  cells.forEach(cell => (cell.textContent = ""));
  resultDisplay.textContent = "";
  isGameActive = true;
  currentPlayer = "X";
  updateTurn();
});

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkGameStatus();
  if (isGameActive && vsComputer && currentPlayer === "O") {
    computerMove();
  }
}

function computerMove() {
  let emptyCells = board.map((v,i) => v?null:i).filter(i => i !== null);
  let choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[choice] = currentPlayer;
  document.querySelector(`.cell[data-index='${choice}']`).textContent = currentPlayer;
  checkGameStatus();
}

function checkGameStatus() {
  let roundWon = false;
  for (let pat of winPatterns) {
    const [a,b,c] = pat;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    resultDisplay.textContent = `${currentPlayer === "X" ? player1 : player2} Wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    resultDisplay.textContent = "It's a Draw! 🤝";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurn();
}

function updateTurn() {
  turnDisplay.textContent = `Turn: ${currentPlayer === "X" ? player1 : player2}`;
}
