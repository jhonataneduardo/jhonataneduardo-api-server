const router = require('express').Router()
const UserController = require('../controllers/userController')
const isAuthorized = require('../middleware/auth')

// user
router.post('/me', isAuthorized, UserController.me)
router.post('/register', UserController.register)
router.get('/login', UserController.login)
router.get('/list', UserController.list)

module.exports = router