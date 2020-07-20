// getJSON : fetches a url.
export function getJSON(url = '') {
   if(url) {
      return fetch(url)
         .then(res => {
            if(!res.ok) {
               throw Error(res.statusText);
            } else {
               return res.json();
            }
         }).catch(err => {
            console.error('utilities.js:: getJSON: Error:', err);
         });
   } else {
      return Error('utilities.js::getJSON: Invalid URL', url);
   }
}

export function getApiObj(url = '') {
   if(url) {
      return fetch(url)
         .then(res => {
            if(!res.ok) {
               throw Error(res.statusText);
            } else {
               console.info('utilities::getApiObj: res is ', res);
               console.info('utilities::getApiObj: res is of type Array? ', res.isinstanceof(Array) );
               return res.json();
            }
         }).catch(err => {
            console.error('utilities.js:: getJSON: Error:', err);
         });
   } else {
      return Error('utilities.js::getJSON: Invalid URL', url);
   }
}

// wrapping all this up in a closure
export const getLocation = (options = null) => {
   if(!options) {
      options = {
         enableHighAccuracy: true,
         timeout: 5000,
         maximumAge: 0
      };
   }
 
   const success = (pos) => {
      let crd = pos.coords;
 
      console.info('Your current position is:');
      console.info(`Latitude : ${crd.latitude}`);
      console.info(`Longitude: ${crd.longitude}`);
      console.info(`More or less ${crd.accuracy} meters.`);
      return pos;
   };
 
   const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
   };
 
   return new Promise((success, error) => {
      navigator.geolocation.getCurrentPosition(success, error, options);
   });
};

// returns date in string in format 'YYYY-MM-DD'
// 2 days from today: getFormattedDate(today, 2)
// 7 days before today: getFormattedDate(today, -7)
export function getFormattedDate(period = 'today', fromToday = 0) {
   let day = null;
   const MS = 86400000;
   switch(period) {
      case ('today'):
         day = new Date(Date.now() + (fromToday * MS));
         break;
      case ('yesterday'):
         day = new Date(Date.now() - (MS * 1) + (fromToday * MS));
         break;
      case ('tomorrow'):
            day = new Date(Date.now() + (MS * 1) + (fromToday * MS));
            break;
      default:
         console.warn('index.js::getFormattedDate: unknown period:', period);
         day = new Date(0);
         break;
   }
   
   return `${day.getUTCFullYear()}-${day.getMonth().toLocaleString().length > 1 ? day.getMonth().toLocaleString() : '0' + day.getMonth().toLocaleString()}-${day.getDate().toLocaleString().length > 1 ? day.getDate().toLocaleString() : '0' + day.getDate().toLocaleString()}`;
}

// currently not using this.
function getHTML(url) {
   if(url) {
      return fetch(url)
         .then(res => {
            console.log("getHTML: result:", res);
            if(!res.ok) {
               throw Error(res.statusText);
            } else {
               return res;
            }
         }).catch(err => {
            console.error('utilities.js:: getHTML: Error:', err);
         });
   } else {
      return Error('utilities.js::getHTML: Invalid URL', url);
   }
}


//testing 
//console.log(getHTML("https://www.nytimes.com/2020/07/07/arts/harpers-letter.html?Content-Type=text/plain"));

//console.log(getHTML("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02"));

//console.log(getHTML("https://cs313-rrtnt.herokuapp.com/sentiment?nurl=https://www.nytimes.com/2020/07/17/nyregion/fahim-saleh-suspect-tyrese-devon-haspil.html"));