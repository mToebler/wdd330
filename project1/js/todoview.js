// Todo View Handler (based on the MVC design pattern in GreatHikes of week 5)
/*
TodoView.js: renders the UI as HTML elements. Communicates with the controller
            exclusively as a member instance. 
      EXPECTED METHODS:
            renderTasks(todoArray, parentID, filterObj):  NodeList 
            renderTask(todo, parentID): Node ??
*/
class TodoView {
   constructor(elementId) {
      // elementId view will be adding to this elementId, parentId 
      // might be more appropriate? Depends on Divs or UL strategy.
      // divs may give more flexibility and structure.
      if(elementId) {
         this.elementId = elementId;
      } else {
         this.elementId = null;
      }
      this.name = 'TodoView';      
   }

   renderTasks(taskArray, filterObj = null) {
      // remember, the only point of contact between view and the outside 
      // world is the controller sets up or sends.
      let renderedTasks = [];
      let taskUl = document.createElement('ul');
      if(filterObj)
         console.error('TodoView::renderTasks: Need to implement filters!!');
      
      taskArray.forEach(obj => {         
         renderedTasks.push(this.renderTask(obj));
         /*
         not working for me
         let task = document.createElement('li');
         task.appendChild('checkbox');
         task.appendChild('text').textContent(obj.getContent());
         task.setAttribute('data-id', obj.getId().toString());
         task.setAttribute('data-complete', obj.getIsComplete().toString());
         */
      });
      taskUl.innerHTML = renderedTasks.join("");
      // return renderedTasks;
      return taskUl;
   }

   renderTask(todoObj) {
      return (`
               <li class="todo-item ${todoObj.getIsComplete() ? "checked" : ""}" data-id="${todoObj.getId()}">
               <input type="checkbox" data-id="${todoObj.getId()}" ${todoObj.getIsComplete() ? "checked" : ""} /> 
               ${todoObj.getContent()} </li>
               `);
   }
}

export default TodoView;