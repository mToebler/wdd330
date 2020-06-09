class Comment {
   constructor(hikeId, content, type = 'hike') {
      this.name = 'Comment';
      this.commentId = Date.now();
      this.hikeId = hikeId;
      this.content = content;
      this.created = new Date();
      this.type = type;
   }

   static get(commentId) {
      let obj = JSON.parse(localStorage.getItem(commentId));
      let newComment = new Comment(obj.hikeId, obj.content, obj.type);
      newComment.commentId = obj.commentId;
      newComment.created = obj.created;
      return newComment;
   }

   save() {
      localStorage.setItem(this.commentId, JSON.stringify(this));
   }
   static getAllComments(hikeId = null) {
      // I'm guessing these are coming from LocalStorage, but they could come from any source.
      let comments = new Map();
      let keys = Object.keys(localStorage);
      let i = keys.length;
      while(i--) {
         let obj = localStorage.getItem(keys[i]);
         obj = JSON.parse(obj);
         if(obj.name === 'Comment')
            if(hikeId) {
               if(Number.parseInt(obj.hikeId) == hikeId)
                  comments.set(keys[i], obj);
            } else {
               comments.set(keys[i], obj);
            }
      }
      return comments;
   }

   static getAllCommentsByHikeId(hikeId) {      
      return Comment.getAllComments(hikeId);
   }

   static fixComments(hikeId=null, newId=null) {
      // one time fix 
      let keys = Object.keys(localStorage);
      let i = keys.length;
      while(i--) {
         let obj = localStorage.getItem(keys[i]);
         obj = JSON.parse(obj);
         if(obj.name === 'Comment')
            if(hikeId) {
               if(Number.parseInt(obj.hikeId) == hikeId) {
                  //change to newId
                  let fixComment = Comment.get(obj.commentId);
                  fixComment.hikeId = newId;
                  fixComment.save();
               } else {
                  console.log("skipping:", obj);
               }
               // comments.set(keys[i], obj);
            } else {
               console.log("skipping:", obj);
            }
      }
   }

   
}

class Type {
   constructor(typeId) {
      this._types = ['hike', 'park', 'w'];
      this.type = this._types[typeId];
   }
}

// test

/*
TEAM ACTIVITY
List of methods/fn/steps to create hiking comments:
Core Req 1:
1.  getAllComments()
2.  renderCommentList / renderCommentCounts
3. filterCommentsByName (? Id?)
4. Array (map?) to hold comments
6. html css portions
7. event listeners:
   a. add comment
   b. remove comment?
   c. load comments? (nah)
8. addComment(id, Comment)

Core Req 2:



*/


export default Comment;