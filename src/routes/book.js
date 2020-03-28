const router = require('express').Router()
const BookController = require('../controllers/bookController')
const isAuthorized = require('../middleware/auth')

// not authorization required
router.get('/get/:id', BookController.bookGet)
router.get('/list', BookController.bookList)

// authorization required
router.post('/create', isAuthorized, BookController.bookCreate)
router.put('/update/:id', isAuthorized, BookController.bookPut)
router.delete('/delete/:id', isAuthorized, BookController.bookDelete)

module.exports = router