import { getJSON, getLocation, getFormattedDate } from './utilities.js';
// Model for MVC Quake
// responsible to handle all of the interactions with our data source
// Quake Model
export default class Quake {
   constructor() {
      this.baseUrl =
         `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getFormattedDate('today', -23)}&endtime=${getFormattedDate('today', -1)}`;
      // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
      this._quakes = [];

      this.lat = 0;
      this.long = 0;
      //confirm('index.js: Get Location data?') == true ? console.info(getLocation()) : console.info('get location rejected');
   }
   async getEarthQuakesByRadius(position, radius = 100) {
      // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it

      //return await getLocation()
         // .then(geo => {
         //    if (position)
         //       this.lat = geo.coords.latitude;
         //    this.long = geo.coords.longitude;
         //    console.info(this.lat, this.long);
         //    // console.log(geo.coords.latitude, geo.coords.longitude);
         //    let urlAddon = `&latitude=${this.lat}&longitude=${this.long}&maxradiuskm=100`;
         //    this.baseUrl += urlAddon;
         //    console.log('setupInfo::getLocation: final url is:', this.baseUrl);
         //    return this.baseUrl;
         // });
         let urlAddon = `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=100`;
         this.baseUrl += urlAddon;
         console.log('setupInfo::getLocation: final url is:', this.baseUrl);

         return getJSON(this.baseUrl)
         .then(res => {            
            let tempSet = new Set(res.features);
            // tempSet.add(res.features);
            console.log('!!!!!!!!!!', res.features);
            console.log('!!!!!!!!!!', tempSet);
            this._quakes = new Array(tempSet.size);
            this._quakes.push(...tempSet.values());
            // a little spreading...
            // this._quakes.push(...res.features)
            console.info('setupInfo::getJSON: results', res);
            this._quakes.forEach(quake => console.info(quake));
            //return this._quakes.features.filter(item => item.id === id)[0];
            // console.info(`Quake: nn....:${this.getQuakeById('nn00724973')}`);
            // console.info(this.getQuakeById('nn00724973'));
      
            // console.table(`\n_quakes: ${this._quakes}`);
            return this._quakes;
         })
         .catch(err => console.error('index.js:: error:', err));
   }
   getQuakeById(id) {
      // filter this._quakes for the record identified by id and return it
      //return this._quakes.features.filter(item => item.id === id)[0];      
      return this._quakes.filter(item => item.id === id)[0];
   }
}