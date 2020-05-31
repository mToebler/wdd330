import Todo from "./todo.js";
import TodoController from "./todocontroller.js";
var controller;

window.onload = () => {
   const pId = document.querySelector('#todos');
   controller = new TodoController(pId);
   const addBtn = document.querySelector('.add-button');
   controller.showTasks();
   pId.addEventListener("click", controller.checkChecked.bind(this));
   addBtn.addEventListener("click", addTask);   
};

function testModel() {
   let activities = ['nap', 'shower', 'bath', 'stroll', 'break', 'nickel'];
   let index = Date.now() % 6;
   let todo = new Todo(`take a ${activities[index]}.`, (Date.now()%2 === 0 ? true:false));
   log(todo.getIsComplete());
   log(todo.getContent());
   log(todo.getId());
   todo.save();
   const todo_1 = Todo.get(todo.getId());
   log(todo_1);
   log(todo);
   console.log('todo === todo_1:', (todo === todo_1));
   log('toggle complete, before:', todo.getIsComplete());
   log(todo.toggleIsComplete());
   console.log('toggle complete, after:', todo.getIsComplete(), '\n');
   log('testing Todo.getAll()');
   var todos = Todo.getAll();
   console.log(' ------ length :', todos.length);
   log(' ------ content follows :');
   todos.forEach(task => {
      console.log(task.getId(), task.getContent(), task.getIsComplete());
   });
}

// testModel();

function log(str) {
   console.log(str);
}

function addTask(event) {
   console.log('addTast Main', event);
   console.log(event.target.previousElementSibling.value);
   controller.addTask(event.target.previousElementSibling.value);
   event.target.previousElementSibling.value = '';
   controller.showTasks();
}


/*
DESIGN NOTES:
I want to approach this from an OOP perspective; possibly MVC, or MVVC 
(model-view-view controller—the model class has some extra object awareness)
I've written the model. it can represent its core properties through JSON.
Using the Great Hikes JS MVC as a template of sorts, I need:
TodoModel.js: The Todo class could morph into this pretty easily. I see that 
            the silo for HikeModel was extended for all Hikes. I can do that 
            with TodoModel: put in some Todo management methods aware of all
            Todos. Will communicate with the controller as a member instance.
         EXPECTED METHODS:
            setters/getters for Todo properties
            save/persist()
         EXPECTED STATIC METHODS:
            getAll(): todoObjArray[] 
            toggleIsComplete()
TodoController.js: As the glue between model and view, it will be responsible 
                  for UI/touchend listeners pulling the data from 
                  model, feeding that to view for the generation of HTML 
                  and them return it from an instance imported into the 
                  main.js file. (main only imports controller, which will 
                  have both model and view instances, i.e., composition. In 
                  any case, that's the pattern I'm using, so I'll conform to 
                  it.) Of note, the controller reqs an HTML element's ID for
                  its constructor, which will be used to populate the "views."
         EXPECTED METHODS:
                  showTasks(): todoArray
                  addTask(todo): Todo.id
                  toggleTaskComplete(todo.id): todo.isComplete
                  deleteTask(todo.id):  bool
                  filterTasks(filter): filteredTodoArray
TodoView.js: renders the UI as HTML elements. Communicates with the controller
            exclusively as a member instance. 
         EXPECTED METHODS:
            renderTasks(todoArray, parentID, filterObj):  NodeList 
            renderTask(todo, parentID): Node ??

TodoView.js
From step 1:It should allow the creation of new tasks, the viewing of 
            tasks, a process to mark tasks as complete, ability to remove 
            tasks, and the ability to filter by complete/not complete.
         2: Wireframes. 

*/