const express = require('express');
const mongoose = require ('mongoose');
const morgan = require('morgan');
const Book = require('./models/book');

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

app.get('/books-find', (req, res) => {
    Book.find({ "author": { "$regex": "echo", "$options": 'i' } })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
      });
});

app.get('/books/:search', (req, res) => {
    const searchInput = req.params.search
    Book.find({ "author": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
      });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});


  