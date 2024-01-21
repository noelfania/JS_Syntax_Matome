// <div class="source" contenteditable="true">Copy text from this box.</div>
// <div class="target" contenteditable="true">And paste it into this one.</div>
target = document.querySelector('div.target');
target.addEventListener('paste', (event) => {
    event.preventDefault();

    let paste = (event.clipboardData || window.clipboardData).getData('text');
    paste = paste.toUpperCase();
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
});
// element clipboard event
window.addEventListener('copy', (event) => { console.log('copy action initiated')});
window.addEventListener('cut', (event) => { console.log('cut action initiated')});


window.addEventListener("resize", resizeListener);
window.innerHeight // document size
window.innerWidth  // document size
window.outerHeight // include browser size
window.outerWidth  // include browser size
window.scrollX;    // window.pageXOffset scrollbar position
window.scrollY;    // window.pageYOffset scrollbar position

window.addEventListener('blur', pause);
window.addEventListener('focus', play);

window.addEventListener('offline', (event) => { console.log("The network connection has been lost.");});
window.addEventListener('online', (event) => { console.log("You are now connected to the network."); });

// 다른 ASSET말고 DOM만 로드 된거 감지
window.addEventListener('DOMContentLoaded', (event) => { console.log('DOM fully loaded and parsed');});

// 모든 재료가 로드되길 기다림
//load, should be used only to detect a fully-loaded page
window.addEventListener('load', (event) => { console.log('page is fully loaded'); });


// unload이벤트쓰지말기

// fired when the active history entry changes while the user navigates the session history
window.addEventListener('popstate', (event) => {
  console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
});

window.addEventListener('hashchange', () => { console.log('The hash has changed!') }, false);


// <div id="example"></div>
// <div id="controls"></div>
//
//   div#example {
//     width: 400px;
//     height: 200px;
//     padding: 20px;
//     margin: 50px auto;
//     background: purple;
//   }
//   body { padding-bottom: 1000px; }
//   p { margin: 0; }
document.addEventListener('scroll', function (){
  const container = document.getElementById("controls");
  const elem = document.getElementById("example");
  const rect = elem.getBoundingClientRect();
  container.innerHTML = '';
  for (const key in rect) {
    if (typeof rect[key] !== 'function') {
      let para = document.createElement('p');
      para.textContent  = `${key} : ${rect[key]}`;
      container.appendChild(para);
    }
  }
});




window.open(url, target, windowFeatures)
target = ['_self', '_blank',]
openedWindow = window.open('moreinfo.htm');
openedWindow.close();

// confirm
if (window.confirm("Do you really want to leave?")) {
    console.log(oK)
}

// prompt
sign = window.prompt("What's your sign?");
if (sign.toLowerCase() === "scorpio") {
  window.alert("Wow! I'm a Scorpio too!");
}

// absolute move
window.scroll(100, 100) // window.scrollTo
window.scroll({
    top: 100,
    left: 100,
    behavior: 'smooth'
  });

// relative move
window.scrollBy
window.scrollBy(0, window.innerHeight);
window.scrollBy(0, -window.innerHeight);
window.scrollBy({
    top: 100,
    left: 100,
    behavior: 'smooth'
  });

// this method cannot interrupt its parent document's loading,
// but it will stop its images, new windows, and other still-loading objects.
window.stop();



window.getComputedStyle(element, ?pseudoElt)
// returns an object containing the values of all CSS properties of an element,
// after applying active stylesheets and resolving any basic computation those values may contain.
// A live CSSStyleDeclaration object, which updates automatically when the element's styles are changed.

//  p {
//     width: 400px;
//     margin: 0 auto;
//     padding: 20px;
//     font: 2rem/2 sans-serif;
//     text-align: center;
//     background: purple;
//     color: white;
//  }
const para = document.querySelector('p');
const compStyles = window.getComputedStyle(para);
para.textContent = 
`computed font-size   is ${compStyles.getPropertyValue('font-size')},\n` +
`computed line-height is ${compStyles.getPropertyValue('line-height')}.`;

// h3::after {
//     content: ' rocks!';
// }
const h3 = document.querySelector('h3');
const result = getComputedStyle(h3, ':after').content;
console.log('the generated content is: ', result); // returns ' rocks!'




//
window.getSelection()
// Return A Selection object.
window.getSelection().toString()
window.getSelection().getRangeAt(0)//Return Range






Range.selectNodeContents(referenceNode) // 선택하기
// <p id="p">
//   <strong>Use the buttons below</strong> to select or deselect the contents of
//   this paragraph.
// </p>
// <button id="select-button">Select paragraph</button>
// <button id="deselect-button">Deselect paragraph</button>
p = document.getElementById("p");
selectButton = document.getElementById("select-button");
deselectButton = document.getElementById("deselect-button");
selectButton.addEventListener("click", (e) => {
  // Clear any current selection
  const selection = window.getSelection();
  selection.removeAllRanges();

  // Select paragraph
  const range = document.createRange();
  range.selectNodeContents(p);
  selection.addRange(range);
});
deselectButton.addEventListener("click", (e) => {
  const selection = window.getSelection();
  selection.removeAllRanges();
});


Range.surroundContents(newParent) // div 감싸기
range = document.createRange();
newParent = document.createElement('h1');
range.selectNode(document.querySelector('.header-text'));
range.surroundContents(newParent);




//셀렉
Range.setStart(startNode, startOffset)
// <p id="address">Wyatt Earp<br>
// 101 E. Main St.<br>
// Dodge City, KS<br>
// 67801<br>
// USA</p>
// <hr>
// <p>Nodes in the original address:</p>
// <ol id="log"></ol>
address = document.getElementById('address');
log = document.getElementById('log');
// Log info
address.childNodes.forEach((node) => {
  const li = document.createElement('li');
  li.textContent = `${node.nodeName}, ${node.nodeValue}`;
  log.appendChild(li);
});
// Highlight the street and city
startOffset = 2;  // Start at third node: 101 E. Main St.
endOffset = 5;    // End at fifth node: Dodge City, KS
range = document.createRange();
range.setStart(address, startOffset);
range.setEnd(address, endOffset);
const mark = document.createElement('mark');
range.surroundContents(mark);





// Range.getBoundingClientRect()
// <div id="highlight"></div>
// <p>This example positions a "highlight" rectangle behind the contents of a range. The range's content
// <em>starts here</em>      and continues on until it <em>ends here</em>. 
// The bounding client rectangle contains everything selected in the range.</p>
//
//  #highlight {
//     background: yellow;
//     position: absolute;
//     z-index: -1;
//   }
//   p {
//     width: 200px;
//   }
range = document.createRange();
range.setStartBefore(document.getElementsByTagName('em').item(0));
range.setEndAfter(document.getElementsByTagName('em').item(1));
const clientRect = range.getBoundingClientRect();
const highlight = document.getElementById('highlight');
highlight.style.left = `${clientRect.x}px`;
highlight.style.top = `${clientRect.y}px`;
highlight.style.width = `${clientRect.width}px`;
highlight.style.height = `${clientRect.height}px`;




