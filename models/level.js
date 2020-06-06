const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('level', levelSchema);
