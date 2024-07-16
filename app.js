const express = require('express');
const mongoose = require ('mongoose');
const morgan = require('morgan');
const Book = require('./models/book');
const Event = require('./models/event');

const app = express();

// Uncomment this line once you have mongodb installed, running on its default port, and have a databse called lib-manage 
const dbURI = "mongodb://localhost:27017/lib-manage"    
mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));
// app.listen(8000);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/books')
})

app.get('/books', (req, res) => {
    Book.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/books/find-author/:search', (req, res) => {
    const searchInput = req.params.search
    Book.find({ "author": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
      });
});

app.get('/books/find-title/:search', (req, res) => {
    const searchInput = req.params.search
    Book.find({ "title": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
      });
});

app.get('/books/find-genre/:search', (req, res) => {
    const searchInput = req.params.search
    Book.find({ "genres": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
      });
});

app.get('/books/find-stock', (req, res) => {
    Book.find({ "stock": true })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
      });
});




app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/events', async (req, res) => {
    Event.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('events', { events: result });
        })
        .catch(err => {
            console.log(err);
        });
});

// Add POST routes for form submissions if needed
app.post('/login', (req, res) => {
    // Handle login logic
});

app.post('/signup', (req, res) => {
    // Handle signup logic
});

app.get('/add-event', (req, res) => {
    res.render('eventCreate');
});

app.post('/add-event', (req, res) => {
    const { title, description, image, date, time } = req.body;
    const newEvent = new Event({ title, description, image, date, time });
    newEvent.save();
    res.redirect('/events');
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});