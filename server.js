const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

const Instrument = require('./models/instrument.js');

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});

// middleware

app.use(express.urlencoded({extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// GETS ---------------------------------------------------------------

// Landing page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Instruments
app.get('/instruments', (req, res) => {
    res.render('instruments/index.ejs');
});

app.get('/instruments/add', (req, res) => {
    res.render('instruments/add.ejs');
});

// Synths
app.get('/synths', (req, res) => {
    res.render('synths/index.ejs');
});


// Drum Machines
app.get('/drums', (req, res) => {
  res.render('drums/index.ejs');
});

// POST
app.post('/instruments', async (req, res) => {
    req.body.name === 'on';
    req.body.manufacturer === 'on';
    await Instrument.create(req.body);
    res.redirect('/instruments/add');
});



// DELETE




module.exports = app;