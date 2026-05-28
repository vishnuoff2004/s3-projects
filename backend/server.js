const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    console.log('api is working')
})
// auth - routes
app.use('/auth',require('./routes/authRoutes'))

// admin service provider - ROUTES
app.use('/admin',require('./routes/servicesRoutes'))
// PROVIDERS - ROUTES
app.use('/admin',require('./routes/providerRoutes'))

//verify
app.use('/verification',require('./routes/authRoutes'))

// user Routes
app.use('/user',require('./routes/userRoutes/serviceRoutes'))



app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})