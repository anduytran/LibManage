const express = require('express');
const mongoose = require ('mongoose');
const morgan = require('morgan');
const Resource = require('./models/resource');
const Event = require('./models/event');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

const dbURI = "mongodb://localhost:27017/lib-manage"    
mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());




// [----- Routes -----]
app.get('*', checkUser);

app.get('/', (req, res) => {
    res.redirect('/books')
})

app.get('/books', (req, res) => {
    Resource.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { resources: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/books/search/', (req, res) => {
    console.log(req.query)
    console.log(req.query["search-filter"])
    console.log(req.query["search-text"])

    let filter = req.query["search-filter"];
    let searchInput = req.query["search-text"]

    if (filter == "author") {
        Resource.find({ "author": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { resources: result });
        })
        .catch(err => {
            console.log(err);
      });
    }
    else if (filter == "title") {
        Resource.find({ "title": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { resources: result });
        })
        .catch(err => {
            console.log(err);
      });
    }
    else if (filter == "genre") {
        Resource.find({ "genres": { "$regex": searchInput, "$options": 'i' } })
        .then(result => {
            res.render('index', { resources: result });
        })
        .catch(err => {
            console.log(err);
      });
    }
    else if (filter == "publisher") {
        Resource.find({ "publisher": { "$regex": searchInput, "$options": 'i' } }).sort({ year: 1 })
        .then(result => {
            res.render('index', { resources: result });
        })
        .catch(err => {
            console.log(err);
      });
    }
    else if (filter == "stock") {
        Resource.find({ "stock": true })
        .then(result => {
            res.render('index', { resources: result });
        })
        .catch(err => {
            console.log(err);
        });
    }
});


// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const user = await User.create({ email, password });
//         res.status(201).json(user);
//     }
//     catch(err) {
//         const errors = handleErrors(err);
//         res.status(400).json({ errors });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     console.log(email, password);
//     res.send("login from the server")
// });



app.get('/events', async (req, res) => {
    Event.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('events', { events: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/calendar', (req, res) => {
    res.render('calendar');
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
app.use(authRoutes);



app.get('/employees', requireAuth, (req, res) => res.render('employees'))

app.get('/logout', (req, res) => res.render('logout'))

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

