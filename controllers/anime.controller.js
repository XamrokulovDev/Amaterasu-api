const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const { validationResult } = require('express-validator');
const Anime = require('../models/anime.model');

// @desc GET all anime
// @route GET /api/anime
// @access Public
exports.getAllAnime = asyncHandler(async (req, res, next) => {
    const anime = await Anime.find()
    .populate("author", "title")
    .populate("studio", "title")
    .populate("category", "title")
    .populate({
        path: "parts",
        select: "part_number video createdAt updatedAt",
    });

    if (!anime) {
        return next(new ErrorHandler('Hech qanday ma\'lumot topilmadi!', 404));
    }

    res.status(200).json({
        success: true,
        count: anime.length,
        data: anime
    });
});

// @desc Create new anime
// @route POST /api/anime
// @access Private
exports.createAnime = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array().map(err => err.msg).join(', '), 400));
    }

    if (!req.file) {
        return next(new ErrorHandler("Rasm yuklashda xatolik yuz berdi!", 400));
    }

    const { title, description, ranking, year, category, author, studio, isPremium } = req.body;

    let categories = category;
    if (typeof category === "string") {
        try {
            categories = JSON.parse(category);
        } catch (err) {
            return next(new ErrorHandler("Kategoriya formati noto‘g‘ri!", 400));
        }
    }

    const newAnime = new Anime({
        title,
        description,
        ranking,
        year,
        category: Array.isArray(categories) ? categories : [categories],
        studio,
        author,
        image: req.file.path,
        isPremium
    });

    await newAnime.save();

    res.status(201).json({
        success: true,
        data: newAnime
    });
});

// @desc DELETE anime
// @route DELETE /api/anime/:id
// @access Private
exports.deleteAnime = asyncHandler(async (req, res, next) => {
    const anime = await Anime.findByIdAndDelete(req.params.id);

    if (!anime) {
        return next(new ErrorHandler('Bunday anime topilmadi!', 404));
    }

    res.status(200).json({
        success: true,
        data: {},
        message: "Anime muvaffaqiyatli o'chirildi"
    });
});