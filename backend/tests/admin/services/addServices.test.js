const { addServices } = require('../../../controllers/admin/serviceMangement')
const db = require('../../../models/db')

jest.mock('../../../models/db')

describe('addServices API', () => {

    let req, res

    beforeEach(() => {

        req = {
            body: {
                service: 'plumbing',
                description: 'pipe fix',
                price: 500,
                duration: '2h'
            }
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks()
    })

    test('service already exists → 400', async () => {

        db.query.mockResolvedValue([[{ id: 1 }]]) 
        // check = [{ id: 1 }]

        await addServices(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
    })

    test('service added successfully → 200', async () => {

        db.query
            .mockResolvedValueOnce([[]]) 
            // check = []

            .mockResolvedValueOnce([{ affectedRows: 1 }])
            // insert result

        await addServices(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            msg: 'data added successfully'
        })
    })

    test('db error → 500', async () => {

        db.query.mockRejectedValue(new Error('DB error'))

        await addServices(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
    })

})