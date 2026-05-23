const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createPool({
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
}).promise()

// const connect = db.connect((err)=>{
//     if(!err){
//         console.log('mysql connected successfully')
//     }
//     else{
//         console.log('mysql not connected',err)
//     }
// })

module.exports = db