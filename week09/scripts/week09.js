week08Load = () => {
   let btn_list = document.querySelectorAll('.btn');
   btn_list.forEach(element => {
      element.addEventListener('click', transform);
   });

   // drag and drop
   let box = document.getElementById('drag_box');
  
   // using the test event on window to define a property below
   let dragOpt = supportsPassive ? { passive: false } : false;

   /* listen to the touchMove event,
   every time it fires, grab the location
   of touch and assign it to box */
   box.addEventListener('touchmove', (e) => {
      // grab the location of touch
      var touchLocation = e.targetTouches[0];
      // need to preventDefault touch move scrolling behavior. Not easy. keeps throwing errors.
      window.addEventListener('touchmove', preventDefault, dragOpt); 
      // assign box new coordinates based on the touch.
      box.style.left = touchLocation.pageX + 'px';
      box.style.top = touchLocation.pageY + 'px';
   });
  
   /* record the position of the touch
   when released using touchend event.
   This will be the drop position. */
  
   box.addEventListener('touchend', (e) => {
      // current box position.
      var x = parseInt(box.style.left);
      var y = parseInt(box.style.top);
      // and remove preventDefault
      window.removeEventListener('touchmove', preventDefault, dragOpt); 
   });

   if (isMobile()) {
      let ele = document.querySelector('#drag_warning');
      ele.classList.add('hidden');     
   }
};

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