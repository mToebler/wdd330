///////////////////////////// THIS IS WEEK 7 //////////////////////////////////
const Hike = (function () {
   class Hike {

      constructor(indexId = 0) {
         // cuz why just couple, when you can tightly couple?         
         this.name = (hikeList[indexId].name);
         this.imgSrc = (hikeList[indexId].imgSrc);
         this.imgAlt = (hikeList[indexId].imgAlt);
         this.distance = (hikeList[indexId].distance);
         this.difficulty = (hikeList[indexId].difficulty);
         this.description = (hikeList[indexId].description);
         this.directions = (hikeList[indexId].directions);
         this.id = indexId; //(hikeList[indexId].id); this is messed up.
         this.comments = [];
      }

      static imgBasePath() {
         return "//byui-cit.github.io/cit261/examples/";
      }

      render(commentsMap) {
         let outStr = '';
         const imgBasePath = Hike.imgBasePath();
         let commentsCount = 0;
         if(commentsMap) {            
            console.log('hike.render: this:', this, commentsMap.get(this.id));
            if(this.id !== undefined || this.id !== null)
               try {
                  commentsCount = commentsMap.get(this.id).length;
                  this.comments = commentsMap.get(this.id);
               } catch(e) {
                  console.info('hike::render: error swallowed', e);
                  commentsCount = 0;
                  this.comments = [];
               }
         }
            
         outStr += `<h3 id="${this.id}" data-id="${this.id}">${this.name}</h3>
       <div class="image"><img src="${imgBasePath}${this.imgSrc}" alt="${this.imgAlt}"></div>
       <div class="grid_text">
               <div>
                   <h4>Distance</h4>
                   <p>${this.distance}</p>
               </div>
               <div>
                   <h4>Difficulty</h4>
                   <p>${this.difficulty}</p>
               </div>
               <div>
                   <h4>Comments</h4>
                   <p>${commentsCount}</p>
               </div>
       </div>`;
         return outStr;
      }

      renderDetail() {
         let outStr = '';
         let commentOutStr = '';
         if(this.comments)
            commentOutStr = this.renderComments();
            commentOutStr = commentOutStr === '' ? 'None' : commentOutStr;
         const imgBasePath = Hike.imgBasePath();
         outStr += `<h3 id="${this.id}" data-id="${this.id}">${this.name}</h3>
       <div class="grid_text">
               <div>
                   <h4>Distance</h4>
                   <p>${this.distance}</p>
               </div>
               <div>
                   <h4>Difficulty</h4>
                   <p>${this.difficulty}</p>
               </div>
               <div>
               <h4>Description</h4>
               <p>${this.description}</p>
           </div>
           <div>
               <h4>Directions</h4>
               <p>${this.directions}</p>
           </div>
           <div>
               <h4>Comments</h4>
               <p>${commentOutStr}</p>
               <div>
               <textarea id="addCommentTxt" rows=2 cols=20 data-id="${this.id}"></textarea><br>
               <button id="addCommentBtn">Add Comment</button>
               </div>
           </div>

       </div>`;
         //<div class="image"><img src="${imgBasePath}${this.imgSrc}" alt="${this.imgAlt}"></div>
         return outStr;
      }

      renderComments() {
         //this should ofcourse be in it's own comment class. Although hike may render comments differently.
         let str = '';
         this.comments.forEach(comment => { str += `<div>${comment.content}</div>`; })
         console.log('hike::renderComments: returning:', str);
         return str;
      }

      static renderAll(commentsMap = null) {
         let divs = document.createElement('div');
         let i = 0;
         while(i < hikeList.length) {
            let hike = new Hike(i);
            let divHike = document.createElement('div');
            divHike.innerHTML = hike.render(commentsMap);
            divHike.classList.add('grid_box');
            divs.appendChild(divHike);
            i++;
         }
         return divs;
      }

   }

   //create an array of hikes
   const hikeList = [
      {
         id: 0,
         name: "Bechler Falls",
         imgSrc: "falls.jpg",
         imgAlt: "Image of Bechler Falls",
         distance: "3 miles",
         difficulty: "Easy",
         description:
            "Beautiful short hike along the Bechler river to Bechler Falls",
         directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
      },
      {
         id: 1,
         name: "Teton Canyon",
         imgSrc: "falls.jpg",
         imgAlt: "Image of Bechler Falls",
         distance: "3 miles",
         difficulty: "Easy",
         description: "Beautiful short (or long) hike through Teton Canyon.",
         directions:
            "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
      },
      {
         id: 2,
         name: "Denanda Falls",
         imgSrc: "falls.jpg",
         imgAlt: "Image of Bechler Falls",
         distance: "7 miles",
         difficulty: "Moderate",
         description:
            "Beautiful hike through Bechler meadows river to Denanda Falls",
         directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
      }
   ];
   return Hike;
}());

export default Hike;