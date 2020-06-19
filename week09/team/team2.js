window.onload = () => {

   let keys = document.querySelectorAll('.key');
   keys.forEach(key => {
      console.log('adding transitioned listener to:', key);
      key.addEventListener('transitionend', removeTransitionState);
   })

   // touchstart isn't an interactive event that allows sound play.
   window.addEventListener('touchend', (e) => playKey(e));
   console.log('loaded');

};

function playKey(event) {
   if(event instanceof TouchEvent) {
      console.log('youve been played:', event);
      console.log(event.keyCode);
      let sound = null;
      let key = null;
      try {
         sound = document.querySelector(`audio[data-key="${event.target.parentElement.dataset.key}"]`);
         key = document.querySelector(`div[data-key="${event.target.parentElement.dataset.key}"]`);
                                                            // targetTouches[0].target.parentElement.dataset.key
                                                            // target.parentElement.dataset.key
      } catch (err) {
         console.log('team2:playKey: swallowing expection:', err);
      }
      console.log('playKey: sound & key:', sound,              key);
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
               key.classList.remove('playing');
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




