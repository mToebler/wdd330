// I hope I don't kick myself later for putting this in a 
// closer with privledged methods.
const Todo = (function () {
   const _id = new WeakMap();
   const _content = new WeakMap();
   const _isComplete = new WeakMap();

   class Todo {
      // the idea behind the constructor like this is to allow for simple todo creation, ex: new Todo('take a nap')
      constructor(content='', complete=false, id=null) {
         // identifer. Hopefully the user won't be hopping time zones.
         _id.set(this, id === null ? Date.now() : id);
         // the meet of the todo;
         _content.set(this, content);
         // new todo tasks are assumed not completed
         _isComplete.set(this, complete ? true : false);
      }
      // accessors
      getId() {
         return _id.get(this);
      }
      getContent() {
         return _content.get(this);
      }
      getIsComplete() {
         return _isComplete.get(this);
      }

      // mutators
      // ID is only set at creation

      setContent(strNew) {
         // any validation here
         if(strNew)
            _content.set(this, strNew);
      }

      setIsComplete(bComplete) {
         if(!isNaN(bComplete) && bComplete !== null)
            _isComplete.set(this, (bComplete ? true : false));
      }

      save() {
         localStorage.setItem(this.getId(), JSON.stringify(this));
      }

      static get(id) {
         return this.fromJSON(localStorage.getItem(id));
      }
      // needed to serialize since of the closure
      toJSON() {
         console.log('in toJson');
         return {
           //$type: 'com.wdd330.todo',
            id: this.getId(),
            content: this.getContent(),
            isComplete: this.getIsComplete(),
         };
      }

      static fromJSON(data) {
         console.log('in fromJson');
         return new Todo(data.content, data.isComplete, data.id);
      }
   }


   return Todo;
   
}());

export default Todo;