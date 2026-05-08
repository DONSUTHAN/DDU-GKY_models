const express = require ('express')
const app = express()
 const port = 3000

 const connectDB = require('./config/db')
 connectDB()
 const Blogroutes = require('./routers/Blogroutes')
 
 app.use('./blog',Blogroutes)

 app.listen(port,() => {
    console.log('server is connected',port);
    
 })