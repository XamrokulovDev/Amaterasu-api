const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Studio', studioSchema);