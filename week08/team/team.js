window.onload = () => {
   document.querySelector("#ajaxBtn").addEventListener("click", getSWAPI);
}


const showdetail = ((token) => {
   console.log(token);
   let url = `https://swapi.py4e.com/api/starships/${token.target.dataset.token}/`;
   console.log('showdetail: url:', url);
   let detailDiv = document.getElementById("detail");
   fetch(url).then(res => res.json())
      .then(obj => {
         populateDetail(obj);
         detailDiv.style.width = "100%";
         detailDiv.style.display = "block";
      }).catch(e => handleError(e));
   //populateDetail(token.target.dataset.token]);
   //detailDiv.style.width = "100%";
   //detailDiv.style.display = "block";

   // console.log('showDetail: token target:', token.target);
   // const url = `https://swapi.py4e.com/api/starships/${token.target.dataset.token}/`;
   // const detailDiv = document.querySelector('#detail');
   // fetch(url)
   //    .then(res => formatSW(res), err => handleError(err))
   //    .then(obj => { detailDiv.innerHTML = `<span class='bold'>Class:</span> ${obj['starship_class']}<br><span class='bold'>Req'd crew:</span> ${obj['crew']} <br><span class='bold'>Capacity:</span><br> ${obj['passengers']} passengers; <br>${obj['cargo_capacity']} cargo.` }, err => handleError(err))
   //    .then(any => {
   //       detailDiv.style.width = "100%";
   //       detailDiv.style.display = "block";
   //    }, err => handleError(err));

});

const closeDetail = () => {
   document.getElementById("detail").style.width = "0%";
};



function populateDetail(obj) {
   const detailDiv = document.querySelector('#detail');
   detailDiv.innerHTML = `<h1>${obj['name']}</h1><span class='bold'>Class:</span> ${obj['starship_class']}<br><span class='bold'>Req'd crew:</span> ${obj['crew']} <br><span class='bold'>Capacity:</span><br> ${obj['passengers']} passengers; <br>${obj['cargo_capacity']} cargo.<br>`;
   let span = document.createElement('span');
   span.setAttribute('id', 'close');
   span.innerHTML = ' &times; ';
   span.classList.add('reveal_close');
   span.classList.add('accent_2');
   span.addEventListener('click', closeDetail);
   detailDiv.appendChild(span);
}

// ajax method
function getAjax() {
   // alert('clicked');
   var Http = new XMLHttpRequest();
   const url = `https://swapi.py4e.com/api/starships/9/`;
   Http.open("GET", url);
   Http.send();
   Http.onreadystatechange = (res) => {
      let jRes = JSON.stringify(Http.responseText);
      document.querySelector('#ajaxResponse').innerHTML = JSON.parse(jRes);
   }
};

function getSWAPI() {
   const url = `https://swapi.py4e.com/api/starships/`;
   const docShipHanger = document.querySelector('#ajaxResponse');
   fetch(url)
      .then(res => formatSW(res), err => handleError(err))
      // .then(json => { docShipHanger.innerHTML = `Starship: ${json.name}<br>Class: ${json.starship_class}<br>Model: ${json.model}` }, err => handleError());
      .then(json => renderSW(json))
      .then(resArray => {
         docShipHanger.innerHTML = resArray.join("");
         docShipHanger.addEventListener("click", showdetail);
      }, err => handleError(err));
   //.then(html => {docShipHanger.innerHTML = `Starship: ${json.name}<br>Class: ${json.starship_class}<br>Model: ${json.model}`}, err=> handleError());

}

const formatSW = (res) => {
   console.log(res);
   // let pRes = JSON.parse(res.responseText);
   // going to set this to a global namespace
   // SW_GLOBAL_RES = JSON.parse(res);
   return res.json();
   // return `
   //    ${pRes}

   // `;
}

const renderSW = (json) => {
   let htmlStr = '';
   // have an array here, want to forEach or map it to return an UL or series, pulling out the name, class and model for now.
   htmlStr = [].map.call(json.results, parseTokenAsHTML)
   // .then(str => str.replace('<div>,<div>', '<div><div>'));

   return htmlStr;
}

const parseTokenAsHTML = (obj, tokens = null) => {
   // takes obj, returns html string
   const swdiv = document.createElement('div');
   console.log('parseTokenAsHTML tokens is:', tokens);
   let str = '';
   let token = '';
   if (obj) {
      // if (tokens)
      if (false)
         str += tokens.foreach(token => ` <br>${token}: ${obj.token} `);
      else {
         const swH3 = document.createElement('h3');
         let url = obj.url;
         token = url.substr(url.indexOf('starships/') + 'starships/'.length, url.length - url.indexOf('starships/'));
         token = token.slice(0, token.length - 1);
         swH3.textContent = obj['name'];
         swH3.setAttribute('data-token', token);
         swdiv.appendChild(swH3);


         // save these for later
         // const swP = document.createElement('p');         
         // swP.innerHTML = `<span class='bold'>Class:</span> ${obj['starship_class']}<br><span class='bold'>Req'd crew:</span> ${obj['crew']} <br><span class='bold'>Capacity:</span><br> ${obj['passengers']} passengers; <br>${obj['cargo_capacity']} cargo.`;
         // swdiv.appendChild(swP);
         // // let keys = obj.getOwnPropertyNames();         
         // str += keys.foreach(k => `<br> ${k}: ${obj.k}`);
      }
   }
   //console.log('teams::parseTokenAsHTML: returning:', `<div>${swdiv.innerHTML}<div>`);
   return `<div data-token='${token}'>${swdiv.innerHTML}</div>`;
}

const handleError = (err) => {
   console.error('HandleError: ', err);
}

