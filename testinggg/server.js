
const express = require('express')
const app = express()

const connect = require('./config/db')
const control = require('./controllers/userContoller')

const port = 3000

connect()

app.listen(port,()=>{
    console.log("server connected");
    
})