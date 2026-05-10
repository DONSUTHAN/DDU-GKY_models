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

//run  {npm init}
//then run ,{npm i express mongoose}
//then there is module folder and a lock json and package json file will be there look the package.json
//package-lock
//package.json
//node_models