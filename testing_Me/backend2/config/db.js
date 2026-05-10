const mongoose = require ("mongoose")
require("dotenv").config()
const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo is connnected")
    }
    catch(error){
        console.log("error",error)
    }
}
module.exports = connectDB