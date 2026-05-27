const db = require('../../models/db')

const addProviders = async(req,res)=>{
    try{
        const {name,phone,skill_type,isAvailable} = req.body;
        const sql = `insert into service_providers (name,phone,isAvailable,skill_type,createdAt,updatedAt) values (?,?,?,?,?,?)`

        const [exists]  = await db.query(`select * from service_providers where name = ? and phone =?`,[name,phone])
        if(exists.length > 0){
            return res.status(400).json({msg:'provider already exists'})
        }

        const createdAt = new Date(); 
        const updatedAt = new Date()

        const [result] = await db.query(sql,[name,phone,isAvailable,skill_type,createdAt,updatedAt])
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

const fetchProvides = async(req,res)=>{
    try{
        const sql = "select * from services s inner join service_providers sp on s.id = sp.skill_type"
         
        const [result] = await db.query(sql)
        res.status(200).json({msg:'data fetch successfully',data:result})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}

const deleteProvider = async(req,res)=>{
    try{
        const {id} = req.params;

        const sql = 'delete  from service_providers where id = ?'
        const [result] = await db.query(sql,[id])

        if(result.affectedRows === 0){
            return res.status(404).json({
                msg:'provider not found'
            })
        }

        res.status(200).json({msg:"deleted successfully"})
    }
    catch(err){
        res.status(500).json({msg:'internal server error'})
        console.log(err)
    }
}
const updateProviders = async(req,res)=>{
    try{

        const {
            id,
            name,
            phone,
            service_name,
            description,
            price,
            isAvailable
        } = req.body


        // fetch provider
        const sql2 = `
            select * from service_providers
            where id = ?
        `

        const [data] = await db.query(sql2,[id])

        if(data.length === 0){
            return res.status(404).json({
                msg:'provider not found'
            })
        }


        // service id
        const idToUpdate = data[0].skill_type



        // update services table
        const sql3 = `
            update services
            set
                service_name = ?,
                description = ?,
                price = ?

            where id = ?
        `

        await db.query(sql3,[
            service_name,
            description,
            price,
            idToUpdate
        ])



        // update provider table
        const sql = `
            update service_providers
            set
                name = ?,
                phone = ?,
                isAvailable = ?
            where id = ?
        `

        const [result] = await db.query(sql,[
            name,
            phone,
            isAvailable,
            id
        ])



        if(result.affectedRows === 0){
            return res.status(404).json({
                msg:'provider not found'
            })
        }


        res.status(200).json({
            msg:'updated successfully'
        })

    }
    catch(err){

        console.log(err)

        res.status(500).json({
            msg:'internal server error'
        })
    }
}

module.exports = {addProviders,fetchProvides,deleteProvider,updateProviders}