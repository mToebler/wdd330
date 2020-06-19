/* 
File: wdd_portfolio
Author: Mark Tobler
Description: Javascript for WDD330 portfolio and notebook
*/
// These function expressions need to be defined before they can be referenced.
// i.e., no hoisting.
const closeMenu = () => {
   document.getElementById("menu").style.width = "0%";
};

const openMenu = () => {
   document.getElementById("menu").style.width = "100%";
};

// document.getElementById('close').addEventListener('click', closeMenu);
// document.getElementById('menu_open').addEventListener('click', openMenu);

// Needed for collapse   
document.querySelectorAll("section h3").forEach(sh3 => sh3.addEventListener("click", collapse));
document.querySelector(".btn_swap").addEventListener("click", swapCSSVars);
//document.querySelector('#format').addEventListener("click", insertNoteTag);

function swapCSSVars() {
   let col_bg = getComputedStyle(document.documentElement, null).getPropertyValue('--color_bg_1');
   let col_text = getComputedStyle(document.documentElement, null).getPropertyValue('--color_text');
   document.documentElement.style.setProperty(`--color_bg_1`, col_text);
   document.documentElement.style.setProperty(`--color_text`, col_bg);
}

function collapse() {
   const _article = this.parentElement.querySelector('article');
   visibility = _article.style.display == 'none' ? 'initial' : 'none';
   _article.style.display = visibility;
}
// This generates the JUMP-TO menu
window.onload = () => {
   let js_toc = document.querySelector('#toc');
   let h3_list = document.querySelectorAll('h3');
   if (h3_list.length > 0) {
      let _ul = document.createElement("select");
      // the JS fired on select dropdown change
      _ul.setAttribute("onchange", `document.getElementById(options[selectedIndex].value).scrollIntoView(true);jumpTo();`);
      _ul.innerText = `Topics: (dynamic list)`;
      js_toc.appendChild(_ul);
      let h_li = document.createElement("option");
      h_li.innerText = "Select from this week's topics:";
      // add an option value to come back to the top
      _ul.setAttribute("id", "top");
      h_li.setAttribute("value", "top");
      let h_a = document.createElement("a");
      h_a.setAttribute("href", "top");
      js_toc.appendChild(h_a);
      _ul.appendChild(h_li);
      h3_list.forEach((e) => {
         if(e.innerText.search(/-/) != 0) {
            h_li = document.createElement("option");
            h_li.innerText = e.innerText;
            let h_value = e.innerText.replace(/\s+/g, '_');
            e.setAttribute("id", h_value);
            // This value will be the anchor; its created swapping out spaces for _. 
            h_li.setAttribute("value", h_value);
            h_a = document.createElement("a");
            h_a.setAttribute("href", h_value);
            _ul.appendChild(h_li);
            e.appendChild(h_a);
         } else {
            e.parentElement.classList.add('hidden');
         }
      });
   }
   week08Load();
};

function isMobile() { return ('ontouchstart' in document.documentElement); }

function jumpTo() {
   // console.log(document.querySelector('select'));
   if (document.querySelector('select').selectedIndex != 0) {
      // document.getElementById(options[selectedIndex].value).scrollIntoView(true);
      //document.getElementById(options[selectedIndex].value).scrollIntoView(true);
      window.scrollBy(0, -73);
   }
}
// an ES6 class example. not the keyword class
class SimpleDate {
   // actual constructor
   constructor(year, month, day) {
      // simple validation. 
      // Notice the use of "this" and "_" for private (not enforceable)
      if(this.checkYear(year))
         this._year = year;
      else
         this._year = new Date().getFullYear();
      if(this.checkMonth(month))
         this._month = month;
      else
         this._month = new Date().getMonth() + 1;
      if(this.checkDay(day))
         this._day = day;
      else
         this._day = new Date().getDate();
   }

   addDays(nDays) {
      // Increase "this" date by n days
      // ...
   }

   getDay() {
      return this._day;
   }

   checkYear(year) {
      return (parseInt(year) > 0);
      // return true;
   }
   
   checkMonth(month) {
      return (0 < parseInt(month) < 13);
      // return true;
      // else 
   }
   checkDay(day) {
      // going easy here. Allowing 1-31 for now
      return (0 < parseInt(day) < 32);
   }
}
// "today" is guaranteed to be valid and fully initialized
const today = new SimpleDate(2020, 5, 15);

// Manipulating data only through a fixed set of functions ensures we maintain valid state
today.addDays(1);

const SimpleClass = (function() {
   const _property = new WeakMap();
   class SimpleClass {
      constructor(property) {
         _property.set(this, property);
      }
      simpleAdd(addToProperty) {
         _property.set(this, (_property.get(this) + addToProperty));
      }
      getProperty() {
         return _property.get(this);
      }
   }
   return SimpleClass;
}());

const simple = new SimpleClass(today.getDay());

// a  little recursion to help me out with formmating these notes
function formatChildren(elements) {
   if(elements.length > 0) {
      for(i = 0; i < elements.length; i++) {
         if(elements[i] !== undefined && elements[i].children !== undefined && elements[i].children.length > 0)
            formatChildren(elements[i].children);
         else
            console.log('element:', elements[i]);
         console.log('fin', elements[i]);
      }   
   } else {
      console.log('elements: ',elements);
   }
}

function insertNoteTag() {
   document.getElementsByTagName('main')[0].innerHTML = "<note>" + document.getElementsByTagName('main')[0].innerHTML + "</note>";
}

// formatChildren(document.getElementsByTagName('main').children);
// for week04 only
//Simple function to put DOM Stuff at the end.
const moveDOMStuff = () => {
   // find DOM STUFF
   let ref = null;
   [].forEach.call(document.getElementsByTagName('section'), section => {
      if(section.querySelector('h3').innerText == '+ DOM STUFF')
         ref = section;
      else
         console.log('nope', section);
   });
   //move it to the end;
   if(ref !== null)
      document.getElementsByTagName('main')[0].appendChild(ref);
};  
