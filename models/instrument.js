const mongoose = require('mongoose');

const instSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    released: Date,
    category: String,
    image: String
});

const instrument = mongoose.model('instrument', instSchema);

module.exports = instrument;