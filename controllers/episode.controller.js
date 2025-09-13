const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const Episode = require('../models/episode.model');
const { validationResult } = require('express-validator');

// @desc GET all episode
// @route GET /api/episode
// @access Public
exports.getAllEpisodes = asyncHandler(async (req, res, next) => {
    const episodes = await Episode.find().populate('anime_id', 'title');

    if (!episodes) {
        return next(new ErrorHandler('Hech qanday ma\'lumot topilmadi!', 404));
    }

    res.status(200).json({
        success: true,
        count: episodes.length,
        data: episodes
    });
});

// @desc POST create new episode
// @route POST /api/episode
// @access Private
exports.createEpisode = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
    }

    const { title, episode_number, video, anime_id } = req.body;

    const episode = await Episode.create({
        title,
        episode_number,
        video,
        anime_id
    });

    res.status(201).json({
        success: true,
        data: episode
    });
});