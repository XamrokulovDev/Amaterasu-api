const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ranking: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        required: true,
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode',
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    parts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part',
    }],
    isPremium: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Anime', animeSchema);