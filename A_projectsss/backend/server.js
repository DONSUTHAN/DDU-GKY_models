const express = require ('express')
 const app = express()
 const connectDB = require ('./config/db')
 connectDB()
 const BlogRoutes  = require('./routes/BlogRoutes')
//  const userRoutes = require('./routes/userRoutes')    

 app.use(express.json())
 app.use('/blog',BlogRoutes)
//  app.use('/user',userRoutes)
 
 const PORT = 3000
 
 app.listen(PORT,() =>{
    console.log(`${PORT} server runnnig`);
 })

