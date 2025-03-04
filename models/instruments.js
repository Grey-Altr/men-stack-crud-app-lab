const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
    name: String,
    manufacturer: String,
    release: Date,
    owned: Boolean,
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;