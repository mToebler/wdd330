// I hope I don't kick myself later for putting this in a 
// closer with privledged methods.
const Todo = (function () {
   const _name = new WeakMap();
   const _id = new WeakMap();
   const _content = new WeakMap();
   const _isComplete = new WeakMap();

   class Todo {
      // the idea behind the constructor like this is to allow for simple todo creation, ex: new Todo('take a nap')
      constructor(content = '', complete = false, id = null) {
         _name.set(this, 'todo');
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

      getName() {
         return _name.get(this);
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

      toggleIsComplete() {
         this.setIsComplete(!this.getIsComplete());
         this.save();
         return this.getIsComplete();
      }

      save() {
         localStorage.setItem(this.getId(), JSON.stringify(this));
      }

      delete() {
         localStorage.removeItem(this.getId());
      }

      // Class method for returning an todo by its ID
      static get(id) {
         //return this.fromJSON(localStorage.getItem(id));
         return Todo.fromJSON(localStorage.getItem(id));
      }
      
      // needed to serialize since of the closure  
      toJSON() {
         // console.log('in toJson');
         return {
           //$type: 'com.wdd330.todo',
            name: this.getName(),
            id: this.getId(),
            content: this.getContent(),
            isComplete: this.getIsComplete(),
         };
      }

      static fromJSON(data) {
         // console.log('in fromJson', data);
         if(data) {
            
            data = JSON.parse(data);
            if(data.name === 'todo') {
               return new Todo(data.content, data.isComplete, data.id);
            }
         } else {
            console.error('Todo.fromJSON: returned data is falsey:', data);
            return data;
         }
      }
      

      static getAll() {
         // setup return value
         let taskArray = [];
         let keys = Object.keys(localStorage);
         let i = keys.length;
         console.log('Todo.getAll: getting tasks from ', i, 'entries.');
         while(i--) {
            // a lot nested here. using the key, get the ToDo, push on array
            // console.log('Todo.getAll: getting key', keys[i]);
            let obj = localStorage.getItem(keys[i]);
            obj = JSON.parse(obj);
            if(obj.name === 'todo')            
               taskArray.push(Todo.get(keys[i]));
            //taskArray.push(new Todo(obj.content, obj.isComplete, obj.id));
         }
         return taskArray;
      } 

      static getSubset(isComplete) {
         let taskArray = [];
         let keys = Object.keys(localStorage);
         let i = keys.length;
         console.log('Todo.getSubset: getting tasks from a possible', i, 'entries.');
         while(i--) {
            // a lot nested here. using the key, get the ToDo, push on array
            // console.log('Todo.getAll: getting key', keys[i]);
            let obj = localStorage.getItem(keys[i]);
            obj = JSON.parse(obj);
            if(obj) {// console.log('\t', obj);            
               if(obj.name === 'todo') {
                  let tempTodo = Todo.get(keys[i]);
                  console.log('Todo.getSubset: tempTodo:', tempTodo);
                  if(tempTodo.getIsComplete() === isComplete)
                     taskArray.push(tempTodo);
               }
            }
               //taskArray.push(new Todo(obj.content, obj.isComplete, obj.id));
         }
         return taskArray;
      }
   }

   return Todo;
   
}());

export default Todo;