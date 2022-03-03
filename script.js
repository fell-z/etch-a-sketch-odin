// REFERENCE ELEMENTS
const toggleGridButton = document.querySelector(".toggle-grid");
const clearGridButton = document.querySelector(".clear-grid");
const sizeGridSlider = document.querySelector(".size-of-grid-slider input");

// CREATED ELEMENTS
const canvasSize = 600;

const canvasDiv = document.createElement("div");
canvasDiv.classList.add("canvas");
canvasDiv.style.cssText = `
width: ${canvasSize}px;
height: ${canvasSize}px;
`;

function randomSquareColor(event) {
  const red = Math.floor(Math.random() * 255) + 1;
  const green = Math.floor(Math.random() * 255) + 1;
  const blue = Math.floor(Math.random() * 255) + 1;

  event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function createSquareGrid() {
  const numSquares = sizeGridSlider.value;

  const hasSquareBorders =
    document.getElementsByClassName("square-borders").length > 0 ? true : false;

  // just verify if grid has already been created
  if (canvasDiv.childNodes.length) {
    canvasDiv.childNodes.forEach((element) => {
      element.removeEventListener("mouseenter", randomSquareColor);
    });
    canvasDiv.innerHTML = "";
    /*
     * the idea originally was to remove the element in the forEach loop, but it stops
     * halfway the nodelist, i really don't know what was happening, so i stick with the
     * innerHTML method for now
     */
  }

  for (let x = 0; x < numSquares; x++) {
    for (let y = 0; y < numSquares; y++) {
      const square = document.createElement("div");
      square.style.cssText = `
width: ${canvasSize / numSquares}px;
height: ${canvasSize / numSquares}px;
`;
      square.classList.add("canvas-square");
      square.addEventListener("mouseenter", randomSquareColor);
      canvasDiv.appendChild(square);
    }
  }
  canvasSquares = canvasDiv.childNodes;
  if (hasSquareBorders) {
    for (const square of canvasSquares) {
      square.classList.toggle("square-borders");
    }
  }
}
let canvasSquares;
createSquareGrid();
document.body.insertBefore(canvasDiv, document.querySelector(".controls"));

toggleGridButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    square.classList.toggle("square-borders");
  }
});

clearGridButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    square.style.backgroundColor = "white";
  }
});

sizeGridSlider.addEventListener("change", createSquareGrid);
