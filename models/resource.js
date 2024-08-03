const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    type: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    pages: {
        type: Number,
    },
    stock: {
        type: Boolean,
    },
    copies: {
        type: Number,
    },
    genres: {
        type: Array,
    },
    publisher: {
        type: String,
    },
    year: {
        type: String,
    },
    issue: {
        type: String,
    }
})

// Here, the string "Book" is important to be the singular of the name of the collection we want to reference in the db
const resource = mongoose.model('Resource', resourceSchema);
module.exports = resource;