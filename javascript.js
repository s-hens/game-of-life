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
    this.classList.add("alive");
}

//For each cell, count living neighbors
window.addEventListener("keydown", checkGrid);

let livingNeighbors = [];

function checkGrid() {
    gridCells.forEach(cell => countLivingNeighbors(cell));
    gridCells.forEach(cell => life(cell));
}

function countLivingNeighbors(cell) {
    let cellNum = Number(cell.dataset.num);

    let neighborNums = [];

    if (cellNum % 50 === 0) {
        neighborNums = ["-1", "49", "50", "-50", "-51"];
    } else if (cellNum % 50 === 1) {
        neighborNums = ["1", "-49", "50", "-50", "51"];
    } else {
        neighborNums = ["1", "-1", "49", "-49", "50", "-50", "51", "-51"];
    }

    neighborNums.forEach(function(num) {
        neighborNum = cellNum + Number(num);
        let neighbor = document.querySelector(`[data-num="${neighborNum}"]`);
        if (!neighbor) return;
        if (neighbor.classList.contains("alive")) livingNeighbors.push(neighbor);
    });

        cell.setAttribute("data-livingneighbors", `${livingNeighbors.length}`);
        livingNeighbors = [];
}


function life(cell) {
    if (cell.classList.contains("alive")) console.log(cell, livingNeighbors.length);

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