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
         this.htmlView = new TodoView();
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
         
      }

      addTask(taskInputElement) {
         // this is triggered by a create task event
         // get the elements from the interface (view?)
         // create a new Todo
         // refresh
         this.showTasks();
         return null;
      }

      toggleTaskComplete(todoId) {
         let todo = this.todoModel.get(todoId);
         todo.setIsComplete(!todo.getIsComplete());
         return todo.getIsComplete();
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