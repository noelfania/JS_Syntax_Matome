new Event(type, options)
// create a look event that bubbles up and cannot be canceled
const evt = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(evt);
// event can be dispatched from any element, not only the document
myDiv.dispatchEvent(evt);


function getEventType(event) {
    const log = document.getElementById('log');
    log.innerText = `${event.type}\n${log.innerText}`;
  }
  
  // Keyboard events
  document.addEventListener('keydown', getEventType, false);  // first
  document.addEventListener('keypress', getEventType, false); // second
  document.addEventListener('keyup', getEventType, false);    // third
  
  // Mouse events
  document.addEventListener('mousedown', getEventType, false); // first
  document.addEventListener('mouseup', getEventType, false);   // second
  document.addEventListener('click', getEventType, false);     // third

  // currentTarget 리스너가 붙어있는 타겟 여기선 body가 걸림
  document.body.addEventListener('click', function hide(e){
    e.currentTarget.style.visibility = 'hidden';
    console.log(e.currentTarget);
    // When this function is used as an event handler: this === e.currentTarget
  }, false);





// <div class="container">
//   <p>Please enter your name using lowercase letters only.</p>

//   <form>
//     <input type="text" id="my-textbox">
//   </form>
// </div>
// .warning {
//     border: 2px solid #f39389;
//     border-radius: 2px;
//     padding: 10px;
//     position: absolute;
//     background-color: #fbd8d4;
//     color: #3b3c40;
//   }
const myTextbox = document.getElementById('my-textbox');
myTextbox.addEventListener('keypress', checkName, false);
function checkName(evt) {
    const charCode = evt.charCode;
    if (charCode !== 0) {
      if (charCode < 97 || charCode > 122) {
        evt.preventDefault();
        displayWarning(
          "Please use lowercase letters only.\n" +
          `charCode: ${charCode}\n`
        );
      }
    }
  }
  let warningTimeout;
const warningBox = document.createElement("div");
warningBox.className = "warning";

function displayWarning(msg) {
  warningBox.innerHTML = msg;

  if (document.body.contains(warningBox)) {
    clearTimeout(warningTimeout);
  } else {
    // insert warningBox after myTextbox
    myTextbox.parentNode.insertBefore(warningBox, myTextbox.nextSibling);
  }

  warningTimeout = setTimeout(() => {
    warningBox.parentNode.removeChild(warningBox);
    warningTimeout = -1;
  }, 2000);
}