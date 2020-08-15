const express = require('express')
const passport = require('passport')
const authentication = passport.authenticate('jwt', { session: false })
const OrderController = require('../controller/History')
const router = express.Router()

router.post('/update', authentication, OrderController.inputOrder)
router.get('/', authentication, OrderController.getOrder)
router.get('/all',OrderController.getOrderAll)

module.exports = router