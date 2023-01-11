const gridContainer = document.querySelector("#grid-container");

//const gridCells = document.querySelectorAll(".grid-cell");

function createGrid() {
    for (let i = 1; i < 1251; i++) {
        gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.setAttribute("data-num", `${i}`);
        gridContainer.appendChild(gridCell);
    }
}

createGrid();