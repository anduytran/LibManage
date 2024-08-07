/* 
    Credit: Net Ninja
    https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=4
*/
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


const resource = mongoose.model('Resource', resourceSchema);
module.exports = resource;