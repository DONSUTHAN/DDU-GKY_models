const mongoose = require ("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose connected sucessfull")
    } catch (error) {
        console.log("connection error")
    }
}
module.exports = connectDB