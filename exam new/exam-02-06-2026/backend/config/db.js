const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose connection Done");
        
    } catch (error) {
        console.log("mongoose connection failed",error);
        
    }
}
module.exports = connectDB