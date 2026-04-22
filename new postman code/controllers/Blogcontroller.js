const Blog = require('../models/blogModel')



const CreateBlog = async(req,res)=>{

    const {title,description,author}= req.body

    try {
        const newdata = await new Blog({
            title,
            description,
            author
        })
        await newdata.save()
        res.status(203).json({msg: `created succesfully data is :${newdata}`})
        
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const getposts = async(req,res)=>{
    try{
        const posts=await Blog.find().sort({createdAt:-1})
        res.status(200).json({msg:"all post", data:posts})
    } catch(error){
        res.status(500).json({msg:"server error"})
    }
}

module.exports= {CreateBlog, getposts}