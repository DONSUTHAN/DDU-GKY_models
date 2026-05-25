const mongoose = require('mongoose')

const Blogschema = new mongoose.Schema({
    title :{type : String , required : true}
    ,author :{type : String , required : true}
    ,description :{type : String , required : true}
})

const Blog= mongoose.model('bloggi',Blogschema)
module.exports = Blog