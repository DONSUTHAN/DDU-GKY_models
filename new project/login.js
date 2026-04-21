let form = document.getElementById("my form");

form.addEventListener("submit", function (e) {
    e.preventDefault();


    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let term = document.getElementById("terms").checked;

    let error = document.getElementById("error");

    error.innerText = "";

    //name

    if (name == "") {
        error.innerText = "name is reqired";
        return;
    }

    if (email == "") {
        error.innerText = "email is reqired"
        return;
    }
    if (country == "") {
        error.innerText = "plese select a country"
        return;
    }
    let emailPattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        error.innerText = "Enter valid Email"
        return;
    }

    //^[^]+@[^]+\.[a-z]{2,3}$/

    //password

    if (password.length < 6) {
        error.innerText = "password must be  at least 6 characters";
        return;
    }
    // gender radio Button

    let gender = document.querySelector('input[name = "gender"]:checked');
    if (!gender) {
        error.innerText = "please select gender";
        return;
    }

    //checkbox

    if (!terms) {
        error.innerText = "you must accept the terms and conditions";
        return;
    }
    //Success

    alert("Form submitted successfully");
});