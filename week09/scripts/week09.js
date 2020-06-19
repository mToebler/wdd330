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
 
function transform(event) {
   let btn = event.target;
   btn.classList.add(btn.id);
   btn.textContent = 'reset'
   btn.removeEventListener('click', transform);
   btn.addEventListener('click', resetTransform);
}

function resetTransform(event) {
   let btn = event.target;
   btn.classList.remove(btn.id);
   btn.textContent = 'try';
   btn.removeEventListener('click', resetTransform);
   btn.addEventListener('click', transform);   
}