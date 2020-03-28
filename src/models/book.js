const mongoose = require('../database')

const BookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    subtitle: {
        type: String
    },
    author: {
        type: String
    },
    numberPages: {
        type: Number
    },
    publishingCompany: {
        type: String
    },
    publishingYear: {
        type: Number
    },
    status: {
        type: String,
        enum: ['estouLendo', 'queroLer', 'leituraPausada', 'leituraConcluida']
    }
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book