const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
   //modified from
   
    role :{
        type:String,
        enum:['customer','farmer','admin'],
        default:'customer'
    },
    //sefic feild for farmers
    farmerid:{
        type:String,
        required:true,
        sparse :true,
    },
    phonenumber:{
        type:string,
        required :true
    },
    farmerlocation:{
        type:string,
        required:true
    }
},{timestamps : true})

const user = mongoose.model('user',userschema)
module.exports = user