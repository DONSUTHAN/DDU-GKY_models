

// const { log } = require('console')
const fs = require('fs');
// const https = require('https')

const readfile = fs.readFileSync('./text.txt','utf-8')
console.log(readfile);
// // const textout = $ {readfile} ,the ,${Date.now().}
// fs.writeFileSync('text.txt',textout)
// console.log("file will be written");
// fs.readfile()


// const getdata = async() =>{
//     const api = await fetch ('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood ')
//         const data = await api.json()
//     console.log(data);

// }
// getdata();
