let P1 = true;
let moves = [];
let choice = [null, null, null, null, null, null, null, null, null];
let emptyCells = 9;
// Function to reset the game
function resetGame() {
   P1 = true;
   emptyCells = 9;
   moves = [];
   choice = [null, null, null, null, null, null, null, null, null];
   document.getElementById("result").innerHTML = "1st Player Turn";
   for (let i = 1; i <= 9; i++) {
      const button = document.getElementById("box" + i);
      button.innerHTML = "";
      button.disabled = false;
   }
   window.location.reload();
}

// Function to undo the last move
function undoMove() {
   if (moves.length > 0) {
      const idx = moves.pop(); // Get the most recent move
      const button = document.getElementById("box" + idx);
      button.innerHTML = "";
      button.disabled = false;
      choice[idx - 1] = "-";
      P1 = !P1;
      document.getElementById("result").innerHTML = P1
         ? "1st Player Turn"
         : "2nd Player Turn";
   }
}

// Function to mark cells on board
function box(idx) {
   let pos = idx - 1;
   if (choice[pos] == null) {
      let cell = document.getElementById("box" + idx);
      cell.innerHTML = P1 ? "X" : "O";
      choice[pos] = P1 ? "X" : "O";
      moves.push(idx);
      emptyCells = emptyCells - 1;
      P1 = !P1;
      document.getElementById("result").innerHTML = P1
         ? "1st Player Turn"
         : "2nd Player Turn";
      checkResult();
   }
}

// Helper function to get the coordinates of the last move
function getLastMove() {
   for (let row = 2; row >= 0; row--) {
      for (let col = 2; col >= 0; col--) {
         if (choice[row][col] !== "-") {
            return [row, col];
         }
      }
   }
   return null; // No moves made yet
}

// Function to FindWinner
function checkResult() {
   let checkWinner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];
   let isAnyoneWins = false;
   for (const element of checkWinner) {
      const [a, b, c] = element;
      if (choice[a] && choice[a] === choice[b] && choice[b] === choice[c]) {
         playWinSound();
         let resultText = choice[a] == "X" ? "Player 1 Win" : "Player 2 Win";
         document.getElementById("result").innerHTML = resultText;
         for (let i = 1; i <= 9; i++) {
            let boardCell = document.getElementById("box" + i);
            boardCell.disabled = true;
         }
         isAnyoneWins = true;
         setTimeout(resetGame, 4000);
         return;
      }
   }
   if (!isAnyoneWins && emptyCells == 0) {
      document.getElementById("result").innerHTML = "It's a Draw!";
      playTieSound();
      setTimeout(resetGame, 4000);
   }
}

// Function to play the win sound
function playWinSound() {
   let winSound = document.getElementById("win");
   winSound.play(); // Play the win sound
}

// Function to play the tie sound
function playTieSound() {
   let tieSound = document.getElementById("tie");
   tieSound.play(); // Play the tie sound
}

let popup = document.getElementById("popup");
function openPopup() {
   popup.classList.add("open-popup");
}
function closePopup() {
   popup.classList.remove("open-popup");
   popup.classList.add("fade-out");
   setTimeout(() => {
      popup.classList.remove("visible");
      popup.classList.remove("fade-out");
   }, 1000);
}