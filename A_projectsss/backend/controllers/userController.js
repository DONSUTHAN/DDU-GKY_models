const UserSchema = require ('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const encrylevel= 10
const registeruser = async (req,res)=>{

    const{name,password,email}=req.body

    try{
        const user  = await UserSchema.findOne({email});
        if(user){
            return res.status(400).json({msg:"user already exists"})
        }
        const hashedpassword = await bcrypt.hash(password,encrylevel)
        const userdata = await new UserSchema({
            name,
            email,
            password:hashedpassword
        })
        res.status(201).json({msg:"user created successfull",data:userdata})
    }catch(error){
        console.log(error);
        
        res.status(500).json({msg:"server error"})
    }
}
const login = async (req,res) => {
    const {email,password} = req.body

    try {
        const user = await user.findOne({email})
        const token = jwt.sign ({id:user._id,name:user.name},process.env.SECRET_KEY)

        if(!user){
            return res.status (404).json ({msg:"user not registerd,please register"})
        }
        const Matchpassword = await bcrypt.compare (password,user,password)
        if(!Matchpassword){
            return res.status(404).json({msg:"Invalid cresidential"})
        }
    } catch (error) {
        return res.status (500).json({msg:"server error"})
    }
}
const admin = 
//json web
// const jwt = require ('jsonwebtoken')
// const token = jwt.sign({id:user_id},process.env.SECRET_KEY,{expiresIn:'it'})
// res.status(200).json({msg:"logged in,token:token"}



module.exports = {registeruser,login}