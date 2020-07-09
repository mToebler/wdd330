import { getJSON, getLocation, getFormattedDate } from './utilities.js';
import {  urlStr } from "./bin/bin.js";
// Model for MVC News
// responsible to handle all of the interactions with our data source
// News Model
export default class News {
   constructor() {
      this.baseUrl = urlStr;
      //    `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getFormattedDate('today', -23)}&endtime=${getFormattedDate('today', -1)}`;
      // // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
      this._news = [];

      this.lat = 0;
      this.long = 0;
      //confirm('index.js: Get Location data?') == true ? console.info(getLocation()) : console.info('get location rejected');
   }
   // async getEarthNewsByRadius(position, radius = 100) {
      // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._news, then return it

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
   async getEarthNewsByRadius(position, radius = 100) {
         // let urlAddon = `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
         // this.baseUrl += urlAddon;
         console.log('setupInfo::getEarthNewsByRadius: final url is:', this.baseUrl);

         return getJSON(this.baseUrl)
         .then(res => {            
            let tempSet = new Set(res.results);
            // tempSet.add(res.features);
            console.log('!!!!!!!!!!', res.results);
            console.log('!!!!!!!!!!', tempSet);
            this._news = new Array(tempSet.size);
            this._news.push(...tempSet.values());
            // a little spreading...
            // this._news.push(...res.features)
            console.info('setupInfo::getJSON: results', res);
            this._news.forEach(story => console.info(story));
            //return this._news.features.filter(item => item.id === id)[0];
            // console.info(`News: nn....:${this.getNewsById('nn00724973')}`);
            // console.info(this.getNewsById('nn00724973'));
      
            // console.table(`\n_news: ${this._news}`);
            return this._news;
         })
         .catch(err => console.error('index.js:: error:', err));
   }
   getNewsById(id) {
      // filter this._news for the record identified by id and return it
      //return this._news.features.filter(item => item.id === id)[0];      
      const intId = parseInt(id);
      let returnItem = this._news.filter(item => item.id === intId)[0];
      console.log("getNewsById: _news:", this._news, "\nitem:", returnItem);
      return this._news.filter(item => item.id === intId)[0];
   }
}