// using the test event on window to define a property object for passive scrolling 
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch (e) { console.log('swallow', e);}
// prevent window from scrolling when dragging.
function preventDefault(e) {
   e.preventDefault();
}

function log(msg) {
  var p = document.getElementById('log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}

function logs(...msgs) {
  const logD = document.querySelector('#logs');
  try {
    let d = document.createElement('div');
    for(msg = 0; msg < msgs.length; msg++) {      
      d.textContent += `${msgs[msg]} `;
      // logD.innerHTML += msgs[msg] + ' ';      
    }
    if(msgs.length > 0)
      logD.appendChild(d);
    console.log(...msgs);
  } catch(err) {
    console.error('week11.js logs:', err);
  }
}

function blinker() {
  document.querySelector('.blinking').classList.toggle('blink');
  // document.querySelector('.blinking');
  //.fadeIn(500);
}

const logMe = () => {
  logs('Testing testing', '1', '2', '3');
};


const loadExtras = () => {
  logger = document.querySelector('.btn_log');
  logger.addEventListener('click', logMe);
  // for vitual console.
  setInterval(blinker, 1000);

  console.log('Extras loaded.');
};