const mongoose = require('mongoose')

const usermodel =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{trpe:Number,required:true},
})
const User = mongoose.model('user',usermodel)
module.exports = User