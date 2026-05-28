const { fetchService } = require('../../../controllers/admin/serviceMangement')
const db = require('../../../models/db')

jest.mock('../../../models/db')

describe('fetchService API', () => {

    let req, res

    beforeEach(() => {

        req = {
            query: {
                id: 1
            }
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks()
    })

    test('should fetch service by id', async () => {

        const mockData = [{ id: 1, service_name: 'plumbing' }]

        db.query.mockResolvedValue([mockData])

        await fetchService(req, res)

        expect(db.query).toHaveBeenCalledWith(
            'select * from services where id  = ?',
            [1]
        )

        expect(res.status).toHaveBeenCalledWith(200)

        expect(res.json).toHaveBeenCalledWith({
            msg: 'service fetch successfully',
            data: mockData
        })
    })

    test('should return 500 on db error', async () => {

        db.query.mockRejectedValue(new Error('DB error'))

        await fetchService(req, res)

        expect(res.status).toHaveBeenCalledWith(500)

        expect(res.json).toHaveBeenCalledWith({
            msg: 'internal server error'
        })
    })

})