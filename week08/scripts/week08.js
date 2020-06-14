week08Load = () => {
   let btn_list = document.querySelectorAll('.btn');
   btn_list.forEach(element => {
      element.addEventListener('click', transform);
   });
};

function transform(event) {
   let btn = event.target;
   btn.classList.add(btn.id);
   btn.textContent = 'reset'
   btn.removeEventListener('click', transform);
   btn.addEventListener('click', resetTransform);
}

function resetTransform(event) {
   let btn = event.target;
   btn.classList.remove(btn.id);
   btn.textContent = 'try';
   btn.removeEventListener('click', resetTransform);
   btn.addEventListener('click', transform);
}