## NodeList.entries()

const node = document.createElement("div");
const kid1 = document.createElement("p");
const kid2 = document.createTextNode("hey");
const kid3 = document.createElement("span");
node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);
const list = node.childNodes;
// Using for..of
for (const entry of list.entries()) {
  console.log(entry);
}
// Array [ 0, <p> ]
// Array [ 1, #text "hey" ]
// Array [ 2, <span> ]



## someNodeList.forEach(callback, ?thisArg);
const node = document.createElement("div");
const kid1 = document.createElement("p");
const kid2 = document.createTextNode("hey");
const kid3 = document.createElement("span");
node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);
const list = node.childNodes;
list.forEach(
  function (currentValue, currentIndex, listObj) {
    console.log(`${currentValue}, ${currentIndex}, ${this}`);
  },
  'myThisArg'
);
// [object HTMLParagraphElement], 0, myThisArg
// [object Text], 1, myThisArg
// [object HTMLSpanElement], 2, myThisArg



## nodeList.item(index)
const tables = document.getElementsByTagName("table");
const firstTable = tables.item(1); // or tables[1] - returns the second table in the DOM




## nodeList.keys();
const node = document.createElement("div");
const kid1 = document.createElement("p");
const kid2 = document.createTextNode("hey");
const kid3 = document.createElement("span");
node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);
let list = node.childNodes;
// Using for..of
for (const key of list.keys()) {
   console.log(key);
}
// 0
// 1
// 2



## nodeList.values();
const node = document.createElement("div");
const kid1 = document.createElement("p");
const kid2 = document.createTextNode("hey");
const kid3 = document.createElement("span");
node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);
const list = node.childNodes;
// Using for..of
for (const value of list.values()) {
  console.log(value);
}
// <p>
// #text "hey"
// <span>
















