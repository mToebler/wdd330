import { getJSON, getApiObj, getLocation, getFormattedDate } from './utilities.js';
import { nytUrlStr, storyUrl } from "./bin/bin.js";
// Model for MVC News
// responsible to handle all of the interactions with our data source
// News Model
export default class News {
   constructor() {
      this.baseUrl = nytUrlStr;
      //    `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getFormattedDate('today', -23)}&endtime=${getFormattedDate('today', -1)}`;
      // // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
      this._news = [];

      this.lat = 0;
      this.long = 0;
      //confirm('index.js: Get Location data?') == true ? console.info(getLocation()) : console.info('get location rejected');
   }
   // async getEarthNewsByRadius(position, radius = 100) {
   // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._news, then return it
   async getEarthNewsByRadius(position, radius = 100) {
      console.log('setupInfo::getEarthNewsByRadius: final url is:', this.baseUrl);

      return getJSON(this.baseUrl)
         .then(res => {
            // API returns an array of arrays
            let tempSet = new Set(res.results);
            // tempSet.add(res.features);
            console.log('!!!!!!!!!!', res.results);
            console.log('!!!!!!!!!!', tempSet);
            this._news = new Array(tempSet.size);
            this._news.push(...tempSet.values());
            // a little spreading...
            // this._news.push(...res.features)
            console.info('setupInfo::getApiObj: results', res);
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
      //let returnItem = this._news.filter(item => item.id === intId)[0];
      //console.log("getNewsById: _news:", this._news, "\nitem:", returnItem);
      let article = this._news.filter(item => item.id === intId)[0];
      // need to get the article text:

      return getJSON(storyUrl + article.url)
         .then(res => {
            console.info('getNewsById::getJSON: results', res);
            // let storyRes = res.text;
            // //let tempSet = new Set(res.results);
            // // tempSet.add(res.features);
            // console.log('!!!!!!!!!!', storyRes);
            article.text = res.text;

            //console.log('!!!!!!!!!!', tempSet);
            console.log('!!!!!!!!!! Article:', article);

            //this._news = new Array(tempSet.size);
            //this._news.push(...tempSet.values());
            // a little spreading...
            // this._news.push(...res.features)

            //this._news.forEach(story => console.info(story));
            //return this._news.features.filter(item => item.id === id)[0];
            // console.info(`News: nn....:${this.getNewsById('nn00724973')}`);
            // console.info(this.getNewsById('nn00724973'));

            console.table(`\narticle: ${article}`);
            return article;
         })
         .catch(err => console.error('index.js::getNewsById error:', err));

   }

   // making this static to call without instantiation
   // sharing storage with several other apps. Clarifying key with news_
   // only saving ID, URL, and Title
   saveById(newsId) {
      //localStorage.setItem(this.getId(), JSON.stringify(this));
      const intId = parseInt(newsId);
      //let returnItem = this._news.filter(item => item.id === intId)[0];
      //console.log("getNewsById: _news:", this._news, "\nitem:", returnItem);
      let article = this._news.filter(item => item.id === intId)[0];
      let saveMe = {
         name: 'news',
         id: article.id,
         title: article.title,
         url: article.url
      };
      localStorage.setItem('news_' + saveMe.id, JSON.stringify(saveMe));
   }

   getSaved() {
      // setup return value
      let savedArray = [];
      let keys = Object.keys(localStorage);
      let i = keys.length;
      console.log('News.getAll: getting saved articles from ', i, 'entries.');
      while (i--) {
         // a lot nested here. using the key, get the ToDo, push on array
         // console.log('Todo.getAll: getting key', keys[i]);
         let obj = localStorage.getItem(keys[i]);
         obj = JSON.parse(obj);
         if (obj.name === 'news') {
            savedArray.push(obj);
            console.log('News.getSaved: retreiving: ' + obj);
         }
         //savedArray.push(new Todo(obj.content, obj.isComplete, obj.id));
      }
      return savedArray;
   }

   static deleteById(nesId) {

   }

   static restoreById(newsId) {

   }

}