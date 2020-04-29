/* 
File: wdd_portfolio
Author: Mark Tobler
Description: Javascript for WDD330 portfolio and notebook
*/
const closeMenu = () => {
   document.getElementById("menu").style.width = "0%";
};

const openMenu = () => {
   document.getElementById("menu").style.width = "100%";
};

document.getElementById('close').addEventListener('click', closeMenu);
document.getElementById('menu_open').addEventListener('click', openMenu);

function openNav() {
   document.getElementById("myNav").style.width = "100%";
}

 /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
   document.getElementById("myNav").style.width = "0%";
}