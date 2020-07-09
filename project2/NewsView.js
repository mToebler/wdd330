// view of mvc news project
// takes information and display it in whatever format is needed.
// News View handler
export default class NewsView {
   renderNewsList(storyList, listElement) {
      //build a list of the news...include the title and time of each news then append the list to listElement. You should also add the id of the news record as a data- property to the li. ie. <li data-id="">
      listElement.innerHTML = storyList.map(news => {
         let liItem = `<li data-id="${news.id}"><div>${news.title}, ${new Date(news.published_date)}</div><div>`; //</div></li>`;
         if (news.media)
            if (news.media.length > 0)
               liItem += `<img src="${news.media[0]['media-metadata'][0].url}"></img>`
         liItem += `</div></li>`;
         return liItem;
      })
         .join('');
      // let's add some styling for images
      let lis = document.querySelectorAll('#storyList li');
      lis.forEach(l=>l.style.display = 'flex');
      console.info('renderNewsList:listElement:', listElement.innerHTML);
   }

   // detailed view
   renderNews(news, element) {
      const newsProperties = Object.entries(news);
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
      detailH.textContent = `${news.title}`;
      element.appendChild(detailH);
      
      // for the provided news make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      const detailList = document.createElement('ul');
      detailList.innerHTML = newsProperties.map(prop => {     
         
         let tstr = `${prop}`.replace(/,/, ':</span>');
         tstr = '<span class="prop_name">' + tstr;
         return `<li>${tstr}</li>`;
      }).join('');
      console.log('view::renderNews:detailList:', detailList);

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

