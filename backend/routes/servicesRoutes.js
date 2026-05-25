const { fetchServices, addServices } = require('../controllers/admin/serviceMangement')
const router = require('express').Router()

router.route('/serviceProvider').get(fetchServices);
router.route('/service').post(addServices)

module.exports = router