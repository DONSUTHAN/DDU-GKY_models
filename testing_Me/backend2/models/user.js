const mongoose = require ("mongoose")
const userSchema = new mongoose.Schema(
    {
        role : {type : String , enum : ["farmer","customer"], required : true},
        name : {type : String , required : true , trim : true},
        email: {},
        phone: {},
        password : ,
        location : , 
    }
)