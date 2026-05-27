const {adminLogin} = require('../controllers/auth/login')
const db =  require('../models/db')
const jwt  =require("jsonwebtoken")


jest.mock('../models/db')
jest.mock('jsonwebtoken')

describe("Admin Login API",()=>{
    test('login successful',async()=>{
        db.query.mockResolvedValueOnce([
            [
                {
                    id:1,
                    email:"admin@gmail",
                    password:'123456'
                }
            ]
        ])

        jwt.sign.mockReturnValue('fake_token')

        const req = {
            body:{
                email:'admin@gmail.com',
                password:'123456'
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await adminLogin(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            msg:'login successful',
            token:'fake_token'
        })
    })
})