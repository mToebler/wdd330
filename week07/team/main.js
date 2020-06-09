import Hike from './hike.js';
import Comment from './comment.js';
///////////////////////////// THIS IS WEEK 7 //////////////////////////////////
let hike = new Hike();
let commentModel = Comment;
//let allCommentsMap = commentModel.getAllComments();
//let commentsByHikeMap = packageCommentsByHikeId(allCommentsMap);
console.log(hike.render());
console.log(Hike.renderAll());
window.onload = () => {
   reload();
}

//document.querySelector('#hikeSection').appendChild(Hike.renderAll(commentsByHikeMap));
function reload() {
   let allCommentsMap = commentModel.getAllComments();
   let commentsByHikeMap = packageCommentsByHikeId(allCommentsMap);   
   document.querySelector('#hikeSection').innerHTML = '';
   document.querySelector('#hikeSection').appendChild(Hike.renderAll(commentsByHikeMap));
   

   let divs = document.querySelectorAll('section>div>div');
   divs.forEach(div => {
      let id = div.querySelector('h3').dataset.id;
      div.addEventListener('click', displayDetail.bind(id));
   });

}
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
   document.getElementById('addCommentBtn').addEventListener('click', addComment);

};

function populateDetail(divDetail, hikeId) {
   hikeId = Number.parseInt(hikeId);
   let hikeComments = Comment.getAllCommentsByHikeId(hikeId);
   hikeComments = packageCommentsByHikeId(hikeComments);
   let hike = new Hike(hikeId);
   hike.comments = hikeComments.get(hikeId);
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

// testing
function testComments() {
   let id = Math.floor((Math.random() * 3));
   console.log('main:: test comment: id is ' + id);
   let comment = new Comment(id, 'test comment', 'hike');
   console.log('main:testComment: comment:', comment);
   comment.content = `Test Comment only. I love this hike with an ID of ${id}!`;
   comment.save();
   let comments = Comment.getAllComments();// getAllComments();
   console.log('main:testComments: comments:', comments);
   console.log('main:testComments: comments with hikeid of', id, Comment.getAllCommentsByHikeId(id));
}



function packageCommentsByHikeId(commentMap) {
   // oragnize the comments by hike ID.
   let returnMap = new Map();
   let itr = commentMap.entries();
   let tempComment = itr.next().value;
   while(tempComment) {
      console.log('main::packageCommentsByHikeId', tempComment[1]);
      let id = tempComment[1].hikeId;
      if(returnMap.has(id))
         returnMap.get(id).push(tempComment[1]);
      else {         
         returnMap.set(id, [tempComment[1]]);
      }
      tempComment = itr.next().value;
   }
      // entry will be a key value pair
   console.log('main::packageCommentsByHikeId: returning ', returnMap);
   return returnMap;

}

function addComment() {
   let textArea = document.getElementById("addCommentTxt");
   let id = parseInt(textArea.dataset.id);
   let content = document.getElementById("addCommentTxt").value;
   console.info(`Adding ${content} comment for hikeId: ${id}`);
   let newComment = new Comment(id, content);
   newComment.save();
   closeDetail();
   reload();
}

// testComments();
// function fixComments() {
//    Comment.fixComments(3, 0);
// }
