let form = document.getElementById("my form");

form.addEventListener("submit",function(e){
e.preventDefault();



let name =document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();
let terms = document.getElementById("terms").checked;

let error = document.getElementById("error");

error.innerText ="";

//name

if (name ==="") {
    error.innerText = "name is required";
    return;
}

//Email

if (email === "") {
    error.innerText = "email is required";
    return;
}

if (country === ""){
    error.innerText = "please select a country";
    return;
}

let emailPattern= /^[^]+@[^]+\.[a-z]{2,3}$/;
if(!email.match(emailPattern)){
    error.innerText ="Enter valid eamil";
    return;
}

///^[^]+@[^]+\.[a-z]{2,3}$/

//password

if(password.legth <6){
    error.innerText="password must be at least 6 chacters";
    return;
}

//gender (radio Button)

let gender = document.querySelector('input[name = "gender"]:checked');
if (!gender) {
    error.innerText = "please select gender";
    return;
}

//checkbox

if(!terms) {
    error.innerText = "you must accept the terms and conditions";
    return;
}
//Success

alert("Form submitted successfully");
});