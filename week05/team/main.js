import Hike from './hike.js';

let hike = new Hike();
console.log(hike.render());
console.log(Hike.renderAll());

document.querySelector('#hikeSection').appendChild(Hike.renderAll());


let displayDetail = function (id) {
   console.log(`dD: id is ${id.target.dataset.id}`);
   document.getElementById("menu").style.width = "100%";
};


let divs = document.querySelectorAll('section>div>div');
divs.forEach(div => {
   let id = div.querySelector('h3').dataset.id;
   div.addEventListener('click', displayDetail.bind(id));
});


