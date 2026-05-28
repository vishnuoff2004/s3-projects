const {
    fetchServices,
    selectedServices
} = require('../../controllers/users/services')

const db = require('../../models/db')

jest.mock('../../models/db')

describe('Services APIs', () => {

    let req, res

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks()
    })

    test('fetchServices → success 200', async () => {

        req = {}

        db.query.mockResolvedValueOnce([[{
            id: 1,
            service_name: 'plumbing'
        }]])

        await fetchServices(req, res)

        expect(db.query).toHaveBeenCalledWith('select * from services')

        expect(res.status).toHaveBeenCalledWith(200)
    })


    test('selectedServices → success', async () => {

        req = {
            query: { id: 1 }
        }

        db.query.mockResolvedValueOnce([[{
            id: 1,
            name: 'plumbing',
            isAvailable: true
        }]])

        await selectedServices(req, res)

        expect(res.status).toHaveBeenCalledWith(200)

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                msg: 'data fetch successfully'
            })
        )
    })

    test('selectedServices → no data found', async () => {

        req = {
            query: { id: 99 }
        }

        db.query.mockResolvedValueOnce([[]])

        await selectedServices(req, res)

        expect(res.status).toHaveBeenCalledWith(200)

        expect(res.json).toHaveBeenCalledWith({
            data: 'no services found'
        })
    })

    test('fetchServices → error 500', async () => {

        req = {}

        db.query.mockRejectedValueOnce(new Error('DB error'))

        await fetchServices(req, res)

        expect(res.status).toHaveBeenCalledWith(500)

        expect(res.json).toHaveBeenCalledWith({
            msg: 'internal server error'
        })
    })

})