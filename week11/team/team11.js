import { makeRequest } from './authHelpers.js';
import Auth from "./auth.js";

// makeRequest('login', 'POST', {
//    password: 'user1',
//    email: 'user1@email.com'
// });

const auth = new Auth();
//auth.login(() => console.log('calling loging from team11.js'));
window.onload = () => {
   document.querySelector('button').addEventListener('click', auth.login.bind(auth));

   const np = document.querySelector('#nameplate');
   np.style.position = 'absolute';
   np.style.top = '9em';
   np.style.left = '37vw';
   // np.style.color = 'hsla(180, 50%, 95%, .9)';
   // np.style.color = 'hsla(0, 0%, 9%, 0.99)';
   np.style["font-family"] = 'sans-serif';
   setInterval(toggleClass.bind(np), 1000);
   setInterval(changeHue, 100);
}

function toggleClass() {
   this.classList.toggle('fade');
   // console.log('fading');   
}

function changeHue() {
   let hsl_hue = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--hsl_accent'));
   hsl_hue++;
   
   document.documentElement.style.setProperty(`--hsl_accent`, `${hsl_hue}`);
   // console.info('toggleClass: hsl_hue', hsl_hue);
}