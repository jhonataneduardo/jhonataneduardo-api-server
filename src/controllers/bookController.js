const Book = require('../models/book')
const { tokenVerify } = require('../config/jwt')

const BookController = {

    bookGet: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).exec();
            if (!book) {
                res.status(400).send({ 'msg': 'Not find book' })
            }
            res.status(200).send({ book })
        } catch (error) {
            res.status(400).send({ 'error': error })            
        }
    },

    bookList: async (req, res) => {
        try {
            const books = await Book.find()
            return res.send({ books })            
        } catch (error) {
            return res.status(400).send({ 'error': error })            
        }
    },

    bookCreate: async (req, res) => {
        try {
            const [ type, hash ] = req.headers.authorization.split(' ')
            const data = await tokenVerify(hash)
            req.body.user = data.user.id
            const book = await Book.create(req.body)
            return res.send( { book })
        } catch (error) {
            return res.status(400).send({ 'error': error })
        }
    },

    bookPut: async (req, res) => {
        try {
            // qualquer usuário pode editar os registros?
            const book = await Book.updateOne({_id: req.params.id}, req.body)
            res.status(200).send({ book })
        } catch (error) {
            res.status(400).send({ 'msg': error })
        }
    },

    bookDelete: async (req, res) => {
        try {
            const book = await Book.deleteOne({ _id: req.params.id })
            res.status(200).send({ 'msg': 'Deletado!' })
        } catch (error) {
            res.status(400).send({ 'msg': error })
        }
    }
}

module.exports = BookController
