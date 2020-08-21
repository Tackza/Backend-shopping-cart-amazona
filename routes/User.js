const express = require('express')
const router = express.Router()
const UserController = require('../controller/User')

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/login/admin',UserController.loginForAdmin)
router.post('/register/admin',UserController.registerForAdmin)
router.get('',UserController.getPerson)
router.delete('/:id',UserController.deletePerson)

module.exports = router