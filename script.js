// REFERENCE ELEMENTS
const blackColorButton = document.querySelector(".black-square-color");
const rainbowColorButton = document.querySelector(".rainbow-square-color");

const customColorButton = document.querySelector(".custom-square-color");
const customColorPreview = document.querySelector(".custom-color-preview");

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

function blackSquareColor(event) {
  event.target.style.backgroundColor = `#000`;
}

let cRed = "120",
  cGreen = "120",
  cBlue = "120";
function setCustomColor() {
  cRed = document.querySelector("#red").value;
  cGreen = document.querySelector("#green").value;
  cBlue = document.querySelector("#blue").value;

  customColorPreview.style.backgroundColor = `rgb(${cRed}, ${cGreen}, ${cBlue})`;
}

function paintWithCustomColor(event) {
  event.target.style.backgroundColor = `rgb(${cRed}, ${cGreen}, ${cBlue})`;
}

function rainbowSquareColor(event) {
  const rRed = Math.floor(Math.random() * 255) + 1;
  const rGreen = Math.floor(Math.random() * 255) + 1;
  const rBlue = Math.floor(Math.random() * 255) + 1;

  event.target.style.backgroundColor = `rgb(${rRed}, ${rGreen}, ${rBlue})`;
}

function createSquareGrid() {
  const numSquares = sizeGridSlider.value;

  const hasSquareBorders =
    document.getElementsByClassName("square-borders").length > 0 ? true : false;

  // just verify if grid has already been created
  if (canvasDiv.childNodes.length) {
    canvasDiv.childNodes.forEach((element) => {
      if (currentEventListener === "rainbow") {
        element.removeEventListener("mouseenter", rainbowSquareColor);
      } else if (currentEventListener === "black") {
        element.removeEventListener("mouseenter", blackSquareColor);
      } else {
        element.removeEventListener("mouseenter", paintWithCustomColor);
      }
    });
    canvasDiv.innerHTML = "";
    /*
     * the idea originally was to remove the element in the forEach loop, but it stops
     * halfway the nodelist, i really don't know what was happening, so i stick with the
     * innerHTML method for now, which is better anyways
     */
  } else {
    currentEventListener = "rainbow";
  }

  for (let x = 0; x < numSquares; x++) {
    for (let y = 0; y < numSquares; y++) {
      const square = document.createElement("div");
      square.style.cssText = `
width: ${canvasSize / numSquares}px;
height: ${canvasSize / numSquares}px;
`;
      square.classList.add("canvas-square");
      if (currentEventListener === "rainbow") {
        square.addEventListener("mouseenter", rainbowSquareColor);
      } else if (currentEventListener === "black") {
        square.addEventListener("mouseenter", blackSquareColor);
      } else {
        square.addEventListener("mouseenter", paintWithCustomColor);
      }
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
    square.style.backgroundColor = "white";
  }
});

blackColorButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    switch (currentEventListener) {
      case "rainbow":
        square.removeEventListener("mouseenter", rainbowSquareColor);
        square.addEventListener("mouseenter", blackSquareColor);
        break;
      case "black":
        square.removeEventListener("mouseenter", blackSquareColor);
        square.addEventListener("mouseenter", blackSquareColor);
        break;
      case "custom":
        square.removeEventListener("mouseenter", paintWithCustomColor);
        square.addEventListener("mouseenter", blackSquareColor);
        break;
    }
  }
  currentEventListener = "black";
});

rainbowColorButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    switch (currentEventListener) {
      case "rainbow":
        square.removeEventListener("mouseenter", rainbowSquareColor);
        square.addEventListener("mouseenter", rainbowSquareColor);
        break;
      case "black":
        square.removeEventListener("mouseenter", blackSquareColor);
        square.addEventListener("mouseenter", rainbowSquareColor);
        break;
      case "custom":
        square.removeEventListener("mouseenter", paintWithCustomColor);
        square.addEventListener("mouseenter", rainbowSquareColor);
        break;
    }
  }
  currentEventListener = "rainbow";
});

customColorButton.addEventListener("click", () => {
  for (const square of canvasSquares) {
    switch (currentEventListener) {
      case "rainbow":
        square.removeEventListener("mouseenter", rainbowSquareColor);
        square.addEventListener("mouseenter", paintWithCustomColor)
        break;
      case "black":
        square.removeEventListener("mouseenter", blackSquareColor);
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

sizeGridSlider.addEventListener("change", createSquareGrid);
