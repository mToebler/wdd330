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

document.getElementById('close').addEventListener('click', closeMenu);
document.getElementById('menu_open').addEventListener('click', openMenu);
   
// Needed for collapse   
document.querySelectorAll("section h3").forEach(sh3 => sh3.addEventListener("click", collapse));
document.querySelector(".btn_swap").addEventListener("click", swapCSSVars);

function swapCSSVars() {
   let col_bg = getComputedStyle(document.documentElement,null).getPropertyValue('--color_bg_1');
   let col_text = getComputedStyle(document.documentElement,null).getPropertyValue('--color_text');
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
      _ul.setAttribute("onchange", `document.getElementById(options[selectedIndex].value).scrollIntoView(true);`);
      _ul.innerText = `Topics: (dynamic list)`;
      js_toc.appendChild(_ul)
      let h_li = document.createElement("option");
      h_li.innerText = "Select from this week's topics:";
      _ul.appendChild(h_li);
      h3_list.forEach((e) => {
         h_li = document.createElement("option");
         h_li.innerText = e.innerText;
         let h_value = e.innerText.replace(/\s+/g, '_');
         e.setAttribute("id", h_value);
         // This value will be the anchor; its created swapping out spaces for _. 
         h_li.setAttribute("value", h_value);
         let h_a = document.createElement("a");
         h_a.setAttribute("href", h_value);
         _ul.appendChild(h_li);
         e.appendChild(h_a);
      });
   }
};

