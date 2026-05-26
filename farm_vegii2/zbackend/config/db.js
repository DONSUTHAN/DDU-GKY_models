const mongoose = require('mongoose')

require("dotenv").config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo connected");
        
    } catch (error) { 
        console.log("mongo coonetion failed");
        console.log(error.messege);
        
    }
}
module.exports = connectDB