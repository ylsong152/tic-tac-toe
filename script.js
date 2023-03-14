const player1 = 'X';
const player2 = 'O';
const boxes = document.querySelectorAll('.box');
const turnMsg = document.querySelector('#turn-msg');
const startBtn = document.querySelector('#start-btn');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let player1Turn;

startGame();

startBtn.addEventListener('click', startGame);

function startGame() {
  player1Turn = false;
  boxes.forEach((box) => {
    box.addEventListener('click', handleClick, { once: true });
    box.innerText = '';
  });
  turnMsg.innerText = 'Click on any boxes to start!';
}

function handleClick(event) {
  const box = event.target;
  const currentPlayer = player1Turn ? player2 : player1;
  placeMark(box, currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (drawGame()) {
    endGame(true);
  } else {
    switchTurns();
  }
}

function placeMark(box, currentPlayer) {
  if (box.innerText === '') {
    box.innerText += currentPlayer;
  }
}

function switchTurns() {
  if (player1Turn) {
    player1Turn = !player1Turn;
    turnMsg.innerText = "Player 1's Turn";
  } else {
    player1Turn = !player1Turn;
    turnMsg.innerText = "Player 2's Turn";
  }
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return boxes[index].innerText === player;
    });
  });
}

function endGame(draw) {
  if (draw) {
    turnMsg.innerText = 'Tie!';
  } else {
    turnMsg.innerText = `${player1Turn ? 'Player 2 Wins!' : 'Player 1 Wins!'}`;
  }
  boxes.forEach((box) => {
    box.removeEventListener('click', handleClick);
  });
}

function drawGame() {
  return [...boxes].every((box) => box.innerText !== '');
}
