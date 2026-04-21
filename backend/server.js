const express = require ('express');
const app = express();
const connectDB = require('./config/db')

connectDB()

const PORT = 3000;
app.listen(PORT,()=>{
    console.log('server running');
    
})
