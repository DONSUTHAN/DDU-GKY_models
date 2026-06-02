const Blog = require('../models/BlogModel')
//blog means post in postman

const createpost = async (req,res) => {
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
//getpost for the postman 

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

const deletepost = async (req,res)=> {
    try{
        const {id} = req.params
        const deletepost = await Blog.findByIdAndDelete(id,req.body,{new:true}) 
        if (!deletepost){
            res.status(404).json ({msg:"post not found"})
        }
        res.status(200).json ({msg:"delete successfull"})
    }
    catch(error){
        res.status(500).json ({msg:"server error"})
    }
}

// const createBlog = async (req,res) => {
//     const {title,description} = req.body
//     //removing author
//     try{
//         const newdata = await newBlog ({
//             title:description,
//             author:req.user.name
//         })
//     }catch(error){
//         res.status(500).json ({msg:"server error"})
//     }
// }

module.exports = {createpost,getposts,updatepost,deletepost}


//restart after long time 
// npx nodemon