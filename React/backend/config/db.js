const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoosse connected");
    }catch(error){
        console.log("mongoose connection failed");
    }
    
}

module.exports = connectDB