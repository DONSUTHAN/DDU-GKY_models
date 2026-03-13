// {/* <p>A function that returns the greeting: "Hello World":</p>

// <p id="demo"></p> */}


// function sayHello(){
//   return "hello world"
// }
// let greeting = sayHello();

// document.getElementById(id="demo").innerHTML = greeting;

// function multiply(a, b) {
//   return a * b;
// }
// let result = multiply(4, 3);

// document.getElementById("dem1").innerHTML = "The result is " + result;

let calculation = '' ; // this hold the math string (eg "10 + 5")
function append (value) {
  calculation += value ;
  document.getElementById('display').innerText = calculation ;
}
////////////////////////////////////////////

function clearDisplay(){
  calculation = "" ;
  document.getElementById('display').innerText = "0" ;
}

///////////////////////////////////////////////

function result (){
  try {
  // eval() turns the string "10+5" into the number 15
  
    calculation = eval(calculation);
  
  document.getElementById('display').innerText = calculation;
} 
catch (err) {

  document.getElementById('display').innerText = "error";
  calculation = "";
}
}