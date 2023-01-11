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

function gridCellInfo() {
    this.classList.add("alive");
    let cellNum = Number(this.dataset.num);
    console.log(cellNum);
    console.log(cellNum % 50);

    let neighborNumbers = [];

    if (cellNum % 50 === 0) {
        neighborNumbers = ["-1", "49", "50", "-50", "-51"];
    } else if (cellNum % 50 === 1) {
        neighborNumbers = ["1", "-49", "50", "-50", "51"];
    } else {
        neighborNumbers = ["1", "-1", "49", "-49", "50", "-50", "51", "-51"];
    }

    neighborNumbers.forEach(function(num) {
        neighborNum = cellNum + Number(num);
        let neighbor = document.querySelector(`[data-num="${neighborNum}"]`);
        if (!neighbor) return;
        neighbor.classList.add("neighbor");
    });
}