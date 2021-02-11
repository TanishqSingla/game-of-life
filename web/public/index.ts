import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg.wasm";

const CELL_SIZE: number = 10;
const GRID_COLOR: string = "#ccc";
const DEAD_COLOR = "#fff";
const ALIVE_CELL = "#000";

const canvas = document.getElementById(
  "game-of-life-canvas"
) as HTMLCanvasElement;

const universe = Universe.new();
const width: number = universe.width();
const height: number = universe.height();

canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const drawGrid = () => {
  ctx?.beginPath();
  ctx.strokeStyle = GRID_COLOR;
  // vertical lines
  for (let i: number = 0; i <= width; i++) {
    ctx?.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx?.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let j: number = 0; j <= width; j++) {
    ctx?.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx?.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx?.stroke();
};

const getIndex = (row: number, column: number): number => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row: number = 0; row < height; row++) {
    for (let col: number = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_CELL;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

canvas.addEventListener("click", (e) => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
  const canvasTop = (e.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawGrid();
  drawCells();
});

// button mechanics
let animationId: any = null;

const playPauseButton = document.getElementById(
  "play-pause"
) as HTMLButtonElement;

const play = () => {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = "▶";
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener("click", () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

const isPaused = (): Boolean => {
  return animationId === null;
};

const renderLoop = () => {
  universe.tick();

  drawGrid();
  drawCells();
  animationId = requestAnimationFrame(renderLoop);
};

drawGrid();
drawCells();
play();
