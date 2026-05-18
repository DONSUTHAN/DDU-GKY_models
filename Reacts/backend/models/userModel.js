const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{ type : String, required : true },
    password : { type : String , required : true },
    email : { type : String , required : true },
    phone : { type : String , required :true },
    role : [ "customer","farmer" , "admin"  ]  ,
    location : {lat,lng}

})

module.exports = UserSchema