const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true,
        max: 255
    },
    data: {
        type: String,
        required: true,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Data', dataSchema);