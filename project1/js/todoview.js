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

   renderTasks(taskArray = [], filterObj = null) {
      // remember, the only point of contact between view and the outside 
      // world is the controller sets up or sends.
      let renderedTasks = [];
      let taskUl = document.createElement('ul');
      taskUl.classList.add('todo-list');
      if(filterObj) {
         console.error('TodoView::renderTasks: Need to implement filters!!');
      }
      let isInstance = taskArray instanceof Array;
      console.log('is Array:', isInstance, taskArray);

      // [].forEach.call(taskArray, obj =>
      //    renderedTasks.push(this.renderTask(obj)));

      taskArray.forEach(
         obj =>
            renderedTasks.push(this.renderTask(obj)));

      // add the filter <li>
      let filterLogic =  `<li class="todo-item todo-logic ">
                           <div>${renderedTasks.length} tasks shown</div>
                           <div>display:</div>
                           <div id="filter_all" data-action="show_all">all</div>
                           <div id="filter_active" data-action="show_active">active</div>
                           <div id="filter_done" data-action="show_done">completed</div>
                        </li>`;
      renderedTasks.push(filterLogic);
      // concat them all together
      taskUl.innerHTML = renderedTasks.join("");
      // return renderedTasks;
      return taskUl;
   }

   renderTask(task) {
      return (`
               <li class="todo-item ${task.getIsComplete() ? "checked" : ""}" data-id="${task.getId()}">               
               <input type="checkbox" data-id="${task.getId()}" ${task.getIsComplete() ? "checked" : ""} />                
               ${task.getContent()} 
               <button class="remove-button" data-id="${task.getId()}" data-action="delete">&times;</button>
               </li>
               `);
   }

   toggleTask(target, isChecked) {
      // get the id, call toggle fn, if returns 
      // true:
      //    - add class to parent node, description  crossing it out. 
      //    - make sure checkbox is checked
      // false:
      //    - remove class from parent node
      //    - remove check if there.
      if(isChecked) {
         target.parentElement.classlist.add('checked');
         target.checked = true;
      } else {
         try {
            target.parentElement.classlist.remove('checked');
         } catch(e) {
            // checked may not be there.
            console.error('TodoView::toggleTask: checked css classlist issue handled or swallowed:', e);
         } finally {
            target.checked = false;
         }
      }
   }


}

export default TodoView;