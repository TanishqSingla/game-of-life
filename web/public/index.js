"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wasm_game_of_life_1 = require("wasm-game-of-life");
const wasm_game_of_life_bg_wasm_1 = require("wasm-game-of-life/wasm_game_of_life_bg.wasm");
const CELL_SIZE = 10;
const GRID_COLOR = "#ccc";
const DEAD_COLOR = "#fff";
const ALIVE_CELL = "#000";
const canvas = document.getElementById("game-of-life-canvas");
const universe = wasm_game_of_life_1.Universe.new();
const width = universe.width();
const height = universe.height();
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;
const ctx = canvas.getContext("2d");
const drawGrid = () => {
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;
    // vertical lines
    for (let i = 0; i <= width; i++) {
        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }
    for (let j = 0; j <= width; j++) {
        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }
    ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
};
const getIndex = (row, column) => {
    return row * width + column;
};
const drawCells = () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(wasm_game_of_life_bg_wasm_1.memory.buffer, cellsPtr, width * height);
    ctx.beginPath();
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);
            ctx.fillStyle = cells[idx] === wasm_game_of_life_1.Cell.Dead ? DEAD_COLOR : ALIVE_CELL;
            ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
        }
    }
    ctx.stroke();
};
const renderLoop = () => {
    universe.tick();
    drawGrid();
    drawCells();
    requestAnimationFrame(renderLoop);
};
drawGrid();
drawCells();
requestAnimationFrame(renderLoop);
