const adminverification = async(req,res,next)=>{
    try{
        if(req.role !== "admin"){
            return res.status(401).json({msg:'unauthorized access !!'})
        }
        next()
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)       
    }
}

module.exports = {adminverification}