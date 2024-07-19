const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    search: {
        type: String,
        required: true
    },
})

// Here, the string "Event" is important to be the singular of the name of the collection we want to reference in the db
const Search = mongoose.model('Search', eventSchema);
module.exports = Search;