import Todo from "./todo.js";

let todo = new Todo('take a shower');
log(todo.getIsComplete());
log(todo.getContent());
log(todo.getId());
todo.save();
const todo_1 = Todo.get(todo.getId());
log(todo_1);
log(todo);
console.log('todo === todo_1:', (todo === todo_1));
// todo.call.getContent(todo_1);
//todo.call(getContent(), todo_1);

// log(todo_1.getIsComplete());
// log(todo_1.getContent());
// log(todo_1.getId());







function log(str) {
   console.log(str);
}


/*
DESIGN NOTES:
I want to approach this from an oop perspective; possibly MVC, or MVVC 
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