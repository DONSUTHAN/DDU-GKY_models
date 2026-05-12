const  jwt =require ('jsonwebtoken')

const product = async (req , res , next) =>{
   const token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            const token = req.headers.authorization.split( " " )[1];

            const decoded = jwt.verify( 
                token,
                process.env.SECRET_KEY
            );
            req.user = decoded;
            
            next();

        }catch(error){
            res.status(401).json({msg:"not authorized"});
        }
    }

    if(!token){
        res.status(401).json({msg:"no token"});
    }

};

module.exports = {product};