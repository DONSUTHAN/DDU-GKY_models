const express = require('express')
const app  = express()

const connectDB = require('./config/db')
connectDB()

const port = 3000

app.use(express.json())
// app.use('')

app.listen(port,()=>{
    console.log("server is coonected");
    
})