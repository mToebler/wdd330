window.onload = () => {

   let keys = document.querySelectorAll('.key');
   keys.forEach(key => {
      console.log('adding transitioned listener to:', key);
      key.addEventListener('transitionend', removeTransitionState);
   })

   window.addEventListener('keydown', (e) => playKey(e));
   console.log('loaded');

};

function playKey(event) {
   if(event instanceof KeyboardEvent) {
      console.log('youve been played:', event);
      console.log(event.keyCode);
      let sound = document.querySelector(`audio[data-key="${event.keyCode}"]`);
      let key = document.querySelector(`div[data-key="${event.keyCode}"]`);
      let testSound = document.querySelector('audio[data-key="65"]');
      if(sound) {
         console.dir(sound);
         console.log('playing:', sound, '\nkey:', key);
         sound.currentTime = 0;
         sound.play();
         key.classList.add('playing');

         let topStr = key.style.marginTop;
         if(!topStr) {
            topStr = "20px";
         } else {
            let topInt = parseInt(topStr.slice(0, topStr.indexOf('px')));
            if(topInt > 100) {
               topStr = "10px";
            } else {
               topInt += 10;
               topStr = topInt + "px";
            }
         }
         key.style.marginTop = topStr;
      } else
         console.log('not playing sound for:', event.key);
   }
}

function removeTransitionState(event) {
   // console.log('removeTransitionState:', event, '\nthis:', this);
   if (event.propertyName === 'transform') 
      event.target.classList.remove('playing');
 }




