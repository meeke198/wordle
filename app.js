const tiles = document.querySelector('.tile-container');
const keyboard = document.querySelector('.keyboard-container');
//querySelector() returns the first Element within the document that matches the specified selector, or group of selectors.
const keys = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "ENTER",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  ">>",
];

keys.forEach(key => {
  const keyElement = document.createElement("key");
  keyElement.textContent = key;
  keyElement.setAttribute('id', key);
  keyboard.append(keyElement); //inserts a set of Node objects or DOMString objects after the last child of the document
})