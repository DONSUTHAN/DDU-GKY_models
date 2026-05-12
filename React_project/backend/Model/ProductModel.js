const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : { type : String, required : true },
    price : { type : Number , required : true },
    quantity : { type : Number, required : true },
    image : { type: String },
    farmer : { 
        type : mongoose.Schema.Types.ObjectId,
        //tells mongoose that the farmer feild will store a unique objectId whict is default key type used by MongoDB
        ref : "User"
        //tells mongoose which model to look at when you want to "populate" the field .it create a link to User collection
     }
})