const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date, // unsure if this object also contains hours
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

// Here, the string "Event" is important to be the singular of the name of the collection we want to reference in the db
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;