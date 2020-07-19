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
const cssvar_color_accent_1h = '#87d2f8';
document.getElementById('close').addEventListener('click', closeMenu);
document.getElementById('menu_open').addEventListener('click', openMenu);

document.getElementById('project1').style.color = cssvar_color_accent_1h;
document.getElementById('project2').style.color = cssvar_color_accent_1h;