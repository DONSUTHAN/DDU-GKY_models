const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title: {
        type : String,
        require:true
    },
    discription:{
        type : String,
        require:true
    },
    author:{
        type : String,
        require:true
    },

}, {timestamps : true})

const Blog = mongoose.model('blog',BlogSchema)
module.exports = Blog