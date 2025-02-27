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



// POST




// DELETE




module.exports = app;