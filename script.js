/*
 * IDEA: Make a button that when clicked, it gonna toggle a special
 * grid layout with border between the divs to outline each one.
 * useful to do, for example, more symmetrical arts
 */

// REFERENCE ELEMENTS
const toggleGridButton = document.querySelector(".toggle-grid");
const clearGridButton = document.querySelector(".clear-grid");

// CREATED ELEMENTS
const canvasDiv = document.createElement("div");
canvasDiv.classList.add("canvas");
canvasDiv.style.cssText = `
width: 512px;
height: 512px;
`;

function randomSquareColor(event) {
  const red = Math.floor(Math.random() * 255) + 1;
  const green = Math.floor(Math.random() * 255) + 1;
  const blue = Math.floor(Math.random() * 255) + 1;

  event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function createSquareGrid(numSquares) {
  for (let x = 0; x < numSquares; x++) {
    for (let y = 0; y < numSquares; y++) {
      const square = document.createElement("div");
      square.classList.add("canvas-square");
      square.addEventListener("mouseenter", randomSquareColor);
      canvasDiv.appendChild(square);
    }
  }
}
createSquareGrid(16);
document.body.insertBefore(canvasDiv, document.querySelector(".controls"));
const canvasSquares = document.querySelectorAll(".canvas-square");

toggleGridButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    square.classList.toggle("square-borders");
  }
});

clearGridButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    square.style.backgroundColor = "white";
  }
})

