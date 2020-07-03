import { getJSON, getLocation, getFormattedDate } from './utilities.js';
import QuakesController from './QuakesController.js';

let QC = null;
window.onload = () => {
   console.info('index.js::onload: loading...');
   const quakeList = document.querySelector('#quakeList');
   const parent = quakeList.parentElement;
   console.dir(quakeList);
   QC = new QuakesController(quakeList);
   QC.init();
   setupControl();
   //setupInfo();
};

function setupInfo() {
   let baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getFormattedDate('today', -15)}&endtime=${getFormattedDate('today', -1)}`;
   let lat = 0;
   let long = 0;
   let radius = 500;
   //confirm('index.js: Get Location data?') == true ? console.info(getLocation()) : console.info('get location rejected');
   //&latitude=36.1552401&longitude=-115.251735&maxradiuskm=100
   getLocation()
      .then(geo => {
         lat = geo.coords.latitude;
         long = geo.coords.longitude;
         console.info(lat, long);
         console.log(geo.coords.latitude, geo.coords.longitude);
         let urlAddon = `&latitude=${lat}&longitude=${long}&maxradiuskm=${radius}`;
         baseUrl += urlAddon;
         console.log('setupInfo::getLocation: final url is:', baseUrl);
         return baseUrl;
      })
      .then(url => getJSON(url))
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
      QC.init(event.target.value);
   } catch (e) {
      console.error(e);
   }
}