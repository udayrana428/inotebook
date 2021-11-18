const jwt = require('jsonwebtoken');
const jwt_secret = "hello23@"
const getuser=(req,res,next)=>{
    //get the user from jwt token and add it to req object
    const token=req.header("auth-token")
    if(!token){
        res.status(401).json({ errors: "Unauthorised access" })
    }
    try{
        const data=jwt.verify(token,jwt_secret)
        req.user=data.user
        next()
    }
    catch(error){
        res.status(401).json({ errors: "Unauthorised access" })
    }
}
module.exports=getuser