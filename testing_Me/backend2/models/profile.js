const mongoose = require ("mongoose")
const profile = new mongoose.Schema({
    title : {type : String,required : true},
    description : {type : String,required : true},
    author : {type : String,required : true},

} ,{timestamps : true })

module.exports = profile