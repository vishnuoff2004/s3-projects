const jwt = require("jsonwebtoken")

const verifyMd = async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(404).json({msg:'token not found'})
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY)
        req.id = decode.id
        req.role = decode.role

        next()
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}
module.exports = {verifyMd}