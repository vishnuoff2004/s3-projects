const { addProviders } = require('../controllers/admin/serviceProviders');
const { adminverification } = require('../middlewares/adminVerification');
const { verifyMd } = require('../middlewares/verification');
const router = require('express').Router()

router.route("/addProviders").post(verifyMd,adminverification,addProviders)

module.exports = router