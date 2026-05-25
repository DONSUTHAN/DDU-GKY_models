const user = require('../Models/UserModel')

const createpost = async (req,res) => {
    const {name,email,phone}
    try {
        const newdata = await new user({name,email,phone})
        await newdata.save()
        res.status(200).json({msg:"created suuu"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const getpost  = async(req,res)=>{
    try {
        const post = await new user.find().sort({createAt : -1})
        res.status(200).json({msg:"all posts",data:post})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const updatepost = async(req,res)=>{
    const {id} = req.params
    try {
        const updatepost = await user.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatepost){
            res.status(400).json({msg:"post not found"})
        }
        res.status(200).json({msg:"update done",data:updatepost})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const deletepost = async(req,res) => {
    const {id} =  req.params
    try {
        const deletepost = await user.findByIdAndDelete(id)
        if (!deletepost) {
            res.status(400).json({msg:"post not found"})
        }
        res.status(200).json({msg:"delete done",data:deletepost})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

module.exports = {createpost,getpost,updatepost,deletepost}















