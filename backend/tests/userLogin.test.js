const {userLogin} = require('../controllers/auth/login')
const db = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

jest.mock('../models/db')
jest.mock('bcrypt')
jest.mock("jsonwebtoken")

describe('User Login Api',()=>{
    test("Login successfull",async()=>{
       db.query.mockResolvedValueOnce([[
        {
            id:1,
            email:'user@gmail.com',
            password:'hashed_password'
        }
       ]])

       bcrypt.compare.mockResolvedValueOnce(true)

       jwt.sign.mockReturnValue("fake_token")

       const req = {
           body:{
            email:'user@gail.com',
            password:'123456'
           }
       }

       const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
       }

       await userLogin(req,res)

       expect(res.status).toHaveBeenCalledWith(200)

       expect(res.json).toHaveBeenCalledWith({
        msg:'login successful',
        token:'fake_token'
       })
    })

    test("email or password missing",async ()=>{
        const req ={
            body:{
                email:'',
                password:''
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await userLogin(req,res)

        expect(res.status).toHaveBeenCalledWith(400)

        expect(res.json).toHaveBeenCalledWith({
            msg:'email and password required'
        })
    })


    test('user not found',async()=>{
        db.query.mockResolvedValueOnce([[]])

        const req = {
            body:{
                email: "wrong@gmail.com",
                password:'123456'
            }
        }

        const res = {
            status : jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await userLogin(req,res)

        expect(res.status).toHaveBeenCalledWith(404)

        expect(res.json).toHaveBeenCalledWith({
            msg:'user not found'
        })

       
    })


     test('wrong password',async()=>{
            db.query.mockResolvedValueOnce([[
                {
                    id:1,
                    email : "user@gmail.com",
                    password:"hashed_password"
                }
            ]])

            bcrypt.compare.mockResolvedValueOnce(false)

            const req = {
                body:{
                    email:'user@gmail.com',
                    password:'worgpassword'
                }
            }
 
            const res = {
                status : jest.fn().mockReturnThis(),
                json:jest.fn()
            }

            await userLogin(req,res)

                expect(bcrypt.compare).toHaveBeenCalledWith(
                    'worgpassword',
                    'hashed_password'
                )
        })

})