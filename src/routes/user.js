const router = require('express').Router()
const UserController = require('../controllers/userController')
const isAuthorized = require('../middleware/auth')

// authorization required
router.get('/me', isAuthorized, UserController.me)

// not authorization required
router.post('/register', UserController.register)
router.get('/login', UserController.login)
router.get('/list', UserController.list)

module.exports = router
