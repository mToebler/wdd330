import Hike from './hike.js';
import Comment from './comment.js';

let hike = new Hike();
let commentModel = new Comment();
console.log(hike.render());
console.log(Hike.renderAll());

document.querySelector('#hikeSection').appendChild(Hike.renderAll());

// to close hike detail
const closeDetail = () => {
   document.getElementById("detail").style.width = "0%";
};
document.getElementById('close').addEventListener('click', closeDetail);


let displayDetail = function (id) {
   console.log(`dD: id is ${id.target.dataset.id}`);
   let detail = document.getElementById("detail");
   populateDetail(detail, id.target.dataset.id);
   detail.style.width = "100%";
   detail.style.display = "block";
   //detail.classList.add('reveal');

};

function populateDetail(divDetail, hikeId) {
   let hike = new Hike(hikeId);
   divDetail.innerHTML = hike.renderDetail();
   let span = document.createElement('span');
   span.setAttribute('id', 'close');
   span.innerHTML = ' &times; ';
   span.classList.add('reveal_close');
   span.classList.add('accent_2');
   span.addEventListener('click', closeDetail);
   divDetail.appendChild(span);
   // document.getElementById('close').addEventListener('click', closeDetail);
}


let divs = document.querySelectorAll('section>div>div');
divs.forEach(div => {
   let id = div.querySelector('h3').dataset.id;
   div.addEventListener('click', displayDetail.bind(id));
});


// testing
function testComment() {
   let comment = new Comment(1, 'test comment', 'hike');
   console.log('main:testComment: comment:', comment);
   comment.content = 'Test Comment only. I love this hike!';
   comment.save();
   let comments = Comment.getAllComments();// getAllComments();
   console.log('main:testComments: comments:', comments);
}

testComment();