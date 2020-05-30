import Todo from "./todo.js";
import TodoView from "./todoview.js";
// As the glue between model and view, it will be responsible
//                   for UI/touchend listeners pulling the data from 
//                   model, feeding that to view for the generation of HTML 
//                   and them return it from an instance imported into the 
//                   main.js file. (main only imports controller, which will 
//                   have both model and view instances, i.e., composition. In 
//                   any case, that's the pattern I'm using, so I'll conform to 
//                   it.) Of note, the controller reqs an HTML element's ID for
//                   its constructor, which will be used to populate the "views."
//          EXPECTED METHODS:
//                   showTasks(): todoArray
//                   addTask(todo): Todo.id
//                   toggleTaskComplete(todo.id): todo.isComplete
//                   deleteTask(todo.id):  bool
//                   filterTasks(filter): filteredTodoArray
// Just going to do a normal class for controller here.

class TodoController {
   // this is based on the MVC HikeController from week 5
   constructor(parentId) {
      this.parentElement = parentId;// document.getElementById(parentId); 
      // Trying this static approach for the static model methods.
      // of course the todo instances will need to be generated one by one.
      this.todoModel = Todo;
      this.htmlView = new TodoView(parentId);
      // this.todoView = new TodoView(); // ?? maybe?
   }
   // simple get all from model, render with view and connect it with the html
   showTasks() {
      let tasks = this.htmlView.renderTasks(this.todoModel.getAll());
      // console.log(`TodoController::showTasks: parentId is ${typeof (this.parentElement)};`, this.parentElement);
      // console.log(`TodoController::showTasks: tasks is ${typeof(tasks)};`, tasks);
      if(this.parentElement.childElementCount === 0)
         this.parentElement.appendChild(tasks);
      else
         this.parentElement.children[0] = this.htmlView.renderTasks(tasks);

      // now add an event listener on the parent
      // this.parentElement.addEventListener("click", this.checkChecked);
   }

   checkChecked(event) {
      let id = null;
      let etarget = null;
      let isComplete = null;
      // this has been frustrating to work it this way. 
      if(event.target) {
         if(event.target instanceof HTMLLIElement) {
            // want to instanceof
            // alert(event.target.children[0].attributes[1].nodeValue);
            // this is the ID:
            id = event.target.children[0].attributes[1].nodeValue;
            // this is isComplete
            //isComplete = event.target.children[0].checked;
            etarget = event.target.firstElementChild;
            //this.todoModel.get()
         } else if(event.target instanceof HTMLInputElement) {
            // alert(event.target.attributes[1].nodeValue);
            id = event.target.attributes[1].nodeValue;
            //isComplete = event.target.checked;
            etarget = event.target;
         }
         if(id) {
            // take care of model:
            isComplete = Todo.get(id).toggleIsComplete();
            //this.htmlView.toggleTask(etarget, isComplete);
            // problems with this scope ! >< ! putting view code here. =(            
            try {
               //alert(event.target.firstElementChild.parentElement.classList);               
               etarget.parentElement.classList.toggle('checked');
               etarget.checked = isComplete;
            } catch(typeErr) {
               if(typeErr instanceof TypeError) {
                  console.error('TODOCONTROLLER::checkChecked: swallowing this TypeError:', typeErr);
                  console.log('\tTrying to evaluate:', etarget.closest('li'));
                  let closestLi = etarget.closest('li');
                  closestLi.classList.toggle('checked');
                  etarget.checked = isComplete;
               } else {
                  new Error(typeErr);
               }
            }
         }
         if(false && (event.target.type == 'checkbox' || event.target.nodename === "LI")) {
            //since this deals with the UI, kicking it over to view
            //passing the return value of controller's model isComplete toggle
            let isComplete = this.toggleModelTaskComplete(event.target);
            this.htmlView.toggleViewTask(event, isComplete);
         } else {
            console.log(`controller::checkChecked: event target is type: ${event.target.type}; and nodename: ${event.target.nodename}; and target is: ${event.target}`, event, event.target.nodename);
            console.log('etarget:', etarget);
            console.log('etarget.parentElement:', etarget.parentElement);
            console.log('etarget.parentElement.classList:', etarget.parentElement.classList);
         }
      } else {
         console.log(event);
      }
   }

   addTask(taskInputElement) {
      // this is triggered by a create task event
      // get the elements from the interface (view?)
      // create a new Todo
      // refresh
      this.showTasks();
      return null;
   }

   toggleModelTaskComplete(todoId) {
      let id = 0;
      if(todoId.nodename) {
         if(todoId.dataset.id)
            id = todoId.dataset.id;
      } else if(typeof (todoId) == 'number') {
         id = todoId;
      }
      //let todo = this.todoModel.get(id);
      // this will take care of the data/model
      return this.todoModel.get(id).toggleIsComplete();
      // do we need to re-render?      
   }

   deleteTask(todoId) {
      let todo = this.todoModel.get(todoId);
      console.log("todocontroller::deleteTask: removing todo:", todoId);
      todo.delete();
      this.showTasks();
   }

   filterTasks(filter) {
      // filter criteria? need more info
      console.error('todocontroller::deleteTask: need to implement filter!');
      this.showTasks();
   }

   

}

export default TodoController;