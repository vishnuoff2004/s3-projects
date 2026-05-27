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

const addServices = async(req,res)=>{
    try{
        const {service,description,price,duration} = req.body
        const createdAt = new Date();
        const updatedAt = new Date();

        const sql = `insert into services (service_name,description,price,duration,createdAt,updatedAt) values (?,?,?,?,?,?)`

        const [check] = await db.query(`select * from services where service_name = ?`,[service])
        if(check.length >0 ){
            return res.status(400).json({msg:'data already exists'})
        }

        const [result] = await db.query(sql,[service,description,price,duration,createdAt,updatedAt])
        if(result.affectedbRows === 0){
            res.status(400).json({msg:'datas not added'})
            return
        }

        res.status(200).json({msg:'data added successfully'})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

const fetchService = async(req,res)=>{
    try{
        const {id} = req.query;

        const sql = `select * from services where id  = ?`
        const [result] =  await db.query(sql,[id])

        res.status(200).json({msg:'service fetch successfully',data:result})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

module.exports = {fetchServices,addServices,fetchService}

