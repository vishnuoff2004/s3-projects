const { fetchServices } = require('../../../controllers/admin/serviceMangement')

// fake DB
const db = require('../../../models/db')

jest.mock('../../../models/db')

describe('fetchServices API', () => {

    test('SUCCESS: should return services', async () => {

        const req = {}

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        // fake DB result
        db.query.mockResolvedValue([[{ id: 1, name: 'plumbing' }]])

        await fetchServices(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })

    test('ERROR: should return 500', async () => {

        const req = {}

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        db.query.mockRejectedValue(new Error('DB error'))

        await fetchServices(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            msg: 'internal server error'
        })
    })

})