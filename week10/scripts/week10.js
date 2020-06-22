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
