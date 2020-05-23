import Todo from "./todo.js";

let todo = new Todo('take a shower');
log(todo.getIsComplete());
log(todo.getContent());
log(todo.getId());
todo.save();
const todo_1 = Todo.get(todo.getId());
log(todo_1);
log(todo);
console.log('todo ==     todo_1:', (todo === todo_1));
// todo.call.getContent(todo_1);
//todo.call(getContent(), todo_1);

// log(todo_1.getIsComplete());
// log(todo_1.getContent());
// log(todo_1.getId());







function log(str) {
   console.log(str);
}
