const db = require('../../models/db')

const addProviders = async(req,res)=>{
    try{
        const {name,phone} = req.body;
        const sql = `insert into service_provider () values ()`

        const [exists]  = await db.query(`select * from service_providers where name = ? and phone =?`,[name,phone])
        if(exists.length > 0){
            return res.status(400).json({msg:'provider already exists'})
        }

        const [result] = await db.query(sql,[])
        if(result.affectedRows == 0){
            return res.status(400).json({msg:'providers not inserted'})
        }

        res.status(200).json({msg:'provider add successfully !!!'})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

module.exports = {addProviders}