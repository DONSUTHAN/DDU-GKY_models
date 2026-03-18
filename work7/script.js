let humburger = document.getElementById("humburger");
let navMenu = document.getElementById("navMenu");

humburger.addEventListener("click",function(){
    humburger.classList.toggle('active');
    navMenu.classList.toggle("active")
});