const express = require ('express')
 const app = express()
 const connectDB = require ('./config/db')
 connectDB()
 const BlogRoutes  = require('./routes/BlogRoutes')

 app.use(express.json())
 app.use('/blog',BlogRoutes)
 const PORT = 3000

 app.listen(PORT,() =>{
    console.log("server runnnig");
    
 })

//  after editing package .json 
//  "script " in this change the test to start and in quates" nodemon Server.json"
//  then type npm nodemon  in the terminal then enter

// download this things
//     "dotenv": "^17.4.2",
//     "express": "^5.2.1",
//     "mongoose": "^9.5.0",
//     "nodemon": "^3.1.14"

//to restart it," npm nodemon "
// change the main:"index.js" to server.js to make the server to run server.js all the time 

//restart after long time 
//npx nodemon
//before that install nodemon
// npm nodemon i
// i is install