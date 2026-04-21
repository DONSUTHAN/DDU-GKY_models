const { default: mongoose } = require("mongoose")
const mogoose = require ("mongoose")
const { log } = require("node:console")
const { connect } = require("node:http2")
require("dotenv").config()

const mongoDB = async()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo connection successful");
        
    }
    catch(error){
        console.log("mongo connection failed",error)
    }
}
module.exports = mongoDB