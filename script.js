//your JS code here. If required.
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");

const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const messageDiv = document.getElementById("message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "x";
let player1 = "";
let player2 = "";
let gameOver = false;

// Track game state for win checking
const boardState = {
  1: "", 2: "", 3: "",
  4: "", 5: "", 6: "",
  7: "", 8: "", 9: ""
};

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    inputSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    messageDiv.textContent = `${player1}, you're up`;
  } else {
    alert("Please enter both player names!");
  }
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const cellId = parseInt(cell.id);

    if (cell.textContent !== "" || gameOver) return;

    cell.textContent = currentPlayer;
    boardState[cellId] = currentPlayer;

    if (checkWin(currentPlayer)) {
      const winner = currentPlayer === "x" ? player1 : player2;
      messageDiv.textContent = `${winner} congratulations you won!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    const nextPlayer = currentPlayer === "x" ? player1 : player2;
    messageDiv.textContent = `${nextPlayer}, you're up`;
  });
});

function checkWin(symbol) {
  return winningCombinations.some(combination =>
    combination.every(cell => boardState[cell] === symbol)
  );
}