const router = require('express').Router()
const UserController = require('../controllers/userController')
const isAuth = require('../middleware/auth')

// user
router.get('/me', isAuth, UserController.me)
router.post('/register', UserController.register)
router.get('/login', UserController.login)
router.get('/list', isAuth, UserController.list)

module.exports = router