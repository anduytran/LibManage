/* 
    Credit: Net Ninja
    https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=4
*/
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

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;