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

// Here, the string "Book" is important to be the singular of the name of the collection we want to reference in the db
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;