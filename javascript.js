//First create the grid
//Doing this in JS to avoid a huge HTML file
const gridContainer = document.querySelector("#grid-container");

function createGrid() {
    for (let i = 1; i < 1251; i++) {
        gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.setAttribute("data-num", `${i}`);
        gridContainer.appendChild(gridCell);
    }
}
createGrid();

//Select initial living cells
let gridCells = document.querySelectorAll(".grid-cell");

gridCells.forEach(cell => cell.addEventListener("click", makeAlive));

function makeAlive() {
    this.classList.toggle("alive");
    liveCells = document.querySelectorAll(".grid-cell.alive").length;
    liveCellCount.innerHTML = `Live Cells:<span class="count">${liveCells}</span>`
}

//One generation
const genButton = document.querySelector("#nextGen");

genButton.addEventListener("click", checkGrid);

//Play (indefinite generations)
const playButton = document.querySelector("#play");

playButton.addEventListener("click", play);

//Get busy living or get busy dying

const genCount = document.querySelector(".generation");
const liveCellCount = document.querySelector(".live-cell-count");

let livingNeighbors = [];
let playing;
let generation = 0;
let liveCells = 0;

function play() {
    playing = setInterval(checkGrid, 500);
}

function checkGrid() {
    gridCells.forEach(cell => countLivingNeighbors(cell));
    gridCells.forEach(cell => life(cell));

    generation = generation + 1;
    genCount.innerHTML = `Generation:<span class="count">${generation}</span>`;

    liveCells = document.querySelectorAll(".grid-cell.alive").length;
    liveCellCount.innerHTML = `Live Cells:<span class="count">${liveCells}</span>`

    if (document.querySelector(".grid-cell.alive") != null) {
        return;
    } else {
        pause();
    }
}

function countLivingNeighbors(cell) {
    let cellNum = Number(cell.dataset.num);

    let neighborFinders = [];

    if (cellNum % 50 === 0) {
        neighborFinders = ["-1", "49", "50", "-50", "-51"];
    } else if (cellNum % 50 === 1) {
        neighborFinders = ["1", "-49", "50", "-50", "51"];
    } else {
        neighborFinders = ["1", "-1", "49", "-49", "50", "-50", "51", "-51"];
    }

    neighborFinders.forEach(function(num) {
        neighborNum = cellNum + Number(num);
        let neighbor = document.querySelector(`[data-num="${neighborNum}"]`);
        if (!neighbor) return;
        if (neighbor.classList.contains("alive")) livingNeighbors.push(neighbor);
    });

    cell.setAttribute("data-livingneighbors", `${livingNeighbors.length}`);

    livingNeighbors = [];
}

function life(cell) {
    switch (true) {
        case cell.classList.contains("alive") && Number(cell.dataset.livingneighbors) < 2:
            cell.classList.remove("alive");
            break;
        case cell.classList.contains("alive") && Number(cell.dataset.livingneighbors) > 3:
            cell.classList.remove("alive");
            break;
        case cell.classList.contains("alive") && Number(cell.dataset.livingneighbors) == 3:
            break;
        case cell.classList.contains("alive") && Number(cell.dataset.livingneighbors) == 2:
            break;
        case !cell.classList.contains("alive") && Number(cell.dataset.livingneighbors) == 3:
            cell.classList.add("alive");
            break;
        default: return;
    }
}

//Pause
const pauseButton = document.querySelector("#pause");

pauseButton.addEventListener("click", pause);

function pause() {
    clearInterval(playing);
}

//Clear
const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", clear);

function clear() {
    gridCells.forEach(cell => cell.classList.remove("alive"));
    generation = 0;
    genCount.innerHTML = `Generation:<span class="count">0</span>`;
    liveCells = 0;
    liveCellCount.innerHTML = `Live Cells:<span class="count">0</span>`;
}