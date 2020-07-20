import { getFormattedDate, getLocation } from './utilities.js';
import { allowMultiTouch, allowMultiTouchSaved } from './index.js';
import News from './News.js';
import { NewsView } from './NewsView.js';

// controller for MVC quake project
// the glue between the model and view. Job is to 
//       1. request information from the model when needed, and
//       2. pass it on to the view to be displayed.

// News controller
export default class NewsController {
   constructor(parent, position = null) {
      this.parent = parent;
      // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
      this.parentElement = null;
      // let's give ourselves the option of using a location other than the current location by passing it in.
      this.position = position || {
         lat: 0,
         lon: 0
      };
      // this is how our controller will know about the model and view...we add them right into the class as members.
      this.news = new News();
      this.newsView = new NewsView();
      // adding this for detailed view:
      this.detailElement = null;
   }
   async init(radius = 75) {
      // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some news by calling this.getNewsByRadius()
      //this.parentElement = document.querySelector(this.parent);
      this.parentElement = document.querySelector(this.parent.nodeName);
      this.detailElement = document.querySelector('#detail');
      // not using position at this time
      //await this.initPos();
      //console.assert(this.position.lat !== 0, 'position is 0');
      await this.getNewsByRadius(radius);
      //this.getNewsByRadius(radius)      
      this.restoreSavedArtcles();

   }

   async initPos() {
      // if a position has not been set
      if(this.position.lat === 0) {
         try {
            // try to get the position using getLocation()
            await getLocation()
               .then(geo => {
                  // if we get the location back then set the latitude and longitude into this.position
                  this.position.lat = geo.coords.latitude;
                  this.position.lon = geo.coords.longitude;
               });
         } catch(error) {
            console.error(error);
         }
      }
   }

   async getNewsByRadius(radius = 100) {
      // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
      //set loading message
      this.parentElement.innerHTML = `
Loading...
`;
      // get the list of news in the specified radius of the location
      const storyList = await this.news.getEarthNewsByRadius(this.position, radius);
      // render the list to html
      this.newsView.renderNewsList(storyList, this.parentElement);
      this.newsView.selectSaved(this.news.getSaved());
      // remove any eventlisteners on parentElement set by this method
      this.parentElement.removeEventListener('touchend', e => {
         if(Object.keys(e.target.dataset).length > 0)
            this.getNewsDetails(e.target.dataset.id);
         else
            this.getNewsDetails(e.target.parentElement.dataset.id);
      });

      // add a listener to the new list of news to allow drill down in to the details
      this.parentElement.addEventListener('touchend', e => {
         if(Object.keys(e.target.dataset).length > 0)
            this.getNewsDetails(e.target.dataset.id);
         else
            this.getNewsDetails(e.target.parentElement.dataset.id);
      });

      // setup multitouch events
      allowMultiTouch();
      // this.parentElement.addEventListener('click', e => {
      //    this.getNewDetails(e.target.dataset.id);
      // });
   }
   
   async getNewsDetails(newsId) {
      // get the details for the newsId provided from the model, then send them to the view to be displayed
      const astory = await this.news.getNewsById(newsId);
      console.info('getNewsDetails: newsId:', newsId, astory);

      this.newsView.renderNews(astory, this.detailElement); 

   }


   saveNewsStory(newsId) {
      this.news.saveById(newsId);
      // delay
   }

   deleteNewsStory(newsId) {
      this.news.deleteById(newsId);
   }

   restoreSavedArtcles() {
      // let savedArray = this.news.getSaved();
      // this.newsView.renderSavedList(savedArray, this.parentElement);
      
      const openSaved = () => {
         const newsView = new NewsView()
         const news = new News();
         let savedArray = news.getSaved();
         newsView.renderSavedList(savedArray);
         const savedOverlay = document.getElementById("saved_overlay");
         savedOverlay.classList.add('saved_display');
         // document.getElementById()
         // putting this here as it wasn't firing in NewsView =(
         document.querySelector('#close_saved').addEventListener('click', () => {
            const savedList = document.getElementById("saved_overlay");
            savedList.classList.remove('saved_display');            
         });
         console.log('prepping for remove saved list');
         allowMultiTouchSaved();
      };
      // const cssvar_color_accent_1h = '#87d2f8';
      // document.getElementById('close_saved').addEventListener('click', closeSaved);
      document.getElementById('saved_open').addEventListener('click', openSaved);
      
   }
   
   

}
