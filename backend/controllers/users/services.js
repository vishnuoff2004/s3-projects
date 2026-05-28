const db = require('../../models/db')

const fetchServices = async(req,res)=>{
    try{
        // const [row] = await db.query('select * from services s inner join service_providers sp on s.id = sp.skill_type where id = true ')
        const [row] = await db.query('select * from services')
        res.status(200).json({msg:'fetch available services successfully',data:row})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

const selectedServices = async(req,res)=>{
    try{
        const {id} = req.query;
        console.log(id)

        const sql = 'select * from service_providers sp inner join services s on s.id = sp.skill_type  where s.id = ? and sp.isAvailable = true'
        const [result] = await db.query(sql,[id]);

        if(result.length == 0){
            return res.status(200).json({data:'no services found'})
        }

        console.log(result)

        res.status(200).json({msg:"data fetch successfully",data:result})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

module.exports = {fetchServices,selectedServices}