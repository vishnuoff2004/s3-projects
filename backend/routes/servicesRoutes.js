const { fetchServices, addServices, fetchService } = require('../controllers/admin/serviceMangement');
const { adminverification } = require('../middlewares/adminVerification');
const { verifyMd } = require('../middlewares/verification');
const router = require('express').Router()

router.route('/serviceProvider').get(verifyMd,adminverification,fetchServices);
router.route('/service').post(verifyMd,adminverification,addServices).get(verifyMd,adminverification,fetchService)


module.exports = router