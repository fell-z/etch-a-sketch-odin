/*
 * IDEA: Make a button that when clicked, it gonna toggle a special
 * grid layout with border between the divs to outline each one.
 * useful to do, for example, more symmetrical arts
 */

// REFERENCE ELEMENTS
const toggleGridButton = document.querySelector(".toggle-grid");

// CREATED ELEMENTS
const canvasDiv = document.createElement("div");
canvasDiv.classList.add("canvas");
canvasDiv.style.cssText = `
width: 512px;
height: 512px;
`;

toggleGridButton.addEventListener("click", () => {
  const canvasSquares = document.querySelectorAll(".canvas-square");
  for (const square of canvasSquares) {
    square.classList.toggle("square-borders");
  }
});

function createSquareGrid(numSquares) {
  for (let x = 0; x < numSquares; x++) {
    for (let y = 0; y < numSquares; y++) {
      const square = document.createElement("div");
      square.classList.add("canvas-square");
      canvasDiv.appendChild(square);
    }
  }
}

createSquareGrid(16);
document.body.insertBefore(canvasDiv, document.querySelector(".controls"));
