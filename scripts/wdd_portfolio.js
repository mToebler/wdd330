/* 
File: wdd_portfolio
Author: Mark Tobler
Description: Javascript for WDD330 portfolio and notebook
*/
// These need to be defined before they can be referenced.
const closeMenu = () => {
   document.getElementById("menu").style.width = "0%";
};

const openMenu = () => {
   document.getElementById("menu").style.width = "100%";
};

document.getElementById('close').addEventListener('click', closeMenu);
document.getElementById('menu_open').addEventListener('click', openMenu);

