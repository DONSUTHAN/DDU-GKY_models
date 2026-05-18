var a ;
console.log(a)
a = 2
// hoisting

//calback function

const greet = (name,callback) =>{
    console.log("hello"+name)
    callback()
};
const bye = () =>{
    console.log("goodbye");
    
};
greet("raju",bye)