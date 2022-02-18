const tiles = document.querySelector('.tile-container');
// console.log("tiles", tiles)
const keyboard = document.querySelector('.keyboard-container');
// console.log("keyboard", keyboard);
//querySelector() returns the first Element within the document that matches the specified selector, or group of selectors.
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

keys.forEach(key => {
  const keyElement = document.createElement("button");
  keyElement.textContent = key;
  keyElement.setAttribute('id', key);
  keyElement.addEventListener("click", () => handleClick(key));
  keyboard.append(keyElement); //inserts a set of Node objects or DOMString objects after the last child of the document
})

const guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

guessRows.forEach((row, rowIndex) => {
let rowElement = document.createElement('div');
rowElement.setAttribute('id', 'row-' + rowIndex);

row.forEach((tile,tileIndex)=>{
    const tileElement = document.createElement('div');
    // tileElement.addEventListener('keydown', (e) => {
    //   console.log(e);
    // });
    tileElement.setAttribute('id', 'row-'+rowIndex+'-tile-'+tileIndex);
    rowElement.append(tileElement);
})
tiles.append(rowElement)
})


const handleClick = (letter) => {
  if (letter == "del") {
    deleteLetter(letter);
    console.log("guessRows", guessRows);
    return;
  } else if (letter == "ENTER") {
    checkGuessRow(guessRows[currentRow]);
    console.log("guessRows", guessRows);
    return;
  } else {
     console.log("press", letter);
     addLetter(letter);
  }
 
}
let currentRow = 0;
let currentTile = 0;
const addLetter = (letter) => {  
  if (currentRow < 5 && currentTile < 6) {
    const node = document.getElementById(
      "row-" + currentRow + "-tile-" + currentTile
    );
    node.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    node.setAttribute("data", letter);
    currentTile++;
    console.log("guessRows", guessRows);
  }
};

const deleteLetter = () => {
  currentTile--;
   const node = document.getElementById(
     "row-" + currentRow + "-tile-" + currentTile
   );
   node.textContent = '';
   guessRows[currentRow][currentTile] = '';//tai sao can set cai nay, no khong giong line 104 sao?
   node.setAttribute("data", "");//tai sao phai set data? sao khong that no hien len tren html file
}

const checkGuessRow = (currentRow) => {
  if (currentRow.length < 5) {
    console.log("Not enough word")
  } else {
    currentRow.forEach((char, charIndex) => {
      if(currentRow[charIndex] == wordle[charIndex]){
        console.log("flip the node to green")
      } else if (currentRow[charIndex] !== wordle[charIndex] && currentRow[charIndex].includes(wordle)) {
         console.log("flip the node to yellow")
      } else {
         console.log("flip the node to gray")
      }
    }
  }

}
//  getUserInput() {
//         rowElement.addEventListener("keydown", function (event) {
//             event.stopPropagation(); // stop bubbling out 
//             if (event.key === "Enter") {
//                 for (let i = 0; i < this.text.length; i++) {
//                     if (this.text[i] === userInput.value) {
//                         this.score += 1;
//                         setScore(this.score);
//                         this.text[i] = undefined; //remove in this.text
//                         userInput.value = '';
//                         this.draw();
//                     }
//                 }
//                 if (this.text.every(e => !e)) {
//                     this.nextLevel();
//                 }
//             }
//         }.bind(this));
//     };


//addLetter()
//handlekeydown
//lay letter tu keydown bo vao guessRow(1-6)
//check neu no la meaning word(word dictionary api) thi so sanh guessword vs wordle
//doi mau o neu no co chua letter nao cua tu khoa 
//check game 