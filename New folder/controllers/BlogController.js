const Blog = require('../models/BlogModel')

const createBlog = async (req,res) => {
    const  {title,description,author} = req.body
    try{
        const newdata = await new Blog({
            title,
            description,
            author
        })
        await newdata.save()
        res.status(200).json({msg:"created successfully",data:newdata})
    }catch(error){
        res.status(500).json({msg:"server error"})
    }

}

//here is the first phase 
//post for the postman backend here

//get and all poat

const getposts = async (req,res)=> {
    try{
        const posts = await Blog.find().sort({createdAt : -1})
        res.status(200).json({msg:"all post" ,data: posts})
    }catch(error){
        res.status(500).json({msg:"server error"})
    }
}


//update post 

const updatepost = async (req,res) => {
    try{
        const {id} = req.params
        const updatepost = await Blog.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatepost){
            res.status(404).json ({msg:"post not found"})
        }
        res.status(200).json({msg:"post updated",updatedata:updatepost})
    }catch(error){
        res.status(500).json ({msg:"server error"})
    }
}

//delete post 



module.exports = {createBlog}