const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
const Instrument = require('./models/instruments.js');

app.use(express.urlencoded.apply({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/instruments', async (req, res) => {
    const allInsts = await Instrument.find();
    res.render('instruments/index.ejs', { instruments: allInsts });
});

app.get('/instruments/new', (req, res) => {
    res.render('instruments/new.ejs');
});

app.get('/instruments/:instrumentId', async (req, res) => {
    const foundInst = await Instrument.findById(req.params.instrumentId);
    res.render('instruments/show.ejs', { instrument: foundInst });
});

// POST /
app.post('/instruments', async (req, res) => {
    if (req.body.owned === 'on') {
        req.body.owned = true;
    } else {
        req.body.owned = false;
    };
    await Instrument.create(req.body);
    res.redirect('/instruments');
});