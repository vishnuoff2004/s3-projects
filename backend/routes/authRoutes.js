const { userLogin, adminLogin, vd } = require("../controllers/auth/login")
const signin = require("../controllers/auth/signIn")
const { verifyMd } = require("../middlewares/verification")
const router = require("express").Router()

router.route('/user').post(userLogin)
router.route('/admin').post(adminLogin)
router.route('/register').post(signin)
router.route('/verifyDashboard').get(verifyMd,vd)

module.exports = router