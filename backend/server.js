const express = require ('express');
const app = express();
const connectDB = require('./config/db')

connectDB()

const BlogRouter = require ('./routes/BlogRoute');
const { use } = require('react');

app.use (express.json())
app.use ('./blog',BlogRouter)



const PORT = 3000;
app.listen(PORT,()=>{
    console.log('server running');
    
})
