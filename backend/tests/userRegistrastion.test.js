const signin = require('../controllers/auth/signin')

const db = require('../models/db')
const bcrypt = require('bcrypt')

jest.mock('../models/db')
jest.mock('bcrypt')

describe("Signin API",()=>{

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('registration successful',async()=>{

        db.query
        .mockResolvedValueOnce([[]])
        .mockResolvedValueOnce([{insertId:1}])

        bcrypt.hash.mockResolvedValueOnce('hashed_password')

        const req = {
            body:{
                name:'vishnu',
                email:'vishnu@gmail.com',
                password:'123456',
                contact:'9876543210'
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await signin(req,res)

        expect(bcrypt.hash).toHaveBeenCalledWith('123456',10)

        expect(res.status).toHaveBeenCalledWith(201)

        expect(res.json).toHaveBeenCalledWith({
            msg:'registration sucessfull'
        })

    })

    test('email and password required',async()=>{

        const req = {
            body:{
                email:'',
                password:''
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await signin(req,res)

        expect(res.status).toHaveBeenCalledWith(400)

        expect(res.json).toHaveBeenCalledWith({
            msg:'email and password required'
        })

    })

    test('user already exists',async()=>{

        db.query.mockResolvedValueOnce([
            [
                {
                    id:1,
                    email:'vishnu@gmail.com'
                }
            ]
        ])

        const req = {
            body:{
                name:'vishnu',
                email:'vishnu@gmail.com',
                password:'123456',
                contact:'9876543210'
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await signin(req,res)

        expect(res.status).toHaveBeenCalledWith(404)

        expect(res.json).toHaveBeenCalledWith({
            msg:'user already exists'
        })

    })

    test('internal server error',async()=>{

        db.query.mockRejectedValueOnce(new Error('DB Error'))

        const req = {
            body:{
                email:'vishnu@gmail.com',
                password:'123456'
            }
        }

        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await signin(req,res)

        expect(res.status).toHaveBeenCalledWith(500)

        expect(res.json).toHaveBeenCalledWith({
            msg:'internal server error'
        })

    })

})