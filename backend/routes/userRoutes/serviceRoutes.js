const { fetchServices, selectedServices } = require("../../controllers/users/services")
const router = require("express").Router()

router.route("/services").get(fetchServices)
router.route('/selected-services').get(selectedServices)

module.exports = router