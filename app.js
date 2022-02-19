const tiles = document.querySelector(".tile-container");
const gameContainer = document.querySelector(".game-container");
// console.log("tiles", tiles)
const keyboard = document.querySelector(".keyboard-container");
const messageDisplay = document.querySelector(".message-container");
// console.log("keyboard", keyboard);
//querySelector() returns the first Element within the document that matches the specified selector, or group of selectors.
let wordle;
const getWordle = () => {
  fetch('http://localhost:8000/word')
  .then(response => response.json())
  .then(json => {
    console.log(json)
    wordle = json.toUpperCase()
    console.log("wordle", wordle)
  })
  .catch(err => console.error(err))
}
getWordle();

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "del",
];

keys.forEach((key) => {
  const keyElement = document.createElement("button");
  keyElement.textContent = key;
  keyElement.setAttribute("id", key);
  keyElement.addEventListener("click", () => handleClick(key));
  keyboard.append(keyElement); //inserts a set of Node objects or DOMString objects after the last child of the document
});

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

guessRows.forEach((row, rowIndex) => {
  let rowElement = document.createElement("div");
  rowElement.setAttribute("id", "row-" + rowIndex);

  row.forEach((tile, tileIndex) => {
    const tileElement = document.createElement("div");
    // tileElement.addEventListener('keydown', (e) => {
    //   console.log(e);
    // });
    tileElement.setAttribute("id", "row-" + rowIndex + "-tile-" + tileIndex);
    rowElement.append(tileElement);
  });
  tiles.append(rowElement);
});

const handleClick = (letter) => {
  if (letter == "del") {
    deleteLetter(letter);
    // console.log("guessRows", guessRows);
    return;
  } else if (letter == "ENTER") {
    // console.log("current row", currentRow)
    // console.log("current tile", currentTile)
    if (currentRow == 5) {
      checkGame(guessRows[currentRow]);
    } else {
      checkGuessRow(guessRows[currentRow]);
      // console.log("guessRows", guessRows[currentRow]);
      // console.log("currentTile", currentTile);
      return;
    }
  } else {
    // console.log("press", letter);
    addLetter(letter);
  }
};
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
const addLetter = (letter) => {
  //  console.log("current row", currentRow);
  //  console.log("current tile", currentTile);
  if (currentRow < 6 && currentTile < 6) {
    const node = document.getElementById(
      "row-" + currentRow + "-tile-" + currentTile
    );
    node.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    node.setAttribute("data", letter);
    currentTile++;
    // console.log("guessRows", guessRows);
  }
};

const deleteLetter = () => {
  currentTile--;
  const node = document.getElementById(
    "row-" + currentRow + "-tile-" + currentTile
  );
  node.textContent = "";
  guessRows[currentRow][currentTile] = ""; //tai sao can set cai nay, no khong giong line 104 sao?
  node.setAttribute("data", ""); //tai sao phai set data? sao khong that no hien len tren html file
};

const checkGuessRow = (checkRow) => {
  if (currentTile < 4) {
    showMessages("Not enough word");
  } else {
    const guessWord = checkRow.join("");
    if (guessWord == wordle) {
      showMessages("You nailed it!!!!!");
      gameOver = true;
    } else {
      checkCharsInRow(checkRow);
    }
  }
};

const showMessages = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  // setInterval(() => {messageDisplay.style.display = 'none'}, 1000);
  setTimeout(() => {
    messageDisplay.removeChild(messageElement);
  }, 2000);
};

const checkCharsInRow = (charsArray) => {
  charsArray.forEach((char, charIndex) => {
    const guessedNode = document.getElementById(
      "row-" + currentRow + "-tile-" + charIndex
    );
    const guessedKey = document.getElementById(char);
    // console.log("guessedKey", guessedKey);
    // console.log("guessedNode", guessedNode);
    if (char == wordle[charIndex]) {
       setTimeout(() => {
         (guessedNode.style.animation = "0.5s linear flipping"),
           (guessedNode.style.backgroundColor = "#6AAA64");
       }, 500 * charIndex);
       guessedKey.style.backgroundColor = "#6AAA64";
    } else if (char != wordle[charIndex] && wordle.includes(char)) {
      setTimeout(() => {
        (guessedNode.style.animation = "0.5s linear flipping"),
          (guessedNode.style.backgroundColor = "#C9B458");
      }, 500 * charIndex);
      // guessedNode.style.backgroundColor = "#C9B458";
     
      guessedKey.style.backgroundColor = "#C9B458";
      // console.log("flip the node to yellow");
    } else {
      setTimeout(
        () => {
          guessedNode.style.animation = "0.5s linear flipping",  
          guessedNode.style.backgroundColor = "#797C7E" },
        500 * charIndex
      );
      guessedKey.style.backgroundColor = "#797C7E";
    }
  });
  currentRow++;
  currentTile = 0;
};

const checkGame = (lastGuess) => {
  if (lastGuess.join("") == wordle) {
    showMessages("You nailed it!!!");
  } else {
    gameOver = true;
    showMessages("Game over!!!");
  }
};
//addLetter()
//handlekeydown
//lay letter tu keydown bo vao guessRow(1-6)
//check neu no la meaning word(word dictionary api) thi so sanh guessword vs wordle
//doi mau o neu no co chua letter nao cua tu khoa
//check game
