const { userLogin, adminLogin } = require("../controllers/auth/login")
const signin = require("../controllers/auth/signIn")

const router = require("express").Router()

router.route('/user').post(userLogin)
router.route('/admin').post(adminLogin)
router.route('/register').post(signin)


module.exports = router