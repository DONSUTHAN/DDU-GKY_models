const express = require ('express')
const connect  = require ('./config/db')
const app = express ()
const port = 3000

connect()

app.listen (3000,()=>{
    console.log('server connected')
})

module.exports = express