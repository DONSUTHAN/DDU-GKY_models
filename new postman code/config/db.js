const mongoose = require ('mongoose');
require ('dotenv').config();

const connectDB = async ()=> {
    try{
        await mongoose.conncet(process.env.MONGO_URL)
        console.log('mongoDB connected successfully');
        
    }
    catch(error){
        console.error('error connecting to mongoDB:',error);
    }

};

module.exports = connectDB;