let gameRunning = false;
let level = 1;
let loopId = null;
let ctx;
let linesForLevel = 0;

window.onload = () => {
  const canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  initTetris();
  drawTetris(ctx);
  loadAchievementsUI();

  document.getElementById("startBtn").onclick = startGame;
  document.getElementById("stopBtn").onclick = stopGame;
  updateUI();
};

function startGame() {
  if (gameRunning) return;
  if (isGameOver()) {
    initTetris();
    linesForLevel = 0;
  }
  gameRunning = true;
  window.gameRunning = true;
  startLoop();
}

function stopGame() {
  gameRunning = false;
  window.gameRunning = false;
  if (loopId) clearInterval(loopId);
}

function startLoop() {
  if (loopId) clearInterval(loopId);
  const speed = getSpeedForLevel(level);
  loopId = setInterval(() => {
    const cleared = stepTetris();
    if (cleared > 0) {
      linesForLevel += cleared;
    }
    drawTetris(ctx);
    updateUI();

    if (isGameOver()) {
      stopGame();
      alert("Game Over! Level: " + level);
    } else {
      const needed = linesNeededForNextLevel(level);
      if (linesForLevel >= needed && level < 5000) {
        level++;
        linesForLevel = 0;
        unlockAchievements(level);
        startLoop();
      }
    }
  }, speed);
}

function updateUI() {
  document.getElementById("levelDisplay").textContent = level;
  document.getElementById("linesDisplay").textContent = linesForLevel;
}
