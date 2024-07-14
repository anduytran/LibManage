const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.listen(8000);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    date: Date,
    time: String
});

const Event = mongoose.model('Event', eventSchema);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/events', async (req, res) => {
    res.render('events');
});

// Add POST routes for form submissions if needed
app.post('/login', (req, res) => {
    // Handle login logic
});

app.post('/signup', (req, res) => {
    // Handle signup logic
});

// Example: Adding some events (for testing purposes, you can remove this later)
app.post('/add-event', async (req, res) => {
    const { title, description, image, date, time } = req.body;
    const newEvent = new Event({ title, description, image, date, time });
    await newEvent.save();
    res.redirect('/events');
});
