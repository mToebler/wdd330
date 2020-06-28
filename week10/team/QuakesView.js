// view of mvc quake project
// takes information and display it in whatever format is needed.
// Quake View handler
export default class QuakesView {
   renderQuakeList(quakeList, listElement) {
      //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      listElement.innerHTML = quakeList.map(quake => {
         return `<li data-id="${quake.id}">${quake.properties.title}, ${new Date(quake.properties.time)}</li> `;
      })
         .join('');
      console.info('renderQuakeList:listElement:', listElement.innerHTML);
   }

   // detailed view
   renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      if(!element) {
         element = document.createElement('div');
         element.style.display = 'hidden';
      }
      // clear it out first
      element.innerHTML = '';
      // create the close button
      const closex = document.createElement('div');      
      closex.setAttribute('id', 'close');
      closex.innerHTML = ' &times; ';
      closex.classList.add('reveal_close');
      closex.classList.add('accent_2');
      closex.addEventListener('click', closeDetail);
      element.appendChild(closex);
      // detail title
      const detailH = document.createElement('h3');
      detailH.textContent = `${quake.properties.title}`;
      element.appendChild(detailH);
      
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      const detailList = document.createElement('ul');
      detailList.innerHTML = quakeProperties.map(prop => {     
         
         let tstr = `${prop}`.replace(/,/, ':</span>');
         tstr = '<span class="prop_name">' + tstr;
         return `<li>${tstr}</li>`;
      }).join('');
      console.log('view::renderQuake:detailList:', detailList);

      element.appendChild(detailList);
      element.classList.add('detail_display');
      // element.style.display = 'inline-block';
   }   
}

const closeDetail = () => {
   let detail = document.getElementById("detail");
   detail.classList.remove('detail_display');
   detail.innerHTML = '';   
   // detail.style.width = "0%";
   
};
// document.getElementById('close').addEventListener('click', closeDetail);

