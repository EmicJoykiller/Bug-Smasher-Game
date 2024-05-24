const gameBoard = document.getElementById("game-board");
const scoreBoard = document.getElementById("score-board");
const speedBoard = document.getElementById("speed-board");
let score = 0;
let bug = null;
let speed = 2000;
let intervalId = null;

function createBug() {
  if (bug === null) {
    bug = document.createElement("div");
    bug.classList.add("bug");
    const bugImg = document.createElement("img");
    bugImg.src = "bug.png";
    bug.appendChild(bugImg);
    bug.style.left = `${Math.random() * 450}px`;
    bug.style.top = `${Math.random() * 350}px`;
    bug.addEventListener("click", () => {
      score++;
      updateScore();
      speed -= 200;
      updateSpeed();
      gameBoard.removeChild(bug);
      bug = null;
      clearInterval(intervalId);
      intervalId = setInterval(moveBug, speed);
    });
    gameBoard.appendChild(bug);
    clearInterval(intervalId);
    intervalId = setInterval(moveBug, speed);
  }
}

function moveBug() {
  if (bug !== null) {
    const x = Math.random() * 450;
    const y = Math.random() * 350;
    const bugRect = bug.getBoundingClientRect();
    const boardRect = gameBoard.getBoundingClientRect();
    if (bugRect.left < boardRect.left + boardRect.width) {
      bug.style.left = `${x}px`;
      bug.style.top = `${y}px`;
    } else {
      gameBoard.removeChild(bug);
      bug = null;
      speed += 50;
      updateSpeed();
      clearInterval(intervalId);
      intervalId = setInterval(moveBug, speed);
    }
  }
}

function updateScore() {
  scoreBoard.innerHTML = `Score: ${score}`;
}

function updateSpeed() {
  speedBoard.innerHTML = `Speed: ${speed}ms`;
}

function resetScore() {
  score = 0;
  updateScore();
}

function resetSpeed() {
  speed = 2000;
  updateSpeed();
  clearInterval(intervalId);
  intervalId = setInterval(moveBug, speed);
}

setInterval(createBug, 2000);
