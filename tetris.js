const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 24;

let board;
let currentPiece;
let currentX;
let currentY;
let currentColor;
let gameOver = false;
let totalLinesCleared = 0;

const shapes = [
  [], // placeholder
  [[1,1,1,1]],                 // I
  [[1,1],[1,1]],               // O
  [[0,1,0],[1,1,1]],           // T
  [[1,0,0],[1,1,1]],           // J
  [[0,0,1],[1,1,1]],           // L
  [[1,1,0],[0,1,1]],           // S
  [[0,1,1],[1,1,0]]            // Z
];

const colors = [
  "#000000",
  "#00f0f0",
  "#f0f000",
  "#a000f0",
  "#0000f0",
  "#f0a000",
  "#00f000",
  "#f00000"
];

function initTetris() {
  board = [];
  for (let r = 0; r < ROWS; r++) {
    board[r] = new Array(COLS).fill(0);
  }
  totalLinesCleared = 0;
  gameOver = false;
  spawnPiece();
}

function spawnPiece() {
  const id = 1 + Math.floor(Math.random() * 7);
  currentPiece = shapes[id].map(row => row.slice());
  currentColor = colors[id];
  currentX = Math.floor(COLS / 2) - Math.ceil(currentPiece[0].length / 2);
  currentY = 0;

  if (collides(currentX, currentY, currentPiece)) {
    gameOver = true;
  }
}

function collides(x, y, shape) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = x + c;
      const ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

function mergePiece() {
  for (let r = 0; r < currentPiece.length; r++) {
    for (let c = 0; c < currentPiece[r].length; c++) {
      if (currentPiece[r][c]) {
        const nx = currentX + c;
        const ny = currentY + r;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
          board[ny][nx] = currentColor;
        }
      }
    }
  }
}

function clearLines() {
  let lines = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(cell => cell !== 0)) {
      board.splice(r, 1);
      board.unshift(new Array(COLS).fill(0));
      lines++;
      r++;
    }
  }
  totalLinesCleared += lines;
  return lines;
}

function rotate(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const res = [];
  for (let c = 0; c < cols; c++) {
    res[c] = [];
    for (let r = rows - 1; r >= 0; r--) {
      res[c][rows - 1 - r] = shape[r][c];
    }
  }
  return res;
}

function stepTetris() {
  if (gameOver) return 0;

  if (!collides(currentX, currentY + 1, currentPiece)) {
    currentY++;
    return 0;
  } else {
    mergePiece();
    const cleared = clearLines();
    spawnPiece();
    return cleared;
  }
}

function drawTetris(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c]) {
        drawBlock(ctx, c, r, board[r][c]);
      }
    }
  }

  for (let r = 0; r < currentPiece.length; r++) {
    for (let c = 0; c < currentPiece[r].length; c++) {
      if (currentPiece[r][c]) {
        const nx = currentX + c;
        const ny = currentY + r;
        if (ny >= 0) {
          drawBlock(ctx, nx, ny, currentColor);
        }
      }
    }
  }
}

function drawBlock(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = "#111";
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function isGameOver() {
  return gameOver;
}

// Controls
document.addEventListener("keydown", e => {
  if (gameOver || !window.gameRunning) return;

  if (e.key === "ArrowLeft") {
    if (!collides(currentX - 1, currentY, currentPiece)) currentX--;
  } else if (e.key === "ArrowRight") {
    if (!collides(currentX + 1, currentY, currentPiece)) currentX++;
  } else if (e.key === "ArrowDown") {
    stepTetris();
  } else if (e.key === "ArrowUp") {
    const rotated = rotate(currentPiece);
    if (!collides(currentX, currentY, rotated)) currentPiece = rotated;
  } else if (e.key === " ") {
    while (!collides(currentX, currentY + 1, currentPiece)) {
      currentY++;
    }
    stepTetris();
  }
});
