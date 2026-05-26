const db = require('../../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY

const userLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg:'email and password required'})
        }

        const [user] = await db.query('select * from users where email = ?',[email])
        console.log(user)

        if(user.length == 0){
            return res.status(404).json({msg:'user not found'})
        }

        const comp = await bcrypt.compare(password,user[0].password)
        const token  = jwt.sign({id:user[0].id,email:user[0].email,role:'user'},secret_key,{expiresIn:'1h'})

        res.status(200).json({msg:'login successful',token})
    }
    catch(error){
        res.status(500).json({msg:'internal server error'})
        console.log(error)
    }
}

const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg:'email and password required'})
        }

        const [user] =  await db.query('select * from users where email = ?',[email])

        if(user.length == 0){
            return res.status(404).json({msg:'user not found'})
        }

        const comp = await bcrypt.compare(password,user[0].password)
        const token  = jwt.sign({id:user[0].id,email:user[0].email},secret_key,{expiresIn:'1h'})

        res.status(200).json({msg:'login successful',token})
    }
    catch(error){
        res.status(500).json({msg:'internal server error'})
        console.log(error)
    }
}

const vd = async(req,res)=>{
    try{
        const user = req.id;
        const role = req.role;
        res.status(200).json({data:{user,role}})
    }
    catch(err)
    {
        res.status(500).json({msg:'internal server error'})
        console.log(error)
    }
}

module.exports = {userLogin,adminLogin,vd}