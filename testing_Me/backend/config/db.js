const mongoose = require ('mongoose')
require('dotenv').config()
const connectDB =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose connected")
    }catch(error){
        console.log("error in conecting",error )
    }
}
module.exports = connectDB 