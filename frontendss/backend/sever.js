const express = require('express')
const app = express()

const connectDB = require('./config/db')
connectDB()

const port = 3000
app.listen(port,() =>{
    console.log('server connected succesfully');
    
})