const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date, // unsure if this object also contains hours
        required: true
    },    
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;