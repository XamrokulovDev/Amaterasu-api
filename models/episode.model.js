const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    episode_number: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    anime_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Episode', episodeSchema);