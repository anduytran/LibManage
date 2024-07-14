const express = require('express');
const mongoose = require ('mongoose');
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

app.get('/', (req, res) => {
    res.redirect('/books')
})

// [----- Routing for Sign in -----]
// app.get('[REPLACE ME]', (req, res) => {
//     res.render('index')
// })

// [----- Routing for Sign up -----]
// app.get('[REPLACE ME]', (req, res) => {
//     res.render('index')
// })

app.get('/books', (req, res) => {
    Book.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
        });
    
});
