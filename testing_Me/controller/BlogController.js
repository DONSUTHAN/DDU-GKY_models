const BlogSchema = require('../models/BlogModel')
const Blog = require ('../models/BlogModel')
const createpost = async (res,req) => {
    const {title,description,author} = req.body
    try{
        const newdata = await new Blog ({
            title,
            description,
            author
        })
        await newdata.save()
        res.status(200).json({msg:"created sucessfull"})

    }catch(error){
        res.status(500).json({msg:"server error"})
    }
}

const getposts = async (res,req) => {
    try{
        const posts = await Blog.find().sort({
            createdAt : -1        })
            res.status(200).json({msg:"all posts",data:posts})
    }catch(error){
        res.status(500).json({msg:"server error"})
    }
}

const updatepost = async (res,req) => {
    try{
        const {id} = req.params
        const updatepost =await Blog.findByIdAndUpdate(id.req.body,{new:true})
        if(!updatepost){
            res.status(400).json({msg:"post not found"})
        }
        res.status(200).json({msg:"post updated",updatedata: updatepost})
       
    }catch(error){
         res.status(500).json({msg:"server error"})
    }
}


module.exports = {createpost,updatepost,getposts}