<input type="file" id="input" multiple/>

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
}




<form name="uploadForm">
<div>
  <input id="uploadInput" type="file" multiple>
  selected files: <output id="fileNum">0</output>;
  total size: <output id="fileSize">0</output>
</div>
<div><input type="submit" value="Send file"></div>
</form>

const uploadInput = document.getElementById("uploadInput");
uploadInput.addEventListener("change", () => {
  // Calculate total size
  let numberOfBytes = 0;
  for (const file of uploadInput.files) {
    numberOfBytes += file.size;
  }

  // Approximate to the closest prefixed unit
  const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  const exponent = Math.min(
    Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
    units.length - 1,
  );
  const approx = numberOfBytes / 1024 ** exponent;
  const output = exponent === 0 
    ? `${numberOfBytes} bytes` 
    : `${approx.toFixed(3)} ${units[exponent]} (${numberOfBytes} bytes)`;

  document.getElementById("fileNum").textContent = fileList.length;
  document.getElementById("fileSize").textContent = output;
}, false);


## Using hidden file input elements using the click() method
<input type="file" id="fileElem" multiple accept="image/*" style="display:none">
<button id="fileSelect">Select some files</button>
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");
fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click();
  }
}, false);



## Selecting files using drag and drop
let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}
function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}
function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith('image/')){ continue }

    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    const reader = new FileReader();
    reader.onload = (e) => { aImg.src = e.target.result; };
    reader.readAsDataURL(file);
  }





## Example: Using object URLs to display images
{/*
<input type="file" id="fileElem" multiple accept="image/*" style="display:none">
<a href="#" id="fileSelect">Select some files</a>
<div id="fileList">
  <p>No files selected!</p>
</div>
*/}
const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
  if (!this.files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    const list = document.createElement("ul");
    fileList.appendChild(list);
    for (let i = 0; i < this.files.length; i++) {
      const li = document.createElement("li");
      list.appendChild(li);

      const img = document.createElement("img");
      img.src = URL.createObjectURL(this.files[i]);
      img.height = 60;
      img.onload = () => {
        URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      const info = document.createElement("span");
      info.innerHTML = `${this.files[i].name}: ${this.files[i].size} bytes`;
      li.appendChild(info);
    }
  }
}













































