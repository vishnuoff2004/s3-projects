const {
    addProviders,
    fetchProvides,
    deleteProvider,
    updateProviders
} = require('../../../controllers/admin/serviceProviders')

const db = require('../../../models/db')

jest.mock('../../../models/db')

describe('Providers APIs', () => {

    let req, res

    beforeEach(() => {

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks()
    })

    test('add provider → success 200', async () => {

        req = {
            body: {
                name: 'john',
                phone: '9999999999',
                skill_type: 1,
                isAvailable: true
            }
        }

        db.query
            .mockResolvedValueOnce([[]]) // check exists
            .mockResolvedValueOnce([{ affectedRows: 1 }]) // insert

        await addProviders(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('add provider → already exists 400', async () => {

        req = {
            body: {
                name: 'john',
                phone: '9999999999'
            }
        }

        db.query.mockResolvedValueOnce([[{ id: 1 }]])

        await addProviders(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            msg: 'provider already exists'
        })
    })

    test('fetch providers → success', async () => {

        req = {}

        db.query.mockResolvedValueOnce([[{ id: 1, name: 'john' }]])

        await fetchProvides(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('delete provider → success', async () => {

        req = {
            params: { id: 1 }
        }

        db.query.mockResolvedValueOnce([{ affectedRows: 1 }])

        await deleteProvider(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('delete provider → not found 404', async () => {

        req = {
            params: { id: 99 }
        }

        db.query.mockResolvedValueOnce([{ affectedRows: 0 }])

        await deleteProvider(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
    })

    test('update provider → success', async () => {

        req = {
            body: {
                id: 1,
                name: 'john',
                phone: '8888888888',
                skill_type: 1,
                service_name: 'plumbing',
                description: 'fix pipes',
                price: 500,
                isAvailable: true
            }
        }

        db.query
            .mockResolvedValueOnce([[{ id: 1, skill_type: 1 }]]) // provider exists
            .mockResolvedValueOnce([]) // update service
            .mockResolvedValueOnce([{ affectedRows: 1 }]) // update provider

        await updateProviders(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('update provider → not found 404', async () => {

        req = {
            body: { id: 99 }
        }

        db.query.mockResolvedValueOnce([[]])

        await updateProviders(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
    })

})