const express = require('express');
const mongoose = require ('mongoose');

const app = express();

const dbURI = "mongodb://localhost:27017/lib-manage"
mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

