import { getJSON, getLocation, getFormattedDate } from './utilities.js';
import NewsController from './NewsController.js';
import { nytapi, nytUrlStr } from './bin/bin.js';

let NC = null;
window.onload = () => {
   console.info('index.js::onload: loading...');
   const storyList = document.querySelector('#storyList');
   const parent = storyList.parentElement;
   console.dir(storyList);
   NC = new NewsController(storyList);
   NC.init();
   
   // setupControl();
   //setupInfo();
};

function setupInfo() {
   //let baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getFormattedDate('today', -15)}&endtime=${getFormattedDate('today', -1)}`;
   let baseUrl = nytUrlStr;
   let lat = 0;
   let long = 0;
   let radius = 500;
   //confirm('index.js: Get Location data?') == true ? console.info(getLocation()) : console.info('get location rejected');
   //&latitude=36.1552401&longitude=-115.251735&maxradiuskm=100
   // getLocation()
   //    .then(geo => {
   //       lat = geo.coords.latitude;
   //       long = geo.coords.longitude;
   //       console.info(lat, long);
   //       console.log(geo.coords.latitude, geo.coords.longitude);
   //       let urlAddon = `&latitude=${lat}&longitude=${long}&maxradiuskm=${radius}`;
   //       baseUrl += urlAddon;
   //       console.log('setupInfo::getLocation: final url is:', baseUrl);
   //       return baseUrl;
   //    })
      getJSON(baseUrl)
      .then(res => console.info('setupInfo::getJSON: results', res))
      .catch(err => console.error('index.js:: error:', err));


   //let baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getFormattedDate('today', -10)}&endtime=${getFormattedDate('today')}`;
   console.log(baseUrl);
   //console.info(getJSON(baseUrl));
}

function setupControl() {
   const controls = document.querySelector('#controls');
   const rangeControl = document.createElement('input');
   rangeControl.setAttribute('type', 'range');
   rangeControl.setAttribute('min', 75);
   rangeControl.setAttribute('max', 350);
   controls.appendChild(rangeControl);
   document.addEventListener('change', updateRange);
}

function updateRange(event) {
   const rangeValue = document.querySelector('#rangeValue');
   try {
      rangeValue.textContent = event.target.value + ' KM';
      NC.init(event.target.value);
   } catch (e) {
      console.error(e);
   }
}

function getTest(data) {
   console.log("getTest... data:",data);
}

// allows quick and long touch events for newsList
export function allowMultiTouch() {
   // variable holds setTimeoutID.
   let delay;
   // f
   const checkSelected = (e) => {
      const _this = e.target;
      delay = setTimeout(check, longpress);
      console.log('index::allowMultiTouch:checkSelected: timer started:', delay, '\ne is:', e);
 
      function check() {
         try {
            _this.parentElement.classList.toggle('is-selected');
            // save to localstorage!
            console.log('index::allowMultiTouch::check: saving story of ', _this);
            NC.saveNewsStory(_this.parentElement.dataset.id)
            console.log(`index::allowMultiTouch::check: story id ${_this.parentElement.dataset.id} saved.`)
         } catch (err) {
            console.error(`Index.js::allowMultiTouch::check:Error`, err );
         }
         
      }
   };
   const clearTimer = (e) => {
      // On mouse up, we know it is no longer a longpress
      clearTimeout(delay);
      console.log('index::allowMultiTouch:clearTimer: clearing', delay);
   };
  
   // Set number of milliseconds for longpress
   const longpress = 1000;
   const listItems = document.querySelector('#storyList').children;
   let listItem;
   console.log(`index::allowMultiTouch: listItems length: ${listItems.length}`);
   for (let i = 0, j = listItems.length; i < j; i++) {
      listItem = listItems[i];
  
      // bewarey of this problem!
      listItem.addEventListener('touchstart', checkSelected, true);
  
      // clear the setTimeout
      listItem.addEventListener('touchend', clearTimer);

      listItem.addEventListener('touchmove', clearTimer);
  
   }
}



// let script = document.createElement('script');
// script.src = `https://www.nytimes.com/2020/07/07/arts/harpers-letter.html?callback=getTest`;
// console.log(script);
// document.body.append(script);

//https://cs313-rrtnt.herokuapp.com/sentiment?nurl=https://www.nytimes.com/2020/07/17/nyregion/fahim-saleh-suspect-tyrese-devon-haspil.html