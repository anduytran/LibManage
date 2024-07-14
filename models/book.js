const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    stock: {
        type: Boolean,
        required: true,
    },
    copies: {
        type: Number,
        required: true,
    },
    genres: {
        type: Array,
        required: true,
    }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;