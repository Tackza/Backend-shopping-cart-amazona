const express = require('express')
const router = express.Router()
const passport = require('passport')
const authentication = passport.authenticate('jwt', { session: false })
const OrderController = require('../controller/Order')


router.post('/insertOrder', authentication, OrderController.inputOrder)
router.get('/', authentication, OrderController.getOrder)

module.exports = router