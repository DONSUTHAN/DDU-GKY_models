const mongoose = require ('mongoose')
require('dotenv').config();
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo connected successfully");
        
    }catch(error){
        console.log("error in connecting mongoDB",error);   
    }    
}

module.exports = connectDB


