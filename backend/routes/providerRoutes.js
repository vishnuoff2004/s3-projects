const { addProviders, fetchProvides, deleteProvider, updateProviders } = require('../controllers/admin/serviceProviders');
const { adminverification } = require('../middlewares/adminVerification');
const { verifyMd } = require('../middlewares/verification');
const router = require('express').Router()


router.route("/addProviders").post(verifyMd,adminverification,addProviders)
router.route('/fetchProviders').get(verifyMd,adminverification,fetchProvides)
router.route('/deleteProviders/:id').delete(verifyMd,adminverification,deleteProvider)
router.route('/updateProviders').put(verifyMd,adminverification,updateProviders)

module.exports = router