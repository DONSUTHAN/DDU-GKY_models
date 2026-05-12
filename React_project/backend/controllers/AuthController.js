const User = require ('../Model/UserModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const generatetoken = (id) => {
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {
            expiresIn: "30d"
        }
    );
};

const registerUser = async (res,req) => {
    try{
        const { name,email,password,role } = req.body
        const userExist = await User.findOne({
            email
        });
        if(userExist){
            return res.status(400).json({msg : "user already exist "});
        }
        const salt = await bcrypt.genSalt(10);
        // 
        const hashedpassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,email,password:hashedpassword,role
        });
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            role :user.role,
            token : generatetoken(user._id)
        });
    }catch(error){
        res.status(500).json({msg:error.message})
    }
};

const loginUser =async (res,req) => {
    try{
        const
    }
}


