// view of mvc news project
// takes information and display it in whatever format is needed.
// News View handler
//export default class NewsView {
class NewsView {
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
      lis.forEach(l => l.style.display = 'flex');
      console.info('renderNewsList:listElement:', listElement.innerHTML);
   }

   selectSaved(savedArray) {
      savedArray.forEach(saved => {
         let renderedStory = document.querySelector(`li[data-id="${saved.id}"]`);
         if (renderedStory)
            renderedStory.classList.add('is-selected');
         
      });
      // document.querySelector(`li[data-id="${saved.id}"]`);
   }

   // detailed view
   renderNews(news, element) {
      const newsProperties = Object.entries(news);
      if (!element) {
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
      const detailByline = document.createElement('div');
      detailByline.setAttribute('id', 'byLine');
      detailByline.textContent = `\n${news.byline}    \n${news.published_date}`;
      detailByline.classList.add("prop_name");
      element.appendChild(detailByline);
      const detailText = document.createElement('div');
      detailText.setAttribute('id', 'articleText');
      detailText.innerHTML = `${news.text} <br><span class="detail_refer">Read the entire article at: </span> <a href="${news.url}" target="_blank">${news.source}</a>`;
      // adding detailText below media pic.
      console.log('NewsView::renderNews: media object', news.media);
      if (news.media !== null || news.media !== undefined)
         if (news.media[0]["media-metadata"].length > 0) {
            const mediaImg = document.createElement('img');
            mediaImg.setAttribute('src', news.media[0]["media-metadata"][1].url);
            mediaImg.setAttribute('width', news.media[0]["media-metadata"][1].width);
            element.appendChild(mediaImg);
         }
      element.appendChild(detailText);

      // element.appendChild(detailList);
      element.classList.add('detail_display');
      // element.style.display = 'inline-block';
   }

   // build and display saved list
   renderSavedList(savedArray) {
      
      // this isn't working here
      const closeSaved = () => {
         const savedList = document.getElementById("saved_overlay");
         savedList.classList.remove('saved_display');
         console.warn('closeSaved Fired!');
      };
      

      //build a list of the news...include the title and time of each news then append the list to element. You should also add the id of the news record as a data- property to the li. ie. <li data-id="">
      const savedElement = document.querySelector('#saved');
      savedElement.innerHTML = '';
      const closex = document.createElement('div');
      closex.setAttribute('id', 'close_saved');
      closex.innerHTML = ' &times; ';
      closex.classList.add('reveal_close');
      closex.classList.add('accent_1hd_text');
      //this.does nothing.
      closex.addEventListener('touchend', closeSaved);
      savedElement.appendChild(closex);
      if (savedArray.length > 0) {
         savedElement.innerHTML += savedArray.map(news => {
            let liItem = `<li data-id="${news.id}"><div><a href="${news.url}">${news.title}</a></div></li>`;
            return liItem;
         }).join('');
         savedElement.innerHTML += `<br><span style="color:var(--color_text)">Long-press saved title to delete<span><br>Clicking saved story visits NYT source.`;
      } else {
         savedElement.innerHTML += `<br><span style="color:var(--color_text)">No Saved Articles<br>Long-press article title to save<span>`;
      }
      // let's add some styling for images      


   }
}

const closeDetail = () => {
   let detail = document.getElementById("detail");
   detail.classList.remove('detail_display');
   detail.innerHTML = '';
   // detail.style.width = "0%";

};

const closeSaved = () => {
   const savedList = document.getElementById("saved_overlay");
   savedList.classList.remove('saved_display');
   console.warn('closeSaved Fired!');
};

// document.getElementById('close').addEventListener('click', closeDetail);

export { NewsView };