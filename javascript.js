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

//Then

let gridCells = document.querySelectorAll(".grid-cell");

gridCells.forEach(cell => cell.addEventListener("click", gridCellInfo));

let livingNeighborsNum;

function gridCellInfo() {
    this.classList.add("alive");
    let cellNum = Number(this.dataset.num);

    let neighborNums = [];
    let livingNeighbors = [];

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

    livingNeighborsNum = livingNeighbors.length;
    console.log(livingNeighborsNum);
}