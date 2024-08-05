const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Resource = require('./models/resource');
const Event = require('./models/event');
const User = require('./models/User'); // Add this line

const app = express();

const dbURI = "mongodb://localhost:27017/lib-manage";
mongoose.connect(dbURI)
  .then((result) => app.listen(8000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Configure session management
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbURI }),
  })
);

// [----- Routes -----]
app.get('/', (req, res) => {
  res.redirect('/books');
});

app.get('/books', (req, res) => {
    Resource.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { resources: result, session: req.session });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/books/search/', (req, res) => {
  console.log(req.query);
  console.log(req.query["search-filter"]);
  console.log(req.query["search-text"]);

  let filter = req.query["search-filter"];
  let searchInput = req.query["search-text"];

  if (filter == "author") {
    Resource.find({ "author": { "$regex": searchInput, "$options": 'i' } })
      .then(result => {
        res.render('index', { resources: result, session: req.session  });
      })
      .catch(err => {
        console.log(err);
      });
  } else if (filter == "title") {
    Resource.find({ "title": { "$regex": searchInput, "$options": 'i' } })
      .then(result => {
        res.render('index', { resources: result, session: req.session  });
      })
      .catch(err => {
        console.log(err);
      });
  } else if (filter == "genre") {
    Resource.find({ "genres": { "$regex": searchInput, "$options": 'i' } })
      .then(result => {
        res.render('index', { resources: result, session: req.session  });
      })
      .catch(err => {
        console.log(err);
      });
  } else if (filter == "publisher") {
    Resource.find({ "publisher": { "$regex": searchInput, "$options": 'i' } }).sort({ year: 1 })
      .then(result => {
        res.render('index', { resources: result, session: req.session  });
      })
      .catch(err => {
        console.log(err);
      });
  } else if (filter == "stock") {
    Resource.find({ "stock": true })
      .then(result => {
        res.render('index', { resources: result, session: req.session  });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/login', (req, res) => {
    res.render('login', { session: req.session });
  });
  
  app.get('/signup', (req, res) => {
    res.render('signup', { session: req.session });
  });

  app.get('/events', async (req, res) => {
    Event.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('events', { events: result, session: req.session });
      })
      .catch(err => {
        console.log(err);
      });
  });

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Store user information in session
    req.session.userId = user._id;
    req.session.userName = user.name;

    res.redirect('/books');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out.');
    }
    res.redirect('/login');
  });
});

app.get('/calendar', (req, res) => {
  res.render('calendar', { session: req.session });
});

app.get('/add-event', (req, res) => {
  res.render('eventCreate', { session: req.session });
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

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Could not log out.');
      }
      res.redirect('/login');
    });
  });
