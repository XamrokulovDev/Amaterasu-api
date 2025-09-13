const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const Part = require('../models/part.model');
const Anime = require('../models/anime.model');
const { validationResult } = require('express-validator');

// @desc GET all part
// @route GET /api/part
// @access Public
exports.getAllParts = asyncHandler(async (req, res, next) => {
    const parts = await Part.find().populate('anime_id', 'title');

    if (!parts) {
        return next(new ErrorHandler('Hech qanday ma\'lumot topilmadi!', 404));
    }

    res.status(200).json({
        success: true,
        count: parts.length,
        data: parts
    });
});

// @desc POST create new part
// @route POST /api/part
// @access Private
exports.createPart = asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
    }

    const { anime_id, part_number } = req.body;

    if (!req.file) {
        return next(new ErrorHandler("Video yuklashda xatolik yuz berdi!", 400));
    }

    const part = await Part.create({
        anime_id,
        part_number,
        video: req.file.path,
    });

    if (!part) {
        return next(new ErrorHandler('Qism yaratishda xatolik yuz berdi!', 500));
    }

    await Anime.findByIdAndUpdate(
        anime_id,
        { $push: { parts: part._id } },
        { new: true }
    );

    res.status(201).json({
        success: true,
        data: part
    });
});

// @desc PUT update part by ID
// @route PUT /api/part/:id
// @access Private
exports.updatePart = asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
    }

    let part = await Part.findById(req.params.id);
    if (!part) {
        return next(new ErrorHandler('Bunday IDga ega qism topilmadi!', 404));
    }

    const { anime_id, part_number } = req.body;

    if (anime_id && anime_id.toString() !== part.anime_id.toString()) {
        await Anime.findByIdAndUpdate(
            part.anime_id,
            { $pull: { parts: part._id } }
        );
        await Anime.findByIdAndUpdate(
            anime_id,
            { $push: { parts: part._id } }
        );
    }

    part = await Part.findByIdAndUpdate(req.params.id, {
        anime_id,
        part_number,
        video: req.file ? req.file.path : part.video,
    }, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        data: part
    });
});

// @desc DELETE part by ID
// @route DELETE /api/part/:id
// @access Private
exports.deletePart = asyncHandler(async (req, res, next) => {
    const part = await Part.findByIdAndDelete(req.params.id);

    if (!part) {
        return next(new ErrorHandler('Bunday IDga ega qism topilmadi!', 404));
    }

    await Anime.findByIdAndUpdate(
        part.anime_id,
        { $pull: { parts: part._id } }
    );

    res.status(200).json({
        success: true,
        data: {},
        message: 'Qism muvaffaqiyatli o\'chirildi!'
    });
});