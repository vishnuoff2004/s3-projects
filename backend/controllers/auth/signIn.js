const db = require('../../models/db')
const bcrypt = require('bcrypt')

const signin = async (req,res)=>{
    try{
        const {email,password,name,contact} = req.body    
        if(!email || !password){
            return res.status(400).json({msg:'email and password required'})
        }

        const [user] =  await db.query('select * from users where email = ?',[email])

        if(user.length > 0){
            return res.status(404).json({msg:'user already exists'})
        }
        const hash = await bcrypt.hash(password,10)
        const createdAt = new Date()
        const updatedAt = new Date()

        await db.query("insert into users (name,email,createdAt,updatedAt,contact,password) values (?,?,?,?,?,?)",[name,email,createdAt,updatedAt,contact,hash])
        res.status(201).json({msg:'registration sucessfull'})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

module.exports = signin