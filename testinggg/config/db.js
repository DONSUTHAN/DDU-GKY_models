// const mongoose = require ('mongoose')
// require("dotenv").config()

// const connectDB = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log("mongoose connected");
        
//     }catch(error){
//         console.log("mongoose connection failed",error);
        
//     }
    
// }
// module.exports = connectDB

const mongoose = require ('mongoose')
require('dotenv').config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo is connected")
    } catch (error) {
        console.log("connection failed",error)
    }
}
module.exports = connectDB