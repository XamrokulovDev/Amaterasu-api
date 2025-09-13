const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    anime_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    },
    part_number: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Part', partSchema);