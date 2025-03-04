const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
const Instrument = require('./models/instruments.js');

app.use(express.urlencoded.apply({ extended: false }));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/instruments/new', (req, res) => {
    res.render('instruments/new.ejs');
});

// POST /
app.post('/instruments', async (req, res) => {
    if (req.body.owned === 'on') {
        req.body.owned = true;
    } else {
        req.body.owned = false;
    };
    await Instrument.create(req.body);
    res.redirect('instruments/new');
});