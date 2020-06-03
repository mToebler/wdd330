const Hike = (function () {
   class Hike {

      constructor(indexId=0) {
         // cuz why just couple, when you can tightly couple?         
         this.name = (hikeList[indexId].name);
         this.imgSrc = (hikeList[indexId].imgSrc);
         this.imgAlt = (hikeList[indexId].imgAlt);
         this.distance = (hikeList[indexId].distance);
         this.difficulty = (hikeList[indexId].difficulty);
         this.description = (hikeList[indexId].description);
         this.directions = (hikeList[indexId].directions);
         this.id = indexId;
      }

      static imgBasePath() {
         return "//byui-cit.github.io/cit261/examples/";
      }

      render() {
         let outStr = '';
         const imgBasePath = Hike.imgBasePath();
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
       </div>`;
         return outStr;
      }

      renderDetail() {
         let outStr = '';
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
       </div>`;
         //<div class="image"><img src="${imgBasePath}${this.imgSrc}" alt="${this.imgAlt}"></div>
         return outStr;
      }

      static renderAll() {
         let divs = document.createElement('div');
         let i = 0;
         while(i < hikeList.length) {
            let hike = new Hike(i);
            let divHike = document.createElement('div');         
            divHike.innerHTML = hike.render();
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