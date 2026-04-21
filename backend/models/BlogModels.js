const mangooose = require('mangoose');
const { Collection } = require('mongoose');
const { type } = require('node:os');
const { title } = require('node:process');
const BlogSchema = new mongoose.Schema
    ({
        title:{
        type: stringify,
        require: true,
        stimestamp: true
        // description:
        }
     })
        const Blog = mongoose.model('blog:BlogSchema')('Collection name')
        // (plural name convert :auto)
   