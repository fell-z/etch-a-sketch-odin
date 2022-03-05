// REFERENCE ELEMENTS
const rainbowColorButton = document.querySelector(".rainbow-square-color");
const customColorButton = document.querySelector(".custom-square-color");
const customColorPreview = document.querySelector(".custom-color-preview");
const customBackgroundColorButton = document.querySelector(
  ".custom-background-color"
);

const toggleGridButton = document.querySelector(".toggle-grid");
const clearGridButton = document.querySelector(".clear-grid");
const sizeGridSlider = document.querySelector("#size-of-grid");

const canvasContainer = document.querySelector(".canvas-container");

// CREATED ELEMENTS
const canvasSize = 600;

const canvasDiv = document.createElement("div");
canvasDiv.classList.add("canvas");
canvasDiv.style.cssText = `
width: ${canvasSize}px;
height: ${canvasSize}px;
`;

let cRed = "255",
  cGreen = "255",
  cBlue = "255";
function setCustomColor() {
  cRed = document.querySelector("#red").value;
  cGreen = document.querySelector("#green").value;
  cBlue = document.querySelector("#blue").value;

  customColorPreview.style.backgroundColor = `rgb(${cRed}, ${cGreen}, ${cBlue})`;
}

function paintWithCustomColor(event) {
  event.target.style.backgroundColor = `rgb(${cRed}, ${cGreen}, ${cBlue})`;
}

function paintWithRainbowColor(event) {
  const rRed = Math.floor(Math.random() * 255) + 1;
  const rGreen = Math.floor(Math.random() * 255) + 1;
  const rBlue = Math.floor(Math.random() * 255) + 1;

  event.target.style.backgroundColor = `rgb(${rRed}, ${rGreen}, ${rBlue})`;
}

function createSquareGrid() {
  const numSquares = sizeGridSlider.value;

  const hasSquareBorders =
    document.getElementsByClassName("square-borders").length;

  // just verify if grid has already been created
  if (canvasSquares) {
    canvasDiv.childNodes.forEach((element) => {
      if (currentEventListener === "rainbow") {
        element.removeEventListener("mouseenter", paintWithRainbowColor);
      } else {
        element.removeEventListener("mouseenter", paintWithCustomColor);
      }
    });
    canvasDiv.innerHTML = "";
  }
  // the condition here is to create the correct amount of squares in the grid
  for (
    let actualSquare = 0;
    actualSquare < numSquares * numSquares;
    actualSquare++
  ) {
    const square = document.createElement("div");
    square.style.cssText = `
width: ${canvasSize / numSquares}px;
height: ${canvasSize / numSquares}px;
`;
    square.classList.add("canvas-square");
    if (currentEventListener === "rainbow") {
      square.addEventListener("mouseenter", paintWithRainbowColor);
    } else {
      square.addEventListener("mouseenter", paintWithCustomColor);
    }
    canvasDiv.appendChild(square);
  }
  canvasSquares = canvasDiv.childNodes;
  if (hasSquareBorders) {
    for (const square of canvasSquares) {
      square.classList.toggle("square-borders");
    }
  }
}
let canvasSquares;
let currentEventListener = "rainbow";
createSquareGrid();
canvasContainer.appendChild(canvasDiv);

toggleGridButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    square.classList.toggle("square-borders");
  }
});

clearGridButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    square.style.backgroundColor = "";
  }
});

rainbowColorButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    switch (currentEventListener) {
      case "rainbow":
        square.removeEventListener("mouseenter", paintWithRainbowColor);
        square.addEventListener("mouseenter", paintWithRainbowColor);
        break;
      case "custom":
        square.removeEventListener("mouseenter", paintWithCustomColor);
        square.addEventListener("mouseenter", paintWithRainbowColor);
        break;
    }
  }
  currentEventListener = "rainbow";
});

customColorButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    switch (currentEventListener) {
      case "rainbow":
        square.removeEventListener("mouseenter", paintWithRainbowColor);
        square.addEventListener("mouseenter", paintWithCustomColor);
        break;
      case "custom":
        square.removeEventListener("mouseenter", paintWithCustomColor);
        square.addEventListener("mouseenter", paintWithCustomColor);
        break;
    }
  }
  currentEventListener = "custom";
});

document.querySelectorAll(".color").forEach((slider) => {
  slider.addEventListener("input", setCustomColor);
});

customBackgroundColorButton.addEventListener("click", () => {
  canvasDiv.style.backgroundColor = `rgb(${cRed}, ${cGreen}, ${cBlue})`;
});

sizeGridSlider.addEventListener("input", createSquareGrid);
